# Sistema de Upload e Processamento de Arquivos - Compatível com cPanel

Esta API suporta upload e processamento automático de diferentes tipos de arquivo, sendo totalmente compatível com ambientes de hospedagem como cPanel.

## ✅ Compatibilidade com cPanel

- ✅ **Não requer dependências externas** (FFmpeg, Ghostscript)
- ✅ **Usa apenas bibliotecas Node.js** instaláveis via npm
- ✅ **Funciona em ambientes restritos** de hospedagem
- ✅ **Detecção automática** de tipos de arquivo
- ✅ **Sistema de logs** completo

## Tipos de Arquivo Suportados

### 🖼️ Imagens (Compressão Ativa)
- **Formatos**: JPG, JPEG, PNG, WebP, GIF, BMP
- **Ferramenta**: Sharp (Node.js)
- **Qualidade**: 80% JPEG, Progressive
- **Status**: ✅ **Compressão ativa**

### 🎥 Vídeos (Detecção + Logs)
- **Formatos**: MP4, AVI, MOV, WMV, FLV, WebM, MKV
- **Ferramenta**: Detecção automática
- **Status**: ℹ️ **Detectado e registrado** (sem compressão)

### 🎵 Áudio (Detecção + Logs)
- **Formatos**: MP3, WAV, FLAC, AAC, OGG, WMA
- **Ferramenta**: Detecção automática
- **Status**: ℹ️ **Detectado e registrado** (sem compressão)

### 📄 Documentos (Detecção + Logs)
- **Formatos**: PDF, DOC, DOCX, TXT, RTF
- **Ferramenta**: Detecção automática
- **Status**: ℹ️ **Detectado e registrado** (sem compressão)

## Como Funciona

1. **Upload**: Arquivo enviado via POST
2. **Detecção**: Tipo identificado automaticamente pela extensão
3. **Processamento**: 
   - **Imagens**: Compressão automática com Sharp
   - **Outros**: Registro nos logs sem alteração
4. **Organização**: Arquivos salvos em pastas por tipo
5. **Logs**: Todas as operações registradas

## Estrutura de Pastas

```
uploads/
├── img/          # Imagens (comprimidas)
├── video/        # Vídeos (originais)
├── audio/        # Áudios (originais)
└── doc/          # Documentos (originais)
```

## Rotas da API

### Upload
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

## Logs

Os logs são salvos em:
- `logs/info.log` - Operações bem-sucedidas
- `logs/warn.log` - Avisos
- `logs/error.log` - Erros
- `logs/debug.log` - Informações detalhadas

## Exemplo de Uso

```bash
# Upload de imagem (será comprimida)
curl -X POST http://localhost:3000/upload \
  -F "file=@imagem.jpg"

# Upload de vídeo (será detectado e registrado)
curl -X POST http://localhost:3000/upload \
  -F "file=@video.mp4"

# Upload de áudio (será detectado e registrado)
curl -X POST http://localhost:3000/upload \
  -F "file=@audio.wav"

# Upload de documento (será detectado e registrado)
curl -X POST http://localhost:3000/upload \
  -F "file=@documento.pdf"
```

## Resposta da API

```json
{
  "message": "Upload realizado com sucesso!",
  "file": {
    "name": "uuid-do-arquivo.ext",
    "path": "caminho/para/arquivo",
    "type": "img|video|audio|doc",
    "size": 12345,
    "originalName": "nome-original.ext"
  }
}
```

## Vantagens para cPanel

- ✅ **Sem dependências externas**
- ✅ **Instalação simples** (apenas npm install)
- ✅ **Funciona em ambientes restritos**
- ✅ **Logs detalhados** para monitoramento
- ✅ **Detecção automática** de tipos
- ✅ **Compressão de imagens** ativa
- ✅ **Organização automática** por tipo

## Notas Importantes

- **Imagens**: São automaticamente comprimidas para otimizar espaço
- **Vídeos/Áudios/Documentos**: São detectados e registrados, mas mantidos originais
- **Logs**: Todas as operações são registradas para monitoramento
- **Compatibilidade**: Funciona em qualquer ambiente Node.js, incluindo cPanel
