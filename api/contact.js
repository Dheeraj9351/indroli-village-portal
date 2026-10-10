import { getSupabaseClient } from './_lib/supabase.js';
import { sendWhatsAppNotification } from './_lib/whatsapp.js';
import { parseJsonBody } from './_lib/body.js';
import { devLocalStore } from './complaints.js';

export default async function handler(req, res) {
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
    const { name, phone = '', subject = '', message } = body;

    if (!name || !name.trim()) {
      res.status(400).json({ error: 'कृपया अपना नाम दर्ज करें।' });
      return;
    }

    if (!message || message.trim().length < 5) {
      res.status(400).json({ error: 'कृपया संदेश का विवरण दर्ज करें।' });
      return;
    }

    const randomSuffix = Math.floor(1000 + Math.random() * 9000);
    const ticketId = `MSG-2026-${randomSuffix}`;
    const cleanPhone = phone ? phone.replace(/\D/g, '') : '9829000000';

    const newRecord = {
      ticket_id: ticketId,
      record_type: 'suggestion',
      citizen_name: name.trim(),
      mobile: cleanPhone || '9829000000',
      mohalla_location: 'ग्राम इन्द्रौली (सचिवालय पूछताछ)',
      category: subject.trim() || 'सामान्य जनसुझाव / पूछताछ',
      description: message.trim(),
      photo_url: null,
      status: 'प्राप्त',
      status_en: 'Received',
      action_note: 'नागरिक संदेश ग्राम सचिवालय में प्राप्त हुआ है।',
      created_at: new Date().toISOString()
    };

    const supabase = getSupabaseClient();
    if (supabase) {
      const { error } = await supabase
        .from('complaints_and_suggestions')
        .insert([newRecord]);

      if (error) {
        console.error('[Contact Form Insert Error]', error);
        res.status(500).json({ error: `डेटाबेस में सहेजने में विफल: ${error.message}` });
        return;
      }
    } else {
      devLocalStore.unshift(newRecord);
    }

    // Trigger WhatsApp notification for admin
    let whatsappResult = { sent: false };
    try {
      whatsappResult = await sendWhatsAppNotification({
        ticketId,
        recordType: 'suggestion',
        category: newRecord.category,
        mohallaLocation: newRecord.mohalla_location,
        description: newRecord.description
      });
    } catch (notifErr) {
      console.warn('[Contact WhatsApp Notification Error]', notifErr);
    }

    res.status(201).json({
      success: true,
      ticketId,
      message: 'आपका संदेश सफलतापूर्वक दर्ज हुआ और सचिवालय को प्रेषित कर दिया गया।',
      whatsapp: whatsappResult
    });
  } catch (err) {
    console.error('[Contact API Error]', err);
    res.status(500).json({ error: `सर्वर त्रुटि: ${err.message}` });
  }
}
