@echo off
echo 🚀 Starting FileNinja Development Servers...
echo.

echo 📦 Installing dependencies...
call npm run install:all

echo.
echo 🔥 Starting servers...
call npm run dev

pause
