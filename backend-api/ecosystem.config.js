module.exports = {
  apps: [
    {
      name: 'pizza-api',
      instances: 1,
      script: 'server.js',
      autorestart: true,
      watch: '.',
      watch_delay: 1000,
      ignore_watch: ['node_modules', '.git', 'seeds', '*.md'],
    },
  ],
};
