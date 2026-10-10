import { getSupabaseClient } from './_lib/supabase.js';
import { sendWhatsAppNotification } from './_lib/whatsapp.js';
import { parseJsonBody } from './_lib/body.js';

// Development in-memory fallback store when Supabase credentials are not yet configured locally
const devLocalStore = [];

export default async function handler(req, res) {
  // CORS & Methods
  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  if (req.method !== 'POST') {
    res.status(405).json({ error: 'Method Not Allowed' });
    return;
  }

  try {
    const body = await parseJsonBody(req);
    const {
      citizenName,
      mobile,
      mohallaLocation,
      category,
      description,
      photoUrl,
      recordType = 'complaint'
    } = body;

    // 1. Validation
    if (!citizenName || !citizenName.trim()) {
      res.status(400).json({ error: 'कृपया नागरिक का पूरा नाम दर्ज करें।' });
      return;
    }

    const cleanMobile = (mobile || '').replace(/\D/g, '');
    if (cleanMobile.length !== 10) {
      res.status(400).json({ error: 'कृपया 10 अंकों का मान्य मोबाइल नंबर दर्ज करें।' });
      return;
    }

    if (!mohallaLocation || !mohallaLocation.trim()) {
      res.status(400).json({ error: 'कृपया गाँव में स्थान या मोहल्ला दर्ज करें।' });
      return;
    }

    if (!category || !category.trim()) {
      res.status(400).json({ error: 'कृपया समस्या अथवा सुझाव की श्रेणी चुनें।' });
      return;
    }

    if (!description || description.trim().length < 15) {
      res.status(400).json({ error: 'कृपया कम से कम 15 अक्षरों में स्पष्ट विवरण प्रदान करें।' });
      return;
    }

    // 2. Generate Unique Ticket ID
    const randomSuffix = Math.floor(1000 + Math.random() * 9000);
    const prefix = recordType === 'suggestion' ? 'SUG-2026' : 'IND-2026';
    const ticketId = `${prefix}-${randomSuffix}`;

    const newRecord = {
      ticket_id: ticketId,
      record_type: recordType === 'suggestion' ? 'suggestion' : 'complaint',
      citizen_name: citizenName.trim(),
      mobile: cleanMobile,
      mohalla_location: mohallaLocation.trim(),
      category: category.trim(),
      description: description.trim(),
      photo_url: photoUrl || null,
      status: 'प्राप्त',
      status_en: 'Received',
      action_note: recordType === 'suggestion'
        ? 'सुझाव नागरिक पोर्टल पर प्राप्त हुआ है और समीक्षाधीन है।'
        : 'शिकायत नागरिक पोर्टल पर सफलतापूर्वक पंजीकृत हो गई है।',
      created_at: new Date().toISOString()
    };

    // 3. Persistent Database Storage via Supabase
    const supabase = getSupabaseClient();
    let savedInDb = false;

    if (supabase) {
      const { error } = await supabase
        .from('complaints_and_suggestions')
        .insert([newRecord]);

      if (error) {
        console.error('[Supabase Insert Error]', error);
        res.status(500).json({
          success: false,
          error: `डेटाबेस में सहेजने में विफल: ${error.message}`
        });
        return;
      }
      savedInDb = true;
    } else {
      // In development, if Supabase env vars are not yet supplied:
      if (process.env.NODE_ENV === 'production') {
        res.status(503).json({
          success: false,
          error: 'डेटाबेस कनेक्शन उपलब्ध नहीं है। कृपया Vercel Environment Variables में SUPABASE_URL और SUPABASE_SERVICE_ROLE_KEY कॉन्फ़िगर करें।'
        });
        return;
      }
      // Dev mode local memory store
      devLocalStore.unshift(newRecord);
      savedInDb = true;
    }

    // 4. WhatsApp Notification (Dispatched server-side without leaking private credentials)
    let whatsappResult = { sent: false, configured: false };
    try {
      whatsappResult = await sendWhatsAppNotification({
        ticketId,
        recordType: newRecord.record_type,
        category: newRecord.category,
        mohallaLocation: newRecord.mohalla_location,
        description: newRecord.description
      });
    } catch (notifErr) {
      // Notification failure must NOT delete or discard the complaint
      console.warn('[WhatsApp Notification Dispatch Failed, DB Record Retained]', notifErr);
      whatsappResult = { sent: false, error: notifErr.message };
    }

    // 5. Success Response
    res.status(201).json({
      success: true,
      ticketId,
      recordType: newRecord.record_type,
      status: 'प्राप्त',
      savedInDb,
      storageTarget: supabase ? 'supabase_postgresql' : 'dev_memory_fallback',
      whatsapp: whatsappResult
    });
  } catch (err) {
    console.error('[Complaints API Error]', err);
    res.status(500).json({
      success: false,
      error: `सर्वर त्रुटि: ${err.message}`
    });
  }
}

// Export dev local store for dev environment cross-module access
export { devLocalStore };
