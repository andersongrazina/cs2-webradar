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

REM Verificar se node_modules existe
if not exist "node_modules\" (
    echo [INFO] Dependencias nao encontradas. Instalando...
    echo.
    npm install
    if %errorlevel% neq 0 (
        color 0C
        echo.
        echo [ERRO] Falha ao instalar dependencias!
        echo.
        echo Tente executar manualmente:
        echo   npm install
        echo.
        pause
        exit /b 1
    )
    echo.
    echo [OK] Dependencias instaladas com sucesso!
    echo.
)

echo Iniciando servidor...
echo.
color 0E
node server.js
pause
