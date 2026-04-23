// PM2 process config for Fileninja
// Usage on server: pm2 start ecosystem.config.js --env production && pm2 save
module.exports = {
  apps: [
    {
      name: "fileninja",
      script: "node_modules/next/dist/bin/next",
      args: "start -H 0.0.0.0 -p 3005",
      cwd: "/var/www/fileninja",
      instances: 1,
      exec_mode: "fork",
      watch: false,
      max_memory_restart: "1G",
      env: {
        NODE_ENV: "production",
        PORT: 3005
      },
      error_file: "/var/log/fileninja/error.log",
      out_file: "/var/log/fileninja/out.log",
      merge_logs: true,
      time: true
    }
  ]
};
