@echo off
setlocal
echo === Rent Local: starting local dev server ===
where npm >nul 2>nul || (echo npm not found. Install Node.js LTS from https://nodejs.org & pause & exit /b 1)
call npm install || (echo npm install failed. & pause & exit /b 1)
call npm run dev
pause
