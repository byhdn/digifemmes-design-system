/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  basePath: '/digifemmes-design-system',
  images: { unoptimized: true },
  transpilePackages: ['@digifemmes/tokens', '@digifemmes/ui', '@digifemmes/icons', '@digifemmes/ai'],
};

export default nextConfig;
