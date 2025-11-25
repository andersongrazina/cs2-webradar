#!/bin/bash

# Cores para output
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

clear
echo "============================================"
echo "  CS2 WEBRADAR - SERVIDOR BACKEND"
echo "============================================"
echo ""
echo "Verificando Node.js..."

if ! command -v node &> /dev/null; then
    echo -e "${RED}[ERRO] Node.js não encontrado!${NC}"
    echo ""
    echo "Por favor, instale o Node.js:"
    echo "  Ubuntu/Debian: sudo apt install nodejs npm"
    echo "  CentOS/RHEL: sudo yum install nodejs npm"
    echo "  Ou baixe de: https://nodejs.org"
    echo ""
    exit 1
fi

echo -e "${GREEN}Node.js encontrado!${NC}"
node --version
echo ""

# Verificar se node_modules existe
if [ ! -d "node_modules" ]; then
    echo -e "${BLUE}[INFO] Dependências não encontradas. Instalando...${NC}"
    echo ""
    npm install
    if [ $? -ne 0 ]; then
        echo ""
        echo -e "${RED}[ERRO] Falha ao instalar dependências!${NC}"
        echo ""
        echo "Tente executar manualmente:"
        echo "  npm install"
        echo ""
        exit 1
    fi
    echo ""
    echo -e "${GREEN}[OK] Dependências instaladas com sucesso!${NC}"
    echo ""
fi

echo -e "${YELLOW}Iniciando servidor...${NC}"
echo ""
node server.js
