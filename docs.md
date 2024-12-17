initial nginx setup
cd /etc/nginx/sites-enabled/
sudo rm default
sudo ln -s /etc/nginx/sites-available/node-api /etc/nginx/sites-enabled/default
sudo nginx -t
sudo systemctl reload nginx


sudo cat /etc/nginx/nginx.conf
