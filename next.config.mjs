/** @type {import('next').NextConfig} */
const nextConfig = {
    webpack: (config) => {
        config.resolve.fallback = {
            ...config.resolve.fallback,
            fs: false, // Evita errores relacionados con el módulo 'fs'
        };

        return config;
    },
};

export default nextConfig;
