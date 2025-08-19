const sharp = require("sharp");
const path = require("path");
const fs = require("fs");
const logger = require("./logger");

// Compressão de imagens (funciona no cPanel)
async function compressImage(filePath) {
  const ext = path.extname(filePath);
  const isImage = [".jpg", ".jpeg", ".png", ".webp", ".gif", ".bmp"].includes(ext.toLowerCase());

  if (!isImage) return filePath;

  const compressedPath = filePath.replace(ext, `_compressed${ext}`);

  try {
    await sharp(filePath)
      .jpeg({ quality: 80, progressive: true })
      .toFile(compressedPath);

    fs.unlinkSync(filePath); // apaga original
    logger.info(`Imagem comprimida: ${path.basename(filePath)}`);
    return compressedPath;
  } catch (error) {
    logger.warn(`Erro na compressão de imagem: ${error.message}`);
    return filePath;
  }
}

// Compressão de vídeos usando biblioteca Node.js (alternativa ao FFmpeg)
async function compressVideo(filePath) {
  const ext = path.extname(filePath);
  const videoExtensions = [".mp4", ".avi", ".mov", ".wmv", ".flv", ".webm", ".mkv"];
  
  if (!videoExtensions.includes(ext.toLowerCase())) return filePath;

  // Para cPanel, vamos usar uma abordagem diferente
  // Vamos apenas otimizar o nome e registrar que é um vídeo
  logger.info(`Vídeo detectado: ${path.basename(filePath)} - Compressão não disponível no cPanel`);
  
  // Retorna o arquivo original (sem compressão)
  return filePath;
}

// Compressão de áudio usando biblioteca Node.js (alternativa ao FFmpeg)
async function compressAudio(filePath) {
  const ext = path.extname(filePath);
  const audioExtensions = [".mp3", ".wav", ".flac", ".aac", ".ogg", ".wma"];
  
  if (!audioExtensions.includes(ext.toLowerCase())) return filePath;

  // Para cPanel, vamos usar uma abordagem diferente
  // Vamos apenas otimizar o nome e registrar que é um áudio
  logger.info(`Áudio detectado: ${path.basename(filePath)} - Compressão não disponível no cPanel`);
  
  // Retorna o arquivo original (sem compressão)
  return filePath;
}

// Compressão de documentos usando biblioteca Node.js (alternativa ao Ghostscript)
async function compressDocument(filePath) {
  const ext = path.extname(filePath);
  const documentExtensions = [".pdf", ".doc", ".docx", ".txt", ".rtf"];
  
  if (!documentExtensions.includes(ext.toLowerCase())) return filePath;

  // Para cPanel, vamos usar uma abordagem diferente
  // Vamos apenas otimizar o nome e registrar que é um documento
  logger.info(`Documento detectado: ${path.basename(filePath)} - Compressão não disponível no cPanel`);
  
  // Retorna o arquivo original (sem compressão)
  return filePath;
}

// Função principal de compressão que detecta o tipo e aplica a compressão adequada
async function compressFile(filePath) {
  const ext = path.extname(filePath).toLowerCase();
  
  logger.info(`Iniciando processamento: ${path.basename(filePath)}`);
  
  try {
    // Detectar tipo de arquivo e aplicar compressão adequada
    if ([".jpg", ".jpeg", ".png", ".webp", ".gif", ".bmp"].includes(ext)) {
      return await compressImage(filePath);
    } else if ([".mp4", ".avi", ".mov", ".wmv", ".flv", ".webm", ".mkv"].includes(ext)) {
      return await compressVideo(filePath);
    } else if ([".mp3", ".wav", ".flac", ".aac", ".ogg", ".wma"].includes(ext)) {
      return await compressAudio(filePath);
    } else if ([".pdf", ".doc", ".docx", ".txt", ".rtf"].includes(ext)) {
      return await compressDocument(filePath);
    } else {
      logger.info(`Tipo de arquivo processado: ${ext}`);
      return filePath;
    }
  } catch (error) {
    logger.error(`Erro no processamento do arquivo: ${error.message}`);
    return filePath;
  }
}

module.exports = { 
  compressImage, 
  compressVideo, 
  compressAudio, 
  compressDocument, 
  compressFile 
};
