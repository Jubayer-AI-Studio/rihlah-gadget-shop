@echo off
chcp 65001 >nul
echo ========================================================
echo       ক্লাউডফ্লেয়ার পেজেস (Cloudflare Pages) লাইভ ডিপ্লয়
echo ========================================================
echo.
cd /d "%~dp0"

echo [1/2] প্রজেক্ট বিল্ড করা হচ্ছে...
call npx next build

echo.
echo [2/2] ক্লাউডফ্লেয়ারে আপলোড করা হচ্ছে...
call npx wrangler pages deploy out --project-name rihlah-gadget-shop --branch main --commit-dirty=true

echo.
echo ========================================================
echo   সফলভাবে ক্লাউডফ্লেয়ারে ডিপ্লয় সম্পন্ন হয়েছে!
echo   লাইভ লিংক: https://rihlah-gadget-shop.pages.dev
echo ========================================================
pause
