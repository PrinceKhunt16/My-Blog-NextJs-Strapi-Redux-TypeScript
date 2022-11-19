module.exports = ({ env }) => ({
    upload: {
        config: {
            providerOptions: {
                sizeLimit: 250 * 1024 * 1024
            }
        }
    }
});