import { verifyAdminToken } from '../_lib/auth.js';
import { getSupabaseClient } from '../_lib/supabase.js';
import { parseJsonBody } from '../_lib/body.js';
import { devLocalStore } from '../complaints.js';

const STATUS_EN_MAP = {
  'प्राप्त': 'Received',
  'जाँच में': 'Under Review',
  'प्रगति पर': 'In Progress',
  'पूर्ण': 'Completed'
};

export default async function handler(req, res) {
  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  if (req.method !== 'POST') {
    res.status(405).json({ error: 'Method Not Allowed' });
    return;
  }

  // 1. Verify Admin Bearer Token
  const authHeader = req.headers.authorization || '';
  if (!verifyAdminToken(authHeader)) {
    res.status(401).json({
      error: 'अनधिकृत प्रवेश (Unauthorized)! केवल अधिकृत व्यवस्थापक ही स्थिति अद्यतन कर सकते हैं।'
    });
    return;
  }

  try {
    const body = await parseJsonBody(req);
    const { ticketId, status, actionNote } = body;

    if (!ticketId) {
      res.status(400).json({ error: 'टिकट संख्या (Ticket ID) आवश्यक है।' });
      return;
    }

    const validStatuses = ['प्राप्त', 'जाँच में', 'प्रगति पर', 'पूर्ण'];
    if (!validStatuses.includes(status)) {
      res.status(400).json({
        error: `अमान्य स्थिति! स्थिति केवल इनमें से होनी चाहिए: ${validStatuses.join(', ')}`
      });
      return;
    }

    const statusEn = STATUS_EN_MAP[status] || 'Updated';
    const supabase = getSupabaseClient();
    let updatedRecord = null;

    if (supabase) {
      const updateData = {
        status,
        status_en: statusEn,
        updated_at: new Date().toISOString()
      };
      if (typeof actionNote === 'string' && actionNote.trim()) {
        updateData.action_note = actionNote.trim();
      }

      const { data, error } = await supabase
        .from('complaints_and_suggestions')
        .update(updateData)
        .eq('ticket_id', ticketId)
        .select()
        .single();

      if (error) {
        console.error('[Supabase Status Update Error]', error);
        res.status(500).json({ error: `डेटाबेस स्थिति अद्यतन विफल: ${error.message}` });
        return;
      }
      updatedRecord = data;
    } else {
      // Dev mode local store update
      const found = (devLocalStore || []).find(r => r.ticket_id === ticketId);
      if (found) {
        found.status = status;
        found.status_en = statusEn;
        if (actionNote) found.action_note = actionNote.trim();
        updatedRecord = found;
      }
    }

    res.status(200).json({
      success: true,
      message: 'शिकायत/सुझाव स्थिति सफलतापूर्वक अद्यतन की गई।',
      ticketId,
      status,
      statusEn,
      actionNote: actionNote || (updatedRecord ? updatedRecord.action_note : ''),
      updatedRecord
    });
  } catch (err) {
    console.error('[Admin Status Update Error]', err);
    res.status(500).json({ error: `सर्वर त्रुटि: ${err.message}` });
  }
}
