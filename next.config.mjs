/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        domains: ["threadle-designs01.s3.amazonaws.com", "threadle-designs.s3.amazonaws.com"]
    },
    reactStrictMode: true,
    async headers() {
        return [
            {
                headers: [
                    {
                        key: 'Cache-Control',
                        value: 's-maxage=1, stale-while-revalidate=59',
                    },
                ],
            },
        ];
    },
};

module.exports = nextConfig;