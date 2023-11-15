# Start HTTP server

## With self-signed certificate (for testing)

- Generate certificates, run: `./cert/generate.sh`
- Start server: `node server.js`
- Open in browser: `https://127.0.0.1:8000/`

## With certbot (for production)

- Let's Encrypt is a free certificate authority: https://letsencrypt.org/
- Use Certbot (free tool for automatically generatinging Let’s Encrypt
  certificates to enable HTTPS): https://certbot.eff.org/
  - Install: `dnf -y install certbot`
- Generate certificate:
  `certbot certonly --standalone -d www.domain.com -d domain.com -m your.name@domain.com --agree-tos --no-eff-email`
- Copy certificate:
  `cp /etc/letsencrypt/live/domain.com/fullchain.pem ./cert/cert.pem`
- Copy private key:
  `cp /etc/letsencrypt/live/domain.com/privkey.pem ./cert/key.pem`
- Or use your web server for challenge exchange:
  `certbot certonly --webroot -w ./ -d domain.com -m your.name@domain.com --agree-tos --no-eff-email`
