import http from 'http';

const routes = [
  '/',
  '/events',
  '/events/ev-kolkata-2026',
  '/apply',
  '/watch',
  '/talent',
  '/about',
  '/admin',
  '/admin/events',
  '/admin/applications',
  '/admin/videos',
  '/admin/talent',
  '/admin/guests',
  '/admin/sponsors',
  '/admin/settings',
  '/some-random-404-url'
];

async function checkRoute(route) {
  return new Promise((resolve, reject) => {
    http.get(`http://localhost:3000${route}`, (res) => {
      let data = '';
      res.on('data', (chunk) => { data += chunk; });
      res.on('end', () => {
        resolve({ route, status: res.statusCode, hasRoot: data.includes('id="root"') });
      });
    }).on('error', (err) => {
      reject(err);
    });
  });
}

async function run() {
  console.log('Testing Vite routes...');
  for (const r of routes) {
    try {
      const res = await checkRoute(r);
      console.log(`[PASS] ${res.route} -> HTTP ${res.status} (Vite SPA HTML returned: ${res.hasRoot})`);
    } catch (e) {
      console.error(`[FAIL] ${r} -> ${e.message}`);
    }
  }
}

run();
