@echo off
setlocal enabledelayedexpansion

echo.
echo ============================================
echo   COPIANDO ARQUIVO GSI PARA CS2
echo ============================================
echo.

REM Caminho do Steam no Windows
set "CS2_PATH=C:\Program Files (x86)\Steam\steamapps\common\Counter-Strike Global Offensive\game\csgo\cfg"

REM Arquivo de origem (mesma pasta deste script)
set "SOURCE_FILE=%~dp0config\gamestate_integration_webradar.cfg"

echo Verificando se o arquivo existe: %SOURCE_FILE%
if not exist "%SOURCE_FILE%" (
    echo.
    echo ERRO: Arquivo nao encontrado em: %SOURCE_FILE%
    echo.
    pause
    exit /b 1
)

echo Verificando caminho do CS2: %CS2_PATH%
if not exist "%CS2_PATH%" (
    echo.
    echo ERRO: Pasta do CS2 nao encontrada em: %CS2_PATH%
    echo Instale CS2 ou verifique o caminho.
    echo.
    pause
    exit /b 1
)

echo.
echo Copiando arquivo...
copy /Y "%SOURCE_FILE%" "%CS2_PATH%\gamestate_integration_webradar.cfg"

if %errorlevel% equ 0 (
    echo.
    echo SUCESSO! Arquivo copiado para:
    echo   %CS2_PATH%\gamestate_integration_webradar.cfg
    echo.
    echo PROXIMO PASSO:
    echo 1. Feche o CS2 completamente (Alt+F4)
    echo 2. Abra o CS2 novamente
    echo 3. Entre em uma partida
    echo 4. Voce vera seu jogador NO RADAR!
    echo.
    pause
) else (
    echo.
    echo ERRO: Falha ao copiar arquivo!
    echo.
    pause
    exit /b 1
)
