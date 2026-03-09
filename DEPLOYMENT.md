# 🚀 Deployment Guide

## Push to GitHub

### Step 1: Create New Repository on GitHub
1. Go to https://github.com/new
2. Repository name: `student-patient-app`
3. Description: `Full-stack Student/Patient Management System`
4. Make it Public
5. Click "Create repository"

### Step 2: Push Code to GitHub
Copy and run these commands in PowerShell:

```powershell
cd "C:\Users\HP\Desktop\algo"

# Add GitHub remote
git remote add origin https://github.com/Ahmedalj16-netizen/student-patient-app.git

# Rename branch to main
git branch -M main

# Push code
git push -u origin main
```

**After pushing, your repository will be at:**
```
https://github.com/Ahmedalj16-netizen/student-patient-app
```

---

## Deploy on Railway

### Step 1: Sign Up on Railway
1. Go to https://railroad.app/
2. Click "Start Project"
3. Sign in with GitHub
4. Authorize Railway to access your GitHub account

### Step 2: Create New Project
1. Click "New Project"
2. Select "Deploy from GitHub repo"
3. Search for `student-patient-app`
4. Select your repository
5. Click connect

### Step 3: Railway Auto-Deploy
Railway will:
- ✅ Automatically detect Node.js app
- ✅ Install dependencies
- ✅ Build and deploy
- ✅ Provide you with a URL

### Step 4: Get Your Live URL
Once deployed:
1. Click on your project
2. Go to "Settings"
3. Under "Domains", you'll see your live URL like:
```
https://yoursapp-xxxxxx.railway.app
```

---

## Application Links

| Page | URL |
|------|-----|
| Home | `https://yoursapp-xxxxxx.railway.app/` |
| Register | `https://yoursapp-xxxxxx.railway.app/register.html` |
| Login | `https://yoursapp-xxxxxx.railway.app/login.html` |
| Dashboard | `https://yoursapp-xxxxxx.railway.app/dashboard.html` |

---

## Test Credentials

After deployment, register a test account:

**Option 1: Create New Account**
- Email: `test@example.com`
- Password: `password123`
- Role: `Student`

**Option 2: Use Existing**
- Email: `test@example.com`
- Password: `password123`

---

## Troubleshooting

### App not starting?
- Check Railway build logs
- Ensure `server.js` is in root directory
- Verify `package.json` has correct start script

### Database not persisting?
- Railway SQLite stores in `/railway/database.db`
- Data persists across deployments

### Port issues?
- Railway sets `PORT` environment variable automatically
- Our app reads from `process.env.PORT`

---

## Environment Variables on Railway

1. Go to Project Settings
2. Click "Variables"
3. Add these (optional, defaults work):
   - `PORT`: 3000
   - `NODE_ENV`: production

---

**Your application is now online! 🎉**
