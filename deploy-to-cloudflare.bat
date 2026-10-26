@echo off
chcp 65001 >nul
echo ========================================================
echo       ক্লাউডফ্লেয়ার পেজেস (Cloudflare Pages) ডিপ্লয়
echo ========================================================
echo.
cd /d "%~dp0"

echo [1/3] ক্লাউডফ্লেয়ার অথেনটিকেশন চেক করা হচ্ছে...
call npx wrangler whoami >nul 2>&1
if %errorlevel% neq 0 (
    echo.
    echo ক্লাউডফ্লেয়ার অ্যাকাউন্টে লগইন করতে ব্রাউজার ওপেন হচ্ছে...
    call npx wrangler login
)

echo.
echo [2/3] নেক্সট.জেএস প্রজেক্ট বিল্ড করা হচ্ছে...
call npm run build

echo.
echo [3/3] ক্লাউডফ্লেয়ার পেজেসে আপলোড করা হচ্ছে...
call npx wrangler pages deploy .next --project-name rihlah-gadget-shop

echo.
echo ডিপ্লয় সম্পন্ন হয়েছে!
pause
