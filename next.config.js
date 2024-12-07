/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        domains: ["images.unsplash.com", "assets.aceternity.com"],
    },
    webpack: (config) => {
        config.externals.push(
            "pino-pretty" /* add any other modules that might be causing the error */
        );
        return config;
    },
};

module.exports = nextConfig;
