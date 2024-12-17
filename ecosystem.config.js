module.exports = {
    apps: [
        {
            name: 'master-api',
            script: 'dist/server.js',
            env: {
                NODE_ENV: 'production',
                PORT: 6060,
                DB_USER: 'postgres',
                DB_PASSWORD: 'ajmal@admin',
                DB_HOST: '127.0.0.1',
                DB_PORT: 5432,
                DB_NAME: '8-b-master',
            },
        },
    ],
};
