/** @type {import('next').NextConfig} */
const nextConfig = {
    env: {
        API_KEY: process.env.API_KEY,
        AUTH_DOMAIN: process.env.AUTH_DOMAIN,
        PROJECT_ID: process.env.PROJECT_ID,
        STORAGE_BUCKET: process.env.STORAGE_BUCKET,
        MESSAGING_SENDER_ID: process.env.MESSAGING_SENDER_ID,
        APP_ID: process.env.APP_ID,
        // INFURA: process.env.INFURA,
        // COINMARKET: process.env.COINMARKET,
        // MEASUREMENT_ID: process.env.MEASUREMENT_ID,
    },
    webpack: (config) => {
        // Añade esto para evitar errores con ciertos módulos
        config.resolve.fallback = {
            ...config.resolve.fallback,
            fs: false, // Evita errores relacionados con el módulo 'fs'
        };

        return config;
    },
};

export default nextConfig;
