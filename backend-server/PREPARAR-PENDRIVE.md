# ⚙️ Como Preparar o Backend para o Pendrive

## ⚠️ IMPORTANTE - Leia Antes de Copiar!

Antes de copiar a pasta `backend-server` para o pendrive, você **DEVE** garantir que as dependências do Node.js estão instaladas.

💡 **Depois de preparar:** Veja `INSTRUÇÕES-PENDRIVE.md` para instruções completas de uso.

## 📋 Passo a Passo

### 💡 Método 1: Instalação Automática (Mais Fácil!)

Na **pasta raiz do projeto** (não na pasta backend-server), execute:

**Windows:**
```bash
INSTALAR-TUDO.bat
```

**Linux/Mac:**
```bash
./instalar-tudo.sh
```

Esse script vai:
- Verificar se Node.js está instalado
- Instalar dependências do frontend
- Instalar dependências do backend
- Verificar se tudo foi instalado corretamente

**Pronto!** Pule para o passo 3.

### 🔧 Método 2: Instalação Manual

### 1. Verificar Node.js

Abra o terminal/prompt de comando e execute:
```bash
node --version
```

Se aparecer um número (ex: `v18.17.0`), você tem Node.js instalado. ✅

Se não:
1. Baixe de https://nodejs.org (versão LTS)
2. Instale normalmente
3. Reinicie o computador
4. Teste novamente com `node --version`

### 2. Instalar Dependências

**No terminal, dentro da pasta `backend-server`**, execute:

```bash
npm install
```

Isso vai criar a pasta `node_modules` com todas as dependências necessárias.

**⚠️ Sem este passo, o servidor NÃO funcionará no pendrive!**

### 3. Verificar Instalação

Após `npm install`, você deve ver uma pasta `node_modules` dentro de `backend-server`:

```
backend-server/
├── node_modules/     ← Esta pasta DEVE existir!
├── server.js
├── package.json
├── INICIAR.bat
└── ...
```

Se a pasta `node_modules` existe com ~90 subpastas dentro, você está pronto! ✅

### 4. Copiar para o Pendrive

Agora sim, copie **toda** a pasta `backend-server` (incluindo `node_modules`) para o pendrive:

```
Pendrive:\
└── backend-server\        ← Copie esta pasta inteira
    ├── node_modules\      ← Com as dependências!
    ├── server.js
    ├── package.json
    └── ...
```

### 5. Testar no Pendrive

No pendrive, entre na pasta `backend-server` e execute `INICIAR.bat`.

Você deve ver:
```
===========================================
  CS2 WEBRADAR BACKEND - SERVIDOR ATIVO
===========================================
```

Se der erro de "módulo não encontrado", volte ao passo 2!

## 🎯 Checklist Rápido

Antes de copiar para o pendrive:

- [ ] Node.js instalado no computador?
- [ ] `npm install` executado na pasta backend-server?
- [ ] Pasta `node_modules` existe e tem ~90 subpastas?
- [ ] Testou `INICIAR.bat` localmente primeiro?

Se todos marcados, pode copiar para o pendrive com segurança!

## ❓ FAQ

### "Por que preciso instalar antes?"
As dependências do Node.js (Express, Socket.IO, CORS) não vêm com o projeto. Você precisa baixá-las uma vez com `npm install`, e depois elas ficam na pasta `node_modules` e vão com você para qualquer PC.

### "Preciso instalar em cada PC novo?"
**NÃO!** Você instala UMA VEZ no computador de desenvolvimento. Depois disso, a pasta `node_modules` vai junto no pendrive e funciona em qualquer PC que tenha Node.js instalado.

### "E se eu esquecer de instalar?"
O script `INICIAR.bat` vai falhar com erro tipo:
```
Error: Cannot find module 'express'
```

Nesse caso, volte ao passo 2 e rode `npm install`.

### "Quanto espaço ocupa?"
- Sem `node_modules`: ~50 KB
- Com `node_modules`: ~5-10 MB

## 💡 Dica Pro

Crie um arquivo ZIP do backend já com as dependências instaladas:

1. Execute `npm install` na pasta backend-server
2. Compacte toda a pasta em um ZIP
3. Distribua o ZIP para amigos
4. Eles só precisam descompactar e usar!

Isso economiza tempo e garante que todos tenham a versão correta.

## 🆘 Problemas?

Se tiver erros ao executar `npm install`:

1. **Certifique-se de estar DENTRO da pasta backend-server**
2. **Verifique sua conexão com a internet** (npm baixa pacotes online)
3. **Tente deletar `node_modules` e `package-lock.json`** e rode `npm install` novamente
4. **Atualize o npm:** `npm install -g npm@latest`

---

✅ **Depois de seguir este guia, seu backend estará pronto para rodar em qualquer PC!**
