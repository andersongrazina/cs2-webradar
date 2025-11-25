#!/bin/bash

# Cores para output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

clear
echo "============================================"
echo "  CS2 WEBRADAR - INSTALAÇÃO COMPLETA"
echo "============================================"
echo ""
echo "Este script instalará TODAS as dependências:"
echo "  - Frontend (Next.js)"
echo "  - Backend (Node.js Server)"
echo ""
echo "============================================"
echo ""

# Verificar Node.js
echo -e "${BLUE}[1/4] Verificando Node.js...${NC}"
if ! command -v node &> /dev/null; then
    echo ""
    echo -e "${RED}[ERRO] Node.js não encontrado!${NC}"
    echo ""
    echo "Por favor, instale o Node.js:"
    echo "  Ubuntu/Debian: sudo apt install nodejs npm"
    echo "  CentOS/RHEL: sudo yum install nodejs npm"
    echo "  Ou baixe de: https://nodejs.org"
    echo ""
    echo "Versão recomendada: LTS"
    echo ""
    exit 1
fi

echo -e "${GREEN}[OK] Node.js encontrado!${NC}"
node --version
npm --version
echo ""

# Instalar dependências do Frontend
echo -e "${BLUE}[2/4] Instalando dependências do Frontend (Next.js)...${NC}"
echo ""
npm install
if [ $? -ne 0 ]; then
    echo ""
    echo -e "${RED}[ERRO] Falha ao instalar dependências do frontend!${NC}"
    echo ""
    exit 1
fi
echo ""
echo -e "${GREEN}[OK] Frontend instalado com sucesso!${NC}"
echo ""

# Instalar dependências do Backend
echo -e "${BLUE}[3/4] Instalando dependências do Backend (Servidor)...${NC}"
echo ""
cd backend-server
npm install
if [ $? -ne 0 ]; then
    cd ..
    echo ""
    echo -e "${RED}[ERRO] Falha ao instalar dependências do backend!${NC}"
    echo ""
    exit 1
fi
cd ..
echo ""
echo -e "${GREEN}[OK] Backend instalado com sucesso!${NC}"
echo ""

# Verificação final
echo -e "${BLUE}[4/4] Verificando instalação...${NC}"
echo ""

INSTALL_OK=1

if [ -d "node_modules" ]; then
    echo -e "${GREEN}[OK] Frontend: node_modules encontrado${NC}"
else
    echo -e "${RED}[ERRO] Frontend: node_modules NÃO encontrado${NC}"
    INSTALL_OK=0
fi

if [ -d "backend-server/node_modules" ]; then
    echo -e "${GREEN}[OK] Backend: node_modules encontrado${NC}"
else
    echo -e "${RED}[ERRO] Backend: node_modules NÃO encontrado${NC}"
    INSTALL_OK=0
fi

echo ""

if [ "$INSTALL_OK" -eq 1 ]; then
    echo -e "${GREEN}============================================"
    echo "  INSTALAÇÃO CONCLUÍDA COM SUCESSO!"
    echo "============================================${NC}"
    echo ""
    echo "Próximos passos:"
    echo ""
    echo "PARA DESENVOLVIMENTO (Replit/Cloud/Servidor Linux):"
    echo "  1. Execute: npm run dev"
    echo "  2. Acesse o frontend no navegador"
    echo ""
    echo "PARA BACKEND LOCAL:"
    echo "  1. Entre em: cd backend-server"
    echo "  2. Execute: npm start"
    echo "  3. Configure o CS2 com o arquivo GSI"
    echo ""
    echo "PARA USO EM PENDRIVE (Windows):"
    echo "  1. Copie a pasta 'backend-server' para o pendrive"
    echo "  2. Leia 'backend-server/INSTRUÇÕES-PENDRIVE.md'"
    echo ""
    echo "============================================"
    echo ""
    exit 0
else
    echo -e "${RED}============================================"
    echo "  INSTALAÇÃO FALHOU!"
    echo "============================================${NC}"
    echo ""
    echo "Alguns módulos não foram instalados corretamente."
    echo ""
    echo "Tente novamente ou instale manualmente:"
    echo "  1. Na raiz do projeto: npm install"
    echo "  2. Na pasta backend-server: npm install"
    echo ""
    echo "============================================"
    echo ""
    exit 1
fi
