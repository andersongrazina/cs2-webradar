# 📦 Como Usar o CS2 Webradar no Pendrive

## ✅ Pré-Requisitos

⚠️ **ATENÇÃO:** Antes de usar, leia `PREPARAR-PENDRIVE.md` para instruções de instalação das dependências!

Antes de começar, certifique-se de ter:
1. **Pendrive** com pelo menos 100 MB livre
2. **Node.js** instalado no computador (versão 16+)
   - Download: https://nodejs.org
3. **Counter-Strike 2** instalado
4. **Dependências instaladas** - veja `PREPARAR-PENDRIVE.md`

## 📋 Passo a Passo

### 1. Preparar o Pendrive

Copie a pasta `backend-server` completa para o pendrive:
```
Pendrive:\
└── backend-server\
    ├── server.js
    ├── package.json
    ├── INICIAR.bat
    ├── TESTAR.bat
    ├── README.md
    ├── test-data.json
    ├── node_modules\
    └── config\
        └── gamestate_integration_webradar.cfg
```

### 2. Instalar a Configuração GSI no CS2

**Copie o arquivo:**
```
backend-server/config/gamestate_integration_webradar.cfg
```

**Para a pasta do CS2:**
```
C:\Program Files (x86)\Steam\steamapps\common\Counter-Strike Global Offensive\game\csgo\cfg\
```

💡 **Dica:** Se não encontrar a pasta, procure onde o CS2 está instalado no Steam:
1. Abra o Steam
2. Clique com botão direito em "Counter-Strike 2"
3. Propriedades → Arquivos locais → Procurar

### 3. Usar em Qualquer Computador

**A. Conecte o Pendrive**

**B. Verifique se Node.js está instalado:**
- Abra o Prompt de Comando
- Digite: `node --version`
- Se aparecer um número (ex: v18.17.0), está OK!
- Se não, instale de https://nodejs.org

**C. Inicie o Servidor:**
1. Entre na pasta `backend-server` no pendrive
2. Dê duplo clique em `INICIAR.bat`
3. Uma janela preta abrirá mostrando:
```
===========================================
  CS2 WEBRADAR BACKEND - SERVIDOR ATIVO
===========================================
Porta: 3000
Aguardando dados do CS2...
```

**D. Abra o Frontend:**
- Acesse o Replit no navegador
- Ou use qualquer outro frontend configurado

**E. Jogue CS2:**
- Inicie o Counter-Strike 2
- Entre em qualquer partida
- O webradar começará a funcionar automaticamente!

### 4. Testar sem jogar (Opcional)

Se quiser testar o sistema sem abrir o CS2:

1. Com o servidor rodando (INICIAR.bat)
2. Abra outra janela
3. Entre na pasta backend-server
4. Dê duplo clique em `TESTAR.bat`

Isso enviará dados falsos para testar se tudo está funcionando.

## 🎮 Durante o Uso

### ✅ Está Funcionando:
- Servidor mostra: `[GSI] Dados recebidos do CS2 - Mapa: de_dust2`
- Frontend mostra o radar com jogadores se movendo
- Informações de HP, armas, etc. aparecem

### ❌ Não está funcionando:
1. **"Node.js não encontrado"**
   - Instale Node.js e reinicie o computador

2. **"Nenhum dado sendo recebido"**
   - Certifique-se de que copiou o arquivo .cfg para a pasta correta do CS2
   - Reinicie o CS2
   - Entre em uma partida (não funciona no menu)

3. **"Porta 3000 já em uso"**
   - Feche outros programas
   - Ou edite `server.js` e mude a porta

## 💾 Vantagens do Pendrive

- ✅ Funciona em qualquer PC com Node.js
- ✅ Não precisa instalar nada além do Node.js
- ✅ Portátil - leve para lan house, casa de amigos, etc.
- ✅ Configuração única - funciona em todos os PCs
- ✅ Ocupa pouco espaço (~5-10 MB)

## 🔄 Atualizações

Para atualizar:
1. Baixe a nova versão do backend
2. Substitua a pasta `backend-server` no pendrive
3. Mantenha sua configuração GSI do CS2

## ⚙️ Configuração Avançada

### Mudar a Porta

Edite `server.js`, linha 6:
```javascript
const PORT = 3000; // Mude para outra porta se necessário
```

**Importante:** Se mudar a porta, atualize também:
- Arquivo GSI: `config/gamestate_integration_webradar.cfg`
- Variáveis de ambiente do frontend

### Usar em Rede Local

Para acessar de outro dispositivo na mesma rede:

1. Descubra seu IP local:
   - Windows: `ipconfig` (procure IPv4)
   - Exemplo: `192.168.1.100`

2. No outro dispositivo, acesse:
   - `http://192.168.1.100:3000`

3. Atualize as variáveis do frontend para usar seu IP

## 🆘 Suporte

Se tiver problemas:

1. **Leia o README.md** na pasta backend-server
2. **Teste com TESTAR.bat** para isolar o problema
3. **Verifique os logs** na janela do servidor
4. **Confirme que:**
   - Node.js está instalado
   - Arquivo GSI está na pasta correta do CS2
   - CS2 foi reiniciado após copiar o arquivo
   - Você está em uma partida (não no menu)

## 📝 Checklist Rápido

Antes de usar em um PC novo:

- [ ] Node.js instalado?
- [ ] Arquivo GSI no CS2?
- [ ] CS2 reiniciado?
- [ ] Servidor iniciado (INICIAR.bat)?
- [ ] Frontend aberto no navegador?
- [ ] Em uma partida do CS2?

Se tudo estiver marcado e não funcionar, execute `TESTAR.bat` para diagnosticar.

---

**Bom jogo! 🎯**
