# Aangan Admin Guide

## Default Login

- **URL:** scroll to the bottom of the website → click "Management Login"
  (or go directly to `/admin/login`)
- **Email:** `admin@aangan.com`
- **Password:** `aangan2025`

> **Change this password before going live!** See "Adding / Changing Users" below.

---

## How to Add or Change Admin Users

### Step 1 — Generate a password hash

Open a terminal in the project folder and run:

```bash
node scripts/hash-password.mjs YourNewPassword123
```

Copy the hashed password printed in the terminal.

### Step 2 — Edit `lib/admin-users.json`

Add a new entry (or update the existing one):

```json
[
  {
    "id": "1",
    "email": "admin@aangan.com",
    "password": "PASTE_HASH_HERE",
    "name": "Aangan Admin",
    "role": "owner"
  },
  {
    "id": "2",
    "email": "manager@aangan.com",
    "password": "ANOTHER_HASH_HERE",
    "name": "Restaurant Manager",
    "role": "manager"
  }
]
```

### Step 3 — Restart the server

```bash
npm run dev          # development
# or
pm2 restart aangan  # production
```

---

## Removing Access

Delete the user's entry from `lib/admin-users.json` and restart the server.

---

## Security Notes

- `lib/admin-users.json` is in `.gitignore` — **never commit it to GitHub**
- `.env.local` is also in `.gitignore` — keep it private
- Uploaded images in `/public/images/` are excluded from git (they live on the server only)
- The JWT session expires after 12 hours — staff must log in again after that

---

## Generating a New JWT Secret

If you need to regenerate the JWT secret (this will log out all active sessions):

```bash
node -e "console.log(require('crypto').randomBytes(48).toString('hex'))"
```

Paste the output into `.env.local` as `ADMIN_JWT_SECRET=...` and restart the server.
