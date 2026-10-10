import { getSupabaseClient } from './_lib/supabase.js';
import { initialComplaints } from '../src/data/complaintsData.js';
import { devLocalStore } from './complaints.js';

function maskName(name) {
  if (!name) return 'नागरिक';
  const parts = name.trim().split(' ');
  if (parts.length === 1) {
    return parts[0].slice(0, 2) + '***';
  }
  return parts[0] + ' ' + parts[parts.length - 1].slice(0, 1) + '***';
}

function maskMobile(mobile) {
  if (!mobile) return '**********';
  const clean = mobile.replace(/\D/g, '');
  if (clean.length === 10) {
    return clean.slice(0, 4) + 'XXXX' + clean.slice(8);
  }
  return 'XXXXXX' + clean.slice(-4);
}

export default async function handler(req, res) {
  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  if (req.method !== 'GET') {
    res.status(405).json({ error: 'Method Not Allowed' });
    return;
  }

  const queryUrl = new URL(req.url, 'http://localhost');
  const ticketId = (queryUrl.searchParams.get('ticketId') || '').trim().toUpperCase();

  if (!ticketId) {
    res.status(400).json({ error: 'कृपया टिकट संख्या प्रदान करें।' });
    return;
  }

  try {
    const supabase = getSupabaseClient();
    let record = null;

    if (supabase) {
      const { data, error } = await supabase
        .from('complaints_and_suggestions')
        .select('*')
        .eq('ticket_id', ticketId)
        .maybeSingle();

      if (!error && data) {
        record = {
          ticketId: data.ticket_id,
          recordType: data.record_type,
          citizenName: maskName(data.citizen_name),
          mobile: maskMobile(data.mobile),
          category: data.category,
          mohallaLocation: data.mohalla_location,
          description: data.description,
          photoUrl: data.photo_url,
          status: data.status,
          statusEn: data.status_en,
          actionNote: data.action_note,
          submittedAt: new Date(data.created_at).toLocaleDateString('hi-IN', {
            day: 'numeric',
            month: 'long',
            year: 'numeric'
          })
        };
      }
    }

    // Check dev local store if not found in Supabase
    if (!record && Array.isArray(devLocalStore)) {
      const devFound = devLocalStore.find(c => c.ticket_id.toUpperCase() === ticketId);
      if (devFound) {
        record = {
          ticketId: devFound.ticket_id,
          recordType: devFound.record_type,
          citizenName: maskName(devFound.citizen_name),
          mobile: maskMobile(devFound.mobile),
          category: devFound.category,
          mohallaLocation: devFound.mohalla_location,
          description: devFound.description,
          photoUrl: devFound.photo_url,
          status: devFound.status,
          statusEn: devFound.status_en,
          actionNote: devFound.action_note,
          submittedAt: new Date(devFound.created_at).toLocaleDateString('hi-IN', {
            day: 'numeric',
            month: 'long',
            year: 'numeric'
          })
        };
      }
    }

    // Check seed demo complaints if still not found
    if (!record) {
      const seedFound = initialComplaints.find(c => c.ticketId.toUpperCase() === ticketId);
      if (seedFound) {
        record = {
          ticketId: seedFound.ticketId,
          recordType: 'complaint',
          citizenName: maskName(seedFound.citizenName),
          mobile: maskMobile(seedFound.mobile),
          category: seedFound.category,
          mohallaLocation: seedFound.location,
          description: seedFound.description,
          photoUrl: seedFound.photoUrl,
          status: seedFound.status,
          statusEn: seedFound.statusEn || 'Under Review',
          actionNote: seedFound.actionNote,
          submittedAt: seedFound.submittedAt
        };
      }
    }

    if (!record) {
      res.status(404).json({
        error: 'यह टिकट संख्या नहीं मिली। कृपया सही आईडी (उदा. IND-2026-1042) जांचें।'
      });
      return;
    }

    res.status(200).json({
      success: true,
      record
    });
  } catch (err) {
    console.error('[Track API Error]', err);
    res.status(500).json({ error: `ट्रैकिंग में त्रुटि: ${err.message}` });
  }
}
