import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';

/**
 * Dev-only server middleware to route /api/* requests to the corresponding
 * API handlers during local development (npm run dev).
 * In production on Vercel, Vercel natively executes the files in /api.
 */
function apiDevPlugin() {
  return {
    name: 'api-dev-middleware',
    configureServer(server) {
      server.middlewares.use(async (req, res, next) => {
        if (!req.url.startsWith('/api/')) {
          return next();
        }

        try {
          const url = new URL(req.url, 'http://localhost');
          const pathname = url.pathname;

          let handlerModule;
          if (pathname === '/api/complaints' || pathname === '/api/complaints/') {
            handlerModule = await import('./api/complaints.js');
          } else if (pathname === '/api/track' || pathname === '/api/track/') {
            handlerModule = await import('./api/track.js');
          } else if (pathname === '/api/contact' || pathname === '/api/contact/') {
            handlerModule = await import('./api/contact.js');
          } else if (pathname === '/api/admin/login' || pathname === '/api/admin/login/') {
            handlerModule = await import('./api/admin/login.js');
          } else if (pathname === '/api/admin/records' || pathname === '/api/admin/records/') {
            handlerModule = await import('./api/admin/records.js');
          } else if (pathname === '/api/admin/update-status' || pathname === '/api/admin/update-status/') {
            handlerModule = await import('./api/admin/update-status.js');
          } else {
            return next();
          }

          if (handlerModule && handlerModule.default) {
            if (!res.status) {
              res.status = (code) => {
                res.statusCode = code;
                return res;
              };
            }
            if (!res.json) {
              res.json = (data) => {
                res.setHeader('Content-Type', 'application/json');
                res.end(JSON.stringify(data));
              };
            }
            return await handlerModule.default(req, res);
          }
          next();
        } catch (err) {
          console.error('[Vite Dev API Middleware Error]', err);
          res.statusCode = 500;
          res.setHeader('Content-Type', 'application/json');
          res.end(JSON.stringify({ error: err.message }));
        }
      });
    }
  };
}

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    apiDevPlugin(),
  ],
});
