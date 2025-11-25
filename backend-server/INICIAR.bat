@echo off
title CS2 Webradar - Backend Server
color 0A
echo ============================================
echo   CS2 WEBRADAR - SERVIDOR BACKEND
echo ============================================
echo.
echo Verificando Node.js...
node --version >nul 2>&1
if %errorlevel% neq 0 (
    echo [ERRO] Node.js nao encontrado!
    echo.
    echo Por favor, instale o Node.js de https://nodejs.org
    echo Versao recomendada: LTS
    pause
    exit
)

echo Node.js encontrado!
echo.
echo Iniciando servidor...
echo.
node server.js
pause
