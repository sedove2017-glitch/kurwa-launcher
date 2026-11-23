@echo off
chcp 65001>nul
cd /d "%~dp0"
powershell -NoProfile -ExecutionPolicy Bypass -File "%~dp0pack-site.ps1"
echo.
echo Upload the zip to Cloudflare Pages (Upload assets) or GitHub Pages.
pause
