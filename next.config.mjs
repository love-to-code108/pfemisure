/** @type {import('next').NextConfig} */
const nextConfig = {
  /* config options here */
  reactCompiler: true,
  allowedDevOrigins: ['10.91.103.58'],
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'diwhqxynbnsxewewvxyy.supabase.co', // Replace with your actual Supabase URL
        port: '',
        pathname: '/storage/v1/object/public/**',
      },
    ],
  },
};

export default nextConfig;
