module.exports = {
    async rewrites() {
        return [
            {
                source: "/recipes",
                destination: "/recipes/page/1",
            },
        ];
    },
    async redirects() {
        return [
            {
                source: "/recipes/page",
                destination: "/recipes",
                permanent: true,
            },
        ];
    },
    images: {
        domains: ["cdn.buttercms.com"],
    },
};
