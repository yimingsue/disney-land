/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: "https",
                hostname: "links.papareact.com"
            },
            {
                protocol: "http",
                hostname: "image.tmdb.org"
            }
        ]
    }
}

module.exports = nextConfig
