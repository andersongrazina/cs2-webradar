# ⚠️ SOLUÇÃO PARA POSIÇÃO VAZIA

Se o CS2 está enviando `position: undefined` mesmo com o arquivo GSI atualizado, tente:

## Opção 1: Reset Completo no Windows
```
1. Feche CS2 (Alt+F4)
2. Delete: C:\Program Files (x86)\Steam\steamapps\common\Counter-Strike Global Offensive\game\csgo\cfg\gamestate_integration_webradar.cfg
3. Execute: backend-server\COPIAR-GSI-WINDOWS.bat
4. Abra CS2 novamente
```

## Opção 2: Verificar Arquivo GSI
O arquivo deve estar em:
- **Windows**: `C:\Program Files (x86)\Steam\steamapps\common\Counter-Strike Global Offensive\game\csgo\cfg\gamestate_integration_webradar.cfg`
- **Linux**: `~/.steam/root/steamapps/common/Counter-Strike Global Offensive/game/csgo/cfg/gamestate_integration_webradar.cfg`

Deve conter:
```
"player_position" "1"
"player_forward" "1"
```

## Opção 3: Ver Debug Completo
No console do backend, vai aparecer TODOS os campos que o CS2 está enviando. Se `position` não aparecer, o arquivo GSI não tem essa configuração.

## Opção 4: Configuração Manual
Se o arquivo automaticamente não funcionar, copie manualmente:
- FROM: `backend-server/config/gamestate_integration_webradar.cfg`
- TO: Pasta de configuração do CS2 (veja Opção 2)
