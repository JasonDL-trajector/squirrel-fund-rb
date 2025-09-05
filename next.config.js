/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  compress: true,
  poweredByHeader: false,
  // Prepare for PWA/service worker and apply security + caching headers
  async headers() {
    const securityHeaders = [
      { key: 'X-Content-Type-Options', value: 'nosniff' },
      { key: 'X-Frame-Options', value: 'DENY' },
      { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
      { key: 'Permissions-Policy', value: 'geolocation=(self), microphone=(self), camera=(self), payment=(self)' },
      { key: 'Cross-Origin-Opener-Policy', value: 'same-origin-allow-popups' },
      { key: 'Cross-Origin-Resource-Policy', value: 'same-origin' },
      // Strict-Transport-Security is only effective over HTTPS (expected in production)
      { key: 'Strict-Transport-Security', value: 'max-age=63072000; includeSubDomains; preload' },
    ];

    return [
      // App pages: security headers
      {
        source: '/:path*',
        headers: securityHeaders,
      },
      // Manifest should have the correct content type and reasonable cache
      {
        source: '/manifest.json',
        headers: [
          { key: 'Content-Type', value: 'application/manifest+json; charset=utf-8' },
          { key: 'Cache-Control', value: 'public, max-age=0, must-revalidate' },
        ],
      },
      // Icons and static PWA assets (targeted to avoid staling dynamic media)
      { source: '/favicon:all*', headers: [ { key: 'Cache-Control', value: 'public, max-age=604800, immutable' } ] },
      { source: '/apple-touch-:all*', headers: [ { key: 'Cache-Control', value: 'public, max-age=604800, immutable' } ] },
      { source: '/android-chrome-:all*', headers: [ { key: 'Cache-Control', value: 'public, max-age=604800, immutable' } ] },
      // Next.js build assets
      {
        source: '/_next/static/:path*',
        headers: [
          { key: 'Cache-Control', value: 'public, max-age=31536000, immutable' },
        ],
      },
      // Service worker preparation (when added under public/)
      {
        source: '/(sw|service-worker).js',
        headers: [
          { key: 'Service-Worker-Allowed', value: '/' },
          { key: 'Cache-Control', value: 'no-cache' },
        ],
      },
    ];
  },
};

module.exports = nextConfig;
