@echo off
title CS2 Webradar - Instalacao Completa
color 0E
cls
echo ============================================
echo   CS2 WEBRADAR - INSTALACAO COMPLETA
echo ============================================
echo.
echo Este script instalara TODAS as dependencias:
echo   - Frontend (Next.js)
echo   - Backend (Node.js Server)
echo.
echo ============================================
echo.

REM Verificar Node.js
echo [1/4] Verificando Node.js...
node --version >nul 2>&1
if %errorlevel% neq 0 (
    echo.
    color 0C
    echo [ERRO] Node.js nao encontrado!
    echo.
    echo Por favor, instale o Node.js de https://nodejs.org
    echo Versao recomendada: LTS
    echo.
    echo Apos instalar, reinicie o computador e execute este script novamente.
    echo.
    pause
    exit /b 1
)

echo [OK] Node.js encontrado!
node --version
echo.

REM Instalar dependencias do Frontend
echo [2/4] Instalando dependencias do Frontend (Next.js)...
echo.
npm install
if %errorlevel% neq 0 (
    color 0C
    echo.
    echo [ERRO] Falha ao instalar dependencias do frontend!
    echo.
    pause
    exit /b 1
)
echo.
echo [OK] Frontend instalado com sucesso!
echo.

REM Instalar dependencias do Backend
echo [3/4] Instalando dependencias do Backend (Servidor)...
echo.
cd backend-server
npm install
if %errorlevel% neq 0 (
    cd ..
    color 0C
    echo.
    echo [ERRO] Falha ao instalar dependencias do backend!
    echo.
    pause
    exit /b 1
)
cd ..
echo.
echo [OK] Backend instalado com sucesso!
echo.

REM Verificacao final
echo [4/4] Verificando instalacao...
echo.

set INSTALL_OK=1

if exist "node_modules\" (
    echo [OK] Frontend: node_modules encontrado
) else (
    echo [ERRO] Frontend: node_modules NAO encontrado
    set INSTALL_OK=0
)

if exist "backend-server\node_modules\" (
    echo [OK] Backend: node_modules encontrado
) else (
    echo [ERRO] Backend: node_modules NAO encontrado
    set INSTALL_OK=0
)

echo.

if "%INSTALL_OK%"=="1" (
    color 0A
    echo ============================================
    echo   INSTALACAO CONCLUIDA COM SUCESSO!
    echo ============================================
    echo.
    echo Proximos passos:
    echo.
    echo PARA DESENVOLVIMENTO (Replit/Cloud):
    echo   1. Execute: npm run dev
    echo   2. Acesse o frontend no navegador
    echo.
    echo PARA USO EM PENDRIVE:
    echo   1. Copie a pasta 'backend-server' para o pendrive
    echo   2. Leia 'backend-server\INSTRUCOES-PENDRIVE.md'
    echo   3. Configure o CS2 com o arquivo GSI
    echo.
    echo ============================================
    echo.
    pause
    exit /b 0
) else (
    color 0C
    echo ============================================
    echo   INSTALACAO FALHOU!
    echo ============================================
    echo.
    echo Alguns modulos nao foram instalados corretamente.
    echo.
    echo Tente novamente ou instale manualmente:
    echo   1. Na raiz do projeto: npm install
    echo   2. Na pasta backend-server: npm install
    echo.
    echo ============================================
    echo.
    pause
    exit /b 1
)
