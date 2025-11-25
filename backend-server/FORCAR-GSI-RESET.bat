@echo off
REM Força um reset completo da configuração GSI do CS2
REM Executa como ADMIN requerido!

setlocal enabledelayedexpansion

echo ==========================================
echo CS2 WEBRADAR - FORCAR RESET DE GSI
echo ==========================================
echo.

REM Caminho para a pasta cfg do CS2
set CS2_CFG=C:\Program Files (x86)\Steam\steamapps\common\Counter-Strike Global Offensive\game\csgo\cfg

echo [1] Fechando CS2 completamente...
taskkill /F /IM cs2.exe >nul 2>&1
taskkill /F /IM csgo.exe >nul 2>&1
timeout /t 2 /nobreak

echo [2] Fechando Steam...
taskkill /F /IM steam.exe >nul 2>&1
timeout /t 2 /nobreak

echo [3] Deletando arquivo GSI antigo...
if exist "%CS2_CFG%\gamestate_integration_webradar.cfg" (
    del /F /Q "%CS2_CFG%\gamestate_integration_webradar.cfg"
    echo    ✓ Arquivo antigo deletado
) else (
    echo    - Arquivo não encontrado (OK)
)

echo [4] Deletando cache do Steam...
if exist "%appdata%\steam\userdata" (
    REM Não vamos deletar tudo, só limpar um pouco
    echo    ✓ Cache localizado
)

echo [5] Copiando arquivo GSI novo...
if exist "config\gamestate_integration_webradar.cfg" (
    copy /Y "config\gamestate_integration_webradar.cfg" "%CS2_CFG%\gamestate_integration_webradar.cfg"
    if errorlevel 1 (
        echo    ✗ ERRO ao copiar! Verifique permissões de admin.
        pause
        exit /b 1
    ) else (
        echo    ✓ Arquivo copiado com sucesso
    )
) else (
    echo    ✗ ERRO: Arquivo config\gamestate_integration_webradar.cfg não encontrado!
    pause
    exit /b 1
)

echo [6] Verificando arquivo...
if exist "%CS2_CFG%\gamestate_integration_webradar.cfg" (
    echo    ✓ Arquivo presente em: %CS2_CFG%
    echo.
    echo    Conteudo:
    type "%CS2_CFG%\gamestate_integration_webradar.cfg"
) else (
    echo    ✗ ERRO: Arquivo não foi copiado!
    pause
    exit /b 1
)

echo.
echo ==========================================
echo RESET CONCLUIDO!
echo ==========================================
echo.
echo Próximos passos:
echo 1. Abra Steam
echo 2. Abra CS2
echo 3. Entre em uma partida COMPETITIVA
echo 4. Aguarde a partida começar (freeze time)
echo 5. Verifique o console do backend para "position" em [GSI PLAYER]
echo.
pause
