// eslint-disable-next-line @typescript-eslint/no-var-requires
const withPWA = require("next-pwa");

const isDev = process.env.NODE_ENV === "development";

module.exports = withPWA({
    future: {
        webpack5: true,
    },
    pwa: {
        dest: "public",
        disable: isDev,
        register: !isDev,
    },
});
