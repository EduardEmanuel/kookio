const url =
  process.env.BENCH_URL || 'https://dev.kookio.app/api/internal/bench-db';
const bypass = process.env.BYPASS_TOKEN;
const key = process.env.BENCH_KEY;
// Avoid Nx/TS path aliases in raw Node ESM scripts.
// Keep a tiny local logger instead of importing @kookio/logger.
const logger = {
  error: (...args) => console.error(...args),
  warn: (...args) => console.warn(...args),
  info: (...args) => console.log(...args),
  debug: (...args) => console.debug(...args),
};

if (!bypass) {
  logger.error('missing BYPASS_TOKEN');
  process.exit(1);
}
if (!key) {
  logger.error('missing BENCH_KEY');
  process.exit(1);
}

const res = await fetch(url, {
  headers: {
    'x-vercel-protection-bypass': bypass,
    'X-Bench-Key': key,
  },
});

if (!res.ok) {
  logger.error(`HTTP ${res.status} ${res.statusText}`);
  const txt = await res.text().catch(() => '');
  if (txt) logger.error(txt.slice(0, 400));
  process.exit(1);
}

let data;
try {
  data = await res.json();
} catch {
  logger.error('Response was not JSON. First 400 chars:');
  logger.error((await res.text()).slice(0, 400));
  process.exit(1);
}
logger.info('ℹ️ ', JSON.stringify(data, null, 2));
