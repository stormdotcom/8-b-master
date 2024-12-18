Here’s the updated **Markdown documentation** with detailed PostgreSQL commands, including creating and verifying a database.

---

# **Setup Guide: Node.js, PM2, NGINX, and PostgreSQL**

This guide provides step-by-step instructions to set up:
- **Node.js** application
- **PM2** for process management
- **NGINX** as a reverse proxy
- **PostgreSQL 14** as the database  
All on an **Ubuntu server**.

---

## **Step 1: Install Prerequisites**

### **1.1 Update the System**
```bash
sudo apt update && sudo apt upgrade -y
```

### **1.2 Install Node.js (LTS version)**
```bash
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt install -y nodejs
```

### **1.3 Install NGINX**
```bash
sudo apt install -y nginx
```

### **1.4 Install PM2 (Global)**
```bash
sudo npm install -g pm2
```

---

## **Step 2: Install PostgreSQL 14**

### **2.1 Install PostgreSQL 14**
Run the following commands to install PostgreSQL 14:

```bash
sudo apt install -y wget ca-certificates
wget --quiet -O - https://www.postgresql.org/media/keys/ACCC4CF8.asc | sudo apt-key add -
echo "deb http://apt.postgresql.org/pub/repos/apt/ $(lsb_release -cs)-pgdg main" | sudo tee /etc/apt/sources.list.d/pgdg.list
sudo apt update
sudo apt install -y postgresql-14 postgresql-client-14
```

### **2.2 Start and Enable PostgreSQL Service**
```bash
sudo systemctl start postgresql
sudo systemctl enable postgresql
```

---

### **2.3 Create and Verify a Database**

1. **Access PostgreSQL Prompt**:
   - If you are using `sudo`, run:
     ```bash
     sudo -u postgres psql
     ```
   - If you are not using `sudo`, run:
     ```bash
     psql -U postgres
     ```

2. **Create a New Database**:
   In the PostgreSQL prompt, run:
   ```sql
   CREATE DATABASE "8-b-master";
   ```

3. **Verify the Database Creation**:
   To list all databases, run:
   ```sql
   \l
   ```

4. Exit the PostgreSQL prompt:
   ```sql
   \q
   ```

---

## **Step 3: Deploy Your Node.js App**

### **3.1 Clone Your Project**
```bash
git clone git@github.com:username/repository.git
cd repository
```

### **3.2 Install Project Dependencies**
```bash
npm install
```

### **3.3 Build the Project (For TypeScript Projects)**
```bash
tsc
```

### **3.4 Start the Application with PM2**
```bash
pm2 start dist/app.js --name master-api
pm2 save
pm2 startup
```

---

## **Step 4: Configure NGINX as a Reverse Proxy**

### **4.1 Remove Default NGINX Site**
```bash
sudo rm /etc/nginx/sites-enabled/default
```

### **4.2 Create a New NGINX Configuration**
```bash
sudo nano /etc/nginx/sites-available/node-api
```

### **4.3 Add Reverse Proxy Configuration**
Replace api.ajmalnasumudeen.in;` and port as needed.

```nginx
   server {
      listen 80;
      server_name api.ajmalnasumudeen.in;

      location / {
         proxy_pass http://127.0.0.1:6060;
         proxy_http_version 1.1;
         proxy_set_header Upgrade $http_upgrade;
         proxy_set_header Connection 'upgrade';
         proxy_set_header Host $host;
         proxy_cache_bypass $http_upgrade;
      }
   }
```

### **4.4 Enable the New Configuration**
```bash
sudo ln -s /etc/nginx/sites-available/node-api /etc/nginx/sites-enabled/default
```

### **4.5 Test and Reload NGINX**
```bash
sudo nginx -t
sudo systemctl reload nginx
```

---

## **Step 5: Monitor Logs and Processes**

### **5.1 Monitor Incoming Requests (NGINX Logs)**
To monitor requests and filter for specific endpoints (e.g., `/api`):
```bash
sudo tail -f /var/log/nginx/access.log | grep "/api"
```

### **5.2 Manage PM2 Processes**
- Restart the app:
   ```bash
   pm2 restart master-api
   ```
- View real-time logs:
   ```bash
   pm2 logs master-api
   ```
- Check PM2 status:
   ```bash
   pm2 status
   ```

---

## **Step 6: Verify the Setup**

1. **Check PM2 Status**:
   ```bash
   pm2 status
   ```

2. **Verify NGINX**:
   ```bash
   sudo systemctl status nginx
   ```

3. **Verify PostgreSQL Service**:
   ```bash
   sudo systemctl status postgresql
   ```

4. **Access the Node.js Application**:
   Open your browser or use `curl`:
   ```bash
   http://your_server_ip
   ```

---

## **Summary of Commands**

### Install Prerequisites:
```bash
sudo apt update && sudo apt upgrade -y
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt install -y nodejs nginx wget ca-certificates
sudo npm install -g pm2
```

### Install PostgreSQL 14:
```bash
wget --quiet -O - https://www.postgresql.org/media/keys/ACCC4CF8.asc | sudo apt-key add -
echo "deb http://apt.postgresql.org/pub/repos/apt/ $(lsb_release -cs)-pgdg main" | sudo tee /etc/apt/sources.list.d/pgdg.list
sudo apt update
sudo apt install -y postgresql-14 postgresql-client-14
sudo systemctl start postgresql
sudo systemctl enable postgresql
```

### Create and Verify a Database:
```bash
sudo -u postgres psql
```
Inside the PostgreSQL prompt:
```sql
CREATE DATABASE "8-b-master";
\l
\q
```

### Deploy Node.js App:
```bash
git clone git@github.com:username/repository.git
cd repository
npm install
tsc
pm2 start dist/app.js --name master-api
pm2 save && pm2 startup
```

### Configure NGINX Reverse Proxy:
```bash
sudo rm /etc/nginx/sites-enabled/default
sudo nano /etc/nginx/sites-available/node-api
sudo ln -s /etc/nginx/sites-available/node-api /etc/nginx/sites-enabled/default
sudo nginx -t
sudo systemctl reload nginx
```

### Monitor and Manage:
```bash
sudo tail -f /var/log/nginx/access.log | grep "/api"
pm2 restart master-api
pm2 logs master-api
```

---

name: CI/CD Pipeline

on:
  push:
    branches:
      - main

jobs:
  build-and-deploy:
    runs-on: ubuntu-latest

    steps:
      # Step 1: Check out the code
      - name: Checkout Code
        uses: actions/checkout@v3

      # Step 2: Install dependencies and build
      - name: Install Dependencies
        run: |
          sudo apt-get update
          sudo apt-get install -y nodejs npm
          npm ci
          npm run build

      # Step 3: Deploy to Ubuntu server
      - name: Deploy to Server
        uses: appleboy/ssh-action@v0.1.2
        with:
          host: ${{ secrets.SERVER_HOST }}
          username: ${{ secrets.SERVER_USER }}
          key: ${{ secrets.SERVER_SSH_KEY }}
          port: 22
          script: |
            cd /var/www/8-b-master
            git pull origin main
            npm install --production
            pm2 restart all
