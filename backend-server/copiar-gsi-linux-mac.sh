#!/bin/bash

echo ""
echo "============================================"
echo "   COPIANDO ARQUIVO GSI PARA CS2"
echo "============================================"
echo ""

# Caminho do Steam em Linux/Mac
STEAM_PATH="$HOME/.steam/root/steamapps/common/Counter-Strike Global Offensive/game/csgo/cfg"

# Se não encontrar, tenta outro caminho comum
if [ ! -d "$STEAM_PATH" ]; then
    STEAM_PATH="$HOME/.local/share/Steam/steamapps/common/Counter-Strike Global Offensive/game/csgo/cfg"
fi

SOURCE_FILE="$(dirname "$0")/config/gamestate_integration_webradar.cfg"

echo "Verificando arquivo: $SOURCE_FILE"
if [ ! -f "$SOURCE_FILE" ]; then
    echo ""
    echo "ERRO: Arquivo não encontrado em: $SOURCE_FILE"
    echo ""
    exit 1
fi

echo "Verificando caminho do CS2: $STEAM_PATH"
if [ ! -d "$STEAM_PATH" ]; then
    echo ""
    echo "ERRO: Pasta do CS2 não encontrada em: $STEAM_PATH"
    echo "Instale CS2 ou verifique o caminho."
    echo ""
    exit 1
fi

echo ""
echo "Copiando arquivo..."
cp "$SOURCE_FILE" "$STEAM_PATH/gamestate_integration_webradar.cfg"

if [ $? -eq 0 ]; then
    echo ""
    echo "✓ SUCESSO! Arquivo copiado para:"
    echo "   $STEAM_PATH/gamestate_integration_webradar.cfg"
    echo ""
    echo "PRÓXIMO PASSO:"
    echo "1. Feche o CS2 completamente"
    echo "2. Abra o CS2 novamente"
    echo "3. Entre em uma partida"
    echo "4. Você verá seu jogador NO RADAR!"
    echo ""
else
    echo ""
    echo "ERRO: Falha ao copiar arquivo!"
    echo "Pode ser que você precise de permissões sudo"
    echo ""
    exit 1
fi
