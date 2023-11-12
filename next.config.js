import PWA from 'next-pwa';

const withPWA = PWA({
  dest: 'public',
  disable: process.env.NODE_ENV === 'development',
  register: true,
  skipWaiting: true,
})

export default withPWA({
  reactStrictMode: true,
  i18n: {
    locales: ["en"],
    defaultLocale: "en",
  },
  images: {
    domains: ["storage.googleapis.com", "storage.cloud.google.com"]
  },
})