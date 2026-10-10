import crypto from 'node:crypto';

// Secret key for HMAC token signing
const JWT_SECRET = process.env.ADMIN_JWT_SECRET || process.env.ADMIN_PASSWORD || 'indroli_secret_admin_token_key_2026';

/**
 * Verify admin password against environment variable.
 */
export function verifyAdminPassword(inputPassword) {
  const expectedPassword = process.env.ADMIN_PASSWORD;
  if (!expectedPassword) {
    // If not configured in environment, use default password for local verification
    return inputPassword === 'Indroli@Admin2026';
  }
  return inputPassword === expectedPassword;
}

/**
 * Generate a signed HMAC session token with 24-hour expiration.
 */
export function generateAdminToken(username = 'admin') {
  const payload = {
    user: username,
    role: 'admin',
    exp: Date.now() + 24 * 60 * 60 * 1000 // 24 hours
  };
  const payloadStr = Buffer.from(JSON.stringify(payload)).toString('base64url');
  const signature = crypto.createHmac('sha256', JWT_SECRET).update(payloadStr).digest('base64url');
  return `${payloadStr}.${signature}`;
}

/**
 * Verify Bearer token from request headers.
 */
export function verifyAdminToken(authHeader) {
  if (!authHeader || typeof authHeader !== 'string' || !authHeader.startsWith('Bearer ')) {
    return false;
  }

  const token = authHeader.slice(7).trim();
  const parts = token.split('.');
  if (parts.length !== 2) {
    return false;
  }

  const [payloadStr, signature] = parts;
  const expectedSignature = crypto.createHmac('sha256', JWT_SECRET).update(payloadStr).digest('base64url');

  if (signature !== expectedSignature) {
    return false;
  }

  try {
    const payload = JSON.parse(Buffer.from(payloadStr, 'base64url').toString('utf8'));
    if (!payload.exp || Date.now() > payload.exp) {
      return false; // Token expired
    }
    return payload.role === 'admin';
  } catch {
    return false;
  }
}
