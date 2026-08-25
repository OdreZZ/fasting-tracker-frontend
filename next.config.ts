import type { NextConfig } from "next";
import { version } from "./package.json";
const withPWA = require("next-pwa");

const nextConfig: NextConfig = {
    reactStrictMode: true,
    env: {
        NEXT_PUBLIC_APP_VERSION: version,
    },
    turbopack: {
        rules: {
            '*.svg': {
                loaders: ['@svgr/webpack'],
                as: '*.js',
            },
        },
    },
};

export default withPWA({
    dest: "public",
    skipWaiting: true,
    disable: process.env.NODE_ENV === "development",
})(nextConfig);
