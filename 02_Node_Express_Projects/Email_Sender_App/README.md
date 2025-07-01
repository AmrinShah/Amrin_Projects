
# 📧 Node.js Email Sender

A simple Node.js app using Nodemailer to send emails securely with `.env` for credentials.

## 🚀 Features
- Sends emails via Gmail
- Uses environment variables (`dotenv`)
- Clean & secure structure

## 📦 Setup

```bash
npm install
```

### Create a `.env` file:

```
EMAIL_USER=your_email@gmail.com
EMAIL_PASS=your_app_password
RECIPIENT_EMAIL=recipient@example.com
```

### Run the project:

```bash
node email.js
```

## 🔐 Notes
- Use **Gmail App Passwords**, not your real Gmail password
- `.env` is **ignored via** `.gitignore`

---


