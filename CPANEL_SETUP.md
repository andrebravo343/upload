# Configuração para cPanel

Este guia explica como configurar a API de upload no cPanel.

## 📋 Pré-requisitos

- Conta cPanel com suporte a Node.js
- Acesso SSH (opcional, mas recomendado)
- Node.js 14+ habilitado no cPanel

## 🚀 Instalação no cPanel

### 1. Upload dos Arquivos

1. Acesse o **File Manager** no cPanel
2. Navegue até a pasta onde quer instalar a API (ex: `public_html/api/`)
3. Faça upload de todos os arquivos do projeto

### 2. Instalação das Dependências

#### Via SSH (Recomendado):
```bash
# Conecte via SSH
ssh usuario@seudominio.com

# Navegue até a pasta do projeto
cd public_html/api/

# Instale as dependências
npm install
```

#### Via Terminal do cPanel:
1. Acesse **Terminal** no cPanel
2. Navegue até a pasta do projeto
3. Execute: `npm install`

### 3. Configuração do .env

Crie um arquivo `.env` na raiz do projeto:

```env
PORT=3000
NODE_ENV=production
```

### 4. Configuração do Node.js App

1. Acesse **Setup Node.js App** no cPanel
2. Clique em **Create Application**
3. Configure:
   - **Node.js version**: 16.x ou superior
   - **Application mode**: Production
   - **Application root**: `/home/usuario/public_html/api`
   - **Application URL**: `seudominio.com/api`
   - **Application startup file**: `src/server.js`
   - **Passenger port**: 3000

### 5. Configuração do .htaccess (Opcional)

Se precisar de redirecionamento, crie um `.htaccess` na pasta `public_html/api/`:

```apache
RewriteEngine On
RewriteRule ^$ http://localhost:3000/ [P,L]
RewriteRule ^(.*)$ http://localhost:3000/$1 [P,L]
```

## 🔧 Configurações Específicas

### Limites de Upload

No cPanel, configure os limites de upload:

1. **PHP Settings** > **Upload Max Filesize**: 100M
2. **PHP Settings** > **Post Max Size**: 100M
3. **PHP Settings** > **Max Execution Time**: 300

### Permissões de Pastas

Configure as permissões:
```bash
chmod 755 uploads/
chmod 755 logs/
chmod 644 .env
```

## 📁 Estrutura no cPanel

```
public_html/
└── api/
    ├── src/
    │   ├── server.js
    │   ├── routes/
    │   ├── controllers/
    │   ├── utils/
    │   └── config/
    ├── uploads/
    │   ├── img/
    │   ├── video/
    │   ├── audio/
    │   └── doc/
    ├── logs/
    ├── package.json
    ├── .env
    └── .htaccess
```

## 🌐 URLs da API

Após a configuração, suas URLs serão:

- **Upload**: `https://seudominio.com/api/upload`
- **Arquivos**: `https://seudominio.com/api/files/{tipo}/{arquivo}`
- **Listar**: `https://seudominio.com/api/files`
- **Health**: `https://seudominio.com/api/health`

## 🔍 Teste da Instalação

### 1. Health Check
```bash
curl https://seudominio.com/api/health
```

### 2. Upload de Teste
```bash
curl -X POST https://seudominio.com/api/upload \
  -F "file=@teste.jpg"
```

### 3. Verificar Logs
Acesse a pasta `logs/` no File Manager para verificar os logs.

## ⚠️ Problemas Comuns

### Erro de Permissão
```bash
# Corrigir permissões
chmod 755 uploads/
chmod 755 logs/
```

### Porta em Uso
- Verifique se a porta 3000 está livre
- Configure uma porta diferente no .env

### Dependências Não Instaladas
```bash
# Reinstalar dependências
rm -rf node_modules package-lock.json
npm install
```

### Logs de Erro
Verifique os logs em:
- `logs/error.log`
- Logs do Node.js App no cPanel

## 📊 Monitoramento

### Logs Disponíveis
- `logs/info.log` - Operações normais
- `logs/error.log` - Erros
- `logs/warn.log` - Avisos
- `logs/debug.log` - Debug

### Métricas Importantes
- Uploads por tipo de arquivo
- Tamanho dos arquivos
- Erros de upload
- Acessos aos arquivos

## 🔒 Segurança

### Recomendações
1. **HTTPS**: Sempre use HTTPS em produção
2. **Limites**: Configure limites de tamanho de arquivo
3. **Validação**: Valide tipos de arquivo no frontend
4. **Backup**: Faça backup regular dos uploads
5. **Monitoramento**: Monitore os logs regularmente

### Configurações de Segurança
```javascript
// No server.js, adicione:
app.use(helmet()); // Se instalar helmet
app.use(rateLimit()); // Se instalar express-rate-limit
```

## 📞 Suporte

Se encontrar problemas:
1. Verifique os logs em `logs/error.log`
2. Teste o health check
3. Verifique as permissões das pastas
4. Confirme se o Node.js App está rodando no cPanel
