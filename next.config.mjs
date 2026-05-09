/** @type {import('next').NextConfig} */
const nextConfig = {
  /* config options here */
  reactCompiler: true,
  allowedDevOrigins: ['10.42.0.1'],
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'diwhqxynbnsxewewvxyy.supabase.co', 
        port: '',
        pathname: '/storage/v1/object/public/**',
      },
    ],
  },
  // NEW: The Root Redirect
  async redirects() {
    return [
      {
        source: '/',
        destination: '/home',
        permanent: true,
      },
    ];
  },
};

export default nextConfig;