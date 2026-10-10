import { verifyAdminPassword, generateAdminToken } from '../_lib/auth.js';
import { parseJsonBody } from '../_lib/body.js';

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
    const { password } = body;

    if (!password) {
      res.status(400).json({ error: 'कृपया एडमिन पासवर्ड दर्ज करें।' });
      return;
    }

    if (!verifyAdminPassword(password)) {
      res.status(401).json({ error: 'अमान्य पासवर्ड! कृपया सही व्यवस्थापक पासवर्ड दर्ज करें।' });
      return;
    }

    const token = generateAdminToken('panchayat_admin');

    res.status(200).json({
      success: true,
      message: 'सफलतापूर्वक प्रमाणीकृत!',
      token
    });
  } catch (err) {
    console.error('[Admin Login Error]', err);
    res.status(500).json({ error: `प्रमाणीकरण में त्रुटि: ${err.message}` });
  }
}
