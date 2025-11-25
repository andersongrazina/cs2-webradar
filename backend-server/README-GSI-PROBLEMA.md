# ⚠️ PROBLEMA: CS2 Não Envia Posição (Position)

## Status Atual
O backend está recebendo dados do CS2, MAS o campo `position` **não está chegando** no objeto `player`.

## Campos Recebidos ✓
- `name`, `team`, `health`, `armor`, `weapons`, `match_stats`
- `state`, `activity`, `observer_slot`

## Campo Faltando ✗
- `position` (coordenadas X, Y, Z do jogador)
- `forward` (direção que o jogador está olhando)

## Por que isso é um problema?
Sem a posição, o radar não consegue mostrar a localização dos jogadores - mostra tudo em (0,0,0).

## Soluções Testadas (não funcionaram)
1. ✗ Arquivo GSI com `"player_position" "1"`
2. ✗ Variações: `player_position_index_1`, `player_position_index_2`, `player_position_index_3`
3. ✗ Simples reset do arquivo

## Próximas Ações (Ordem de Prioridade)

### 1️⃣ FORÇAR RESET COMPLETO (Recomendado)
```
backend-server/FORCAR-GSI-RESET.bat
```
**Execute como ADMIN!** Isso vai:
- Fechar CS2 e Steam completamente
- Deletar o arquivo GSI antigo do CS2
- Copiar o arquivo novo
- Reiniciar tudo

**Depois:**
1. Abra Steam
2. Abra CS2
3. Entre em partida COMPETITIVA (importante: não deathmatch)
4. Aguarde freezetime
5. Verifique os logs do backend

### 2️⃣ Verificar Manualmente
Se a opção acima não funcionar:

**Windows:**
```
C:\Program Files (x86)\Steam\steamapps\common\Counter-Strike Global Offensive\game\csgo\cfg\gamestate_integration_webradar.cfg
```

Verifique se contém:
```
"player_position" "1"
"player_forward" "1"
```

### 3️⃣ Verificar Versão do CS2
Na tela inicial do CS2, verifique a versão. Se for muito antiga (anterior a 2023), talvez use outro sistema de GSI.

### 4️⃣ Testar com Dados Mock
Se nada funcionar, você pode usar o backend para testar com dados fictícios:
```
node backend-server/test-data.js
```

## Informações Técnicas

### Estrutura Esperada do Position
```json
{
  "position": {
    "x": 1234.5,
    "y": 5678.9,
    "z": 64.0
  }
}
```

Ou como string:
```
"position": "1234.5, 5678.9, 64.0"
```

### Arquivo GSI Completo
Veja: `backend-server/config/gamestate_integration_webradar.cfg`

## Debug

### Para ver o EXATO que o CS2 está enviando:
1. Inicie o backend: `npm start` ou `INICIAR.bat`
2. Entre em CS2
3. Procure por `[GSI COMPLETO]` e `[GSI PLAYER]` no console
4. Copie o conteúdo completo e compartilhe

## Possibilidades Futuras

### Workaround: Inferência de Posição
Se o CS2 2024 realmente não suporta GSI para posição, podemos:
- Usar interpolação baseada em health/ammo changes
- Usar dados de câmera (view_angles) para estimar posição
- Implementar modo "spy cam" onde apenas o observador vê todos

### Mudança de Versão do CS2
Se for um problema de versão, talvez precisemos:
- Usar CS:GO antigo (versão pré-2024)
- Ou aguardar update do Valve para GSI

---

**Status**: Investigando
**Prioridade**: Alta
**Última atualização**: 2025-11-25
