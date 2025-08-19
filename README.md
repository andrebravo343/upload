# API de Upload de Arquivos

API Node.js para upload e processamento automático de arquivos, com detecção automática de tipos e compressão de imagens.

## 🚀 Funcionalidades

- ✅ **Upload de múltiplos tipos de arquivo**
- ✅ **Detecção automática de tipo** por extensão
- ✅ **Compressão automática de imagens**
- ✅ **Organização automática** em pastas por tipo
- ✅ **Sistema de logs** completo
- ✅ **Compatível com cPanel** e ambientes de hospedagem
- ✅ **Sem dependências externas** (FFmpeg, Ghostscript)

## 📁 Tipos de Arquivo Suportados

### 🖼️ Imagens (Compressão Ativa)
- **Formatos**: JPG, JPEG, PNG, WebP, GIF, BMP
- **Processamento**: Compressão automática com Sharp
- **Qualidade**: 80% JPEG, Progressive

### 🎥 Vídeos (Detecção + Logs)
- **Formatos**: MP4, AVI, MOV, WMV, FLV, WebM, MKV
- **Processamento**: Detectado e registrado nos logs

### 🎵 Áudio (Detecção + Logs)
- **Formatos**: MP3, WAV, FLAC, AAC, OGG, WMA
- **Processamento**: Detectado e registrado nos logs

### 📄 Documentos (Detecção + Logs)
- **Formatos**: PDF, DOC, DOCX, TXT, RTF
- **Processamento**: Detectado e registrado nos logs

## 🛠️ Instalação

### Pré-requisitos
- Node.js 14+
- npm ou yarn

### Passos
```bash
# Clone o repositório
git clone <url-do-repositorio>
cd upload

# Instale as dependências
npm install

# Configure as variáveis de ambiente
cp .env.example .env
# Edite o arquivo .env conforme necessário

# Inicie o servidor
npm run dev
```

## 📡 Rotas da API

### Upload de Arquivo
```bash
POST /upload
Content-Type: multipart/form-data
Body: file=@arquivo.ext
```

### Acesso aos Arquivos
```bash
GET /files/{tipo}/{nome-do-arquivo}
```

### Listar Arquivos
```bash
GET /files
```

### Health Check
```bash
GET /health
```

## 📁 Estrutura do Projeto

```
├── src/
│   ├── server.js          # Servidor principal
│   ├── routes/            # Rotas da API
│   ├── controllers/       # Controladores
│   ├── utils/             # Utilitários (logs, compressão)
│   └── config/            # Configurações (Multer)
├── uploads/               # Arquivos enviados
│   ├── img/              # Imagens (comprimidas)
│   ├── video/            # Vídeos
│   ├── audio/            # Áudios
│   └── doc/              # Documentos
├── logs/                 # Logs da aplicação
├── package.json
├── .env
└── README.md
```

## 🔧 Configuração

### Variáveis de Ambiente (.env)
```env
PORT=3000
NODE_ENV=development
```

### Scripts Disponíveis
```bash
npm run dev      # Desenvolvimento com nodemon
npm start        # Produção
npm test         # Testes (se implementados)
```

## 📊 Logs

A aplicação gera logs detalhados em:
- `logs/info.log` - Operações bem-sucedidas
- `logs/error.log` - Erros
- `logs/warn.log` - Avisos
- `logs/debug.log` - Informações detalhadas

## 🌐 Exemplo de Uso

### Upload de Imagem
```bash
curl -X POST http://localhost:3000/upload \
  -F "file=@imagem.jpg"
```

**Resposta:**
```json
{
  "message": "Upload realizado com sucesso!",
  "file": {
    "name": "uuid-do-arquivo.jpg",
    "path": "caminho/para/arquivo",
    "type": "img",
    "size": 12345,
    "originalName": "imagem.jpg"
  }
}
```

### Acessar Arquivo
```bash
curl http://localhost:3000/files/img/nome-do-arquivo.jpg
```

## 🔒 Segurança

- Validação de tipos de arquivo
- Limites de tamanho configuráveis
- Logs de todas as operações
- Tratamento seguro de erros

## 🚀 Deploy

### cPanel
Consulte o guia de configuração para cPanel em `CPANEL_SETUP.md`

### Outros Ambientes
A API é compatível com qualquer ambiente Node.js:
- Vercel
- Heroku
- DigitalOcean
- AWS
- Google Cloud

## 🤝 Contribuição

1. Fork o projeto
2. Crie uma branch para sua feature (`git checkout -b feature/AmazingFeature`)
3. Commit suas mudanças (`git commit -m 'Add some AmazingFeature'`)
4. Push para a branch (`git push origin feature/AmazingFeature`)
5. Abra um Pull Request

## 📝 Licença

Este projeto está sob a licença MIT. Veja o arquivo `LICENSE` para mais detalhes.

## 📞 Suporte

Se encontrar problemas:
1. Verifique os logs em `logs/error.log`
2. Teste o health check: `GET /health`
3. Verifique as permissões das pastas
4. Abra uma issue no repositório

## 🔄 Changelog

### v1.0.0
- ✅ Upload de arquivos
- ✅ Detecção automática de tipos
- ✅ Compressão de imagens
- ✅ Sistema de logs
- ✅ Compatibilidade com cPanel
