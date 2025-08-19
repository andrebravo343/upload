const { compressFile } = require("../utils/fileUtils");
const logger = require("../utils/logger");
const path = require("path");

// Função para detectar o tipo de arquivo baseado na extensão
function getFileType(filename) {
  const ext = path.extname(filename).toLowerCase();
  
  const imageExtensions = ['.jpg', '.jpeg', '.png', '.gif', '.bmp', '.webp', '.svg'];
  const audioExtensions = ['.mp3', '.wav', '.flac', '.aac', '.ogg', '.wma'];
  const videoExtensions = ['.mp4', '.avi', '.mov', '.wmv', '.flv', '.webm', '.mkv'];
  const documentExtensions = ['.pdf', '.doc', '.docx', '.txt', '.rtf', '.odt', '.xls', '.xlsx', '.ppt', '.pptx'];
  
  if (imageExtensions.includes(ext)) return 'img';
  if (audioExtensions.includes(ext)) return 'audio';
  if (videoExtensions.includes(ext)) return 'video';
  if (documentExtensions.includes(ext)) return 'doc';
  
  return 'doc'; // padrão para arquivos não reconhecidos
}

async function uploadFile(req, res) {
  try {
    if (!req.file) {
      logger.warn('Tentativa de upload sem arquivo');
      return res.status(400).json({ message: "Nenhum ficheiro enviado." });
    }

    const fileType = getFileType(req.file.originalname);
    let filePath = req.file.path;

    logger.info('Iniciando processamento de upload', {
      originalName: req.file.originalname,
      filename: req.file.filename,
      type: fileType,
      size: req.file.size
    });

    // Compressão automática baseada no tipo de arquivo
    try {
      filePath = await compressFile(filePath);
      logger.info('Arquivo processado com compressão', { 
        originalPath: req.file.path, 
        finalPath: filePath 
      });
    } catch (compressError) {
      logger.warn('Erro na compressão do arquivo, mantendo original', { error: compressError.message });
    }

    const fileInfo = {
      filename: req.file.filename,
      originalName: req.file.originalname,
      type: fileType,
      size: req.file.size,
      path: filePath
    };

    logger.upload(fileInfo);

    return res.status(200).json({
      message: "Upload realizado com sucesso!",
      file: {
        name: req.file.filename,
        path: filePath,
        type: fileType,
        size: req.file.size,
        originalName: req.file.originalname
      }
    });
  } catch (error) {
    logger.uploadError(error, req.file);
    return res.status(500).json({ message: "Erro no upload.", error: error.message });
  }
}

module.exports = { uploadFile };
