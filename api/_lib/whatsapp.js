/**
 * Sends a notification to the administrator's WhatsApp using the official
 * Meta WhatsApp Business Platform Cloud API.
 * 
 * Strict Privacy & Security:
 * - Runs exclusively server-side.
 * - Citizen's private phone number and sensitive personal data are not leaked.
 * - Truncates description to avoid payload overflow and privacy exposure.
 * - Does NOT fake success if credentials are not configured.
 */
export async function sendWhatsAppNotification({ ticketId, recordType, category, mohallaLocation, description }) {
  const token = process.env.WHATSAPP_ACCESS_TOKEN;
  const phoneNumberId = process.env.WHATSAPP_PHONE_NUMBER_ID;
  const adminPhone = process.env.WHATSAPP_ADMIN_PHONE;
  const templateName = process.env.WHATSAPP_TEMPLATE_NAME;

  // 1. Check if WhatsApp credentials exist
  if (!token || !phoneNumberId || !adminPhone) {
    return {
      sent: false,
      configured: false,
      reason: 'WhatsApp API credentials (WHATSAPP_ACCESS_TOKEN, WHATSAPP_PHONE_NUMBER_ID, WHATSAPP_ADMIN_PHONE) are not configured in environment variables.'
    };
  }

  // 2. Prepare sanitized, privacy-safe summary
  const safeDescription = description 
    ? description.trim().slice(0, 140) + (description.trim().length > 140 ? '...' : '') 
    : 'कोई विवरण नहीं';

  const typeHindi = recordType === 'suggestion' ? 'नया विकास सुझाव' : 'नई नागरिक शिकायत';
  const cleanRecipient = adminPhone.replace(/\D/g, '');

  let payload;

  if (templateName) {
    // Official template message (for production with approved Meta WhatsApp template)
    payload = {
      messaging_product: 'whatsapp',
      recipient_type: 'individual',
      to: cleanRecipient,
      type: 'template',
      template: {
        name: templateName,
        language: { code: process.env.WHATSAPP_TEMPLATE_LANG || 'hi' },
        components: [
          {
            type: 'body',
            parameters: [
              { type: 'text', text: ticketId },
              { type: 'text', text: `${typeHindi} (${category})` },
              { type: 'text', text: safeDescription }
            ]
          }
        ]
      }
    };
  } else {
    // Direct text message (suitable for development/sandbox or within standard messaging window)
    const textBody = 
`🔔 *ग्राम पंचायत इन्द्रौली पोर्टल अधिसूचना*
📌 *प्रकार:* ${typeHindi}
🎫 *टोकन संख्या:* ${ticketId}
📂 *श्रेणी:* ${category}
📍 *स्थान:* ${mohallaLocation || 'ग्राम इन्द्रौली'}
📝 *संक्षिप्त विवरण:* ${safeDescription}

🔗 पोर्टल एडमिन डैशबोर्ड पर लॉगिन कर स्थिति अद्यतन करें।`;

    payload = {
      messaging_product: 'whatsapp',
      recipient_type: 'individual',
      to: cleanRecipient,
      type: 'text',
      text: {
        preview_url: false,
        body: textBody
      }
    };
  }

  try {
    const url = `https://graph.facebook.com/v21.0/${phoneNumberId}/messages`;
    const res = await fetch(url, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(payload)
    });

    const data = await res.json();

    if (!res.ok) {
      console.warn('[WhatsApp Cloud API Error Response]', data);
      return {
        sent: false,
        configured: true,
        error: data.error ? data.error.message : `HTTP ${res.status}`
      };
    }

    return {
      sent: true,
      configured: true,
      messageId: data.messages && data.messages[0] ? data.messages[0].id : null
    };
  } catch (err) {
    console.error('[WhatsApp Cloud API Network Exception]', err);
    return {
      sent: false,
      configured: true,
      error: err.message
    };
  }
}
