@echo off
title CS2 Webradar - Teste do Backend
color 0B
echo ============================================
echo   CS2 WEBRADAR - TESTE DO BACKEND
echo ============================================
echo.
echo Este script testa o servidor backend enviando
echo dados simulados do CS2.
echo.
echo Certifique-se de que o servidor esta rodando
echo antes de executar este teste!
echo.
pause
echo.
echo Enviando dados de teste...
curl -X POST http://localhost:3000/webradar -H "Content-Type: application/json" -d @test-data.json
echo.
echo.
echo Testando endpoint de saude...
curl http://localhost:3000/health
echo.
echo.
echo ============================================
echo Teste concluido!
echo ============================================
pause
