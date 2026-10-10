import { verifyAdminToken } from '../_lib/auth.js';
import { getSupabaseClient } from '../_lib/supabase.js';
import { initialComplaints } from '../../src/data/complaintsData.js';
import { devLocalStore } from '../complaints.js';

export default async function handler(req, res) {
  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  if (req.method !== 'GET') {
    res.status(405).json({ error: 'Method Not Allowed' });
    return;
  }

  // 1. Verify Admin Authorization Token
  const authHeader = req.headers.authorization || '';
  if (!verifyAdminToken(authHeader)) {
    res.status(401).json({
      error: 'अनधिकृत प्रवेश (Unauthorized)! कृपया एडमिन लॉगिन करें।'
    });
    return;
  }

  try {
    const supabase = getSupabaseClient();
    let records = [];

    if (supabase) {
      const { data, error } = await supabase
        .from('complaints_and_suggestions')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) {
        console.error('[Admin Records Supabase Error]', error);
        res.status(500).json({ error: `डेटाबेस से रिकॉर्ड प्राप्त करने में त्रुटि: ${error.message}` });
        return;
      }

      records = (data || []).map(row => ({
        ticketId: row.ticket_id,
        recordType: row.record_type || 'complaint',
        citizenName: row.citizen_name,
        mobile: row.mobile,
        category: row.category,
        location: row.mohalla_location,
        description: row.description,
        photoUrl: row.photo_url,
        status: row.status,
        statusEn: row.status_en,
        actionNote: row.action_note,
        submittedAt: new Date(row.created_at).toLocaleDateString('hi-IN', {
          day: 'numeric',
          month: 'long',
          year: 'numeric'
        }),
        createdAt: row.created_at
      }));
    } else {
      // In dev environment when Supabase is not yet connected
      const devItems = (devLocalStore || []).map(row => ({
        ticketId: row.ticket_id,
        recordType: row.record_type || 'complaint',
        citizenName: row.citizen_name,
        mobile: row.mobile,
        category: row.category,
        location: row.mohalla_location,
        description: row.description,
        photoUrl: row.photo_url,
        status: row.status,
        statusEn: row.status_en,
        actionNote: row.action_note,
        submittedAt: new Date(row.created_at).toLocaleDateString('hi-IN', {
          day: 'numeric',
          month: 'long',
          year: 'numeric'
        }),
        createdAt: row.created_at
      }));

      // Combine dev local store and initial demo complaints
      records = [...devItems, ...initialComplaints.map(c => ({
        ...c,
        recordType: 'complaint',
        createdAt: new Date().toISOString()
      }))];
    }

    res.status(200).json({
      success: true,
      records
    });
  } catch (err) {
    console.error('[Admin Records Error]', err);
    res.status(500).json({ error: `सर्वर त्रुटि: ${err.message}` });
  }
}
