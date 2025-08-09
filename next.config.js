/** @type {import('next').NextConfig} */
const nextConfig = {
    // Required for Dockerfile that copies .next/standalone and runs server.js
    output: 'standalone',
}

module.exports = nextConfig
