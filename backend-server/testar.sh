#!/bin/bash

# Cores para output
RED='\033[0;31m'
GREEN='\033[0;32m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

clear
echo "============================================"
echo "  CS2 WEBRADAR - TESTE DO BACKEND"
echo "============================================"
echo ""
echo "Este script testa o servidor backend enviando"
echo "dados simulados do CS2."
echo ""
echo "Certifique-se de que o servidor está rodando"
echo "antes de executar este teste!"
echo ""
read -p "Pressione Enter para continuar..."
echo ""

node test-backend.js
