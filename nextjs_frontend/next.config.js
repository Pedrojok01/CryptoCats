/** @type {import('next').NextConfig} */
const nextConfig = {
  // Every page is static: export plain HTML so Netlify serves files (and 404.html)
  // without a server function.
  output: "export",
  images: { unoptimized: true },
};

module.exports = nextConfig;
