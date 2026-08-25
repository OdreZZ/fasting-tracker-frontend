/** @type {import('next').NextConfig} */
const withPWA = require('next-pwa')({
    dest: 'public',
    register: true,
    skipWaiting: true,
});

const { version } = require("./package.json");
module.exports = withPWA({
    reactStrictMode: true,
    env: {
        NEXT_PUBLIC_APP_VERSION: version,
    },
});
