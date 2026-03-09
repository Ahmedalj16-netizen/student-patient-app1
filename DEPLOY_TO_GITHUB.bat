@echo off
REM Script to push to GitHub and deploy on Railway

echo.
echo ========================================
echo  Deploying to GitHub
echo ========================================
echo.

REM Change to project directory
cd /d C:\Users\HP\Desktop\algo

REM Add GitHub remote
echo Adding GitHub remote...
git remote add origin https://github.com/Ahmedalj16-netizen/student-patient-app.git

REM Rename branch to main
echo Renaming branch to main...
git branch -M main

REM Push to GitHub
echo Pushing code to GitHub...
git push -u origin main

echo.
echo ========================================
echo  ✅ Successfully pushed to GitHub!
echo ========================================
echo.
echo Next steps:
echo 1. Go to https://railway.app/
echo 2. Login with GitHub
echo 3. Create New Project
echo 4. Select "Deploy from GitHub repo"
echo 5. Choose "student-patient-app" repository
echo 6. Railway will auto-deploy
echo.
echo Your app will be live at: https://yoursapp-xxxxxx.railway.app/
echo.
pause
