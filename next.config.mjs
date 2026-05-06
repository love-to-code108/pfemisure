/** @type {import('next').NextConfig} */
const nextConfig = {
  /* config options here */
  reactCompiler: true,
  allowedDevOrigins: ['172.17.0.1'],
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
