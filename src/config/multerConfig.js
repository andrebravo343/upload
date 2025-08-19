const multer = require("multer");
const path = require("path");
const { v4: uuidv4 } = require("uuid");
const fs = require('fs');
const logger = require("../utils/logger");

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

// Definir armazenamento
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const fileType = getFileType(file.originalname);
    const uploadPath = path.join(__dirname, `../../uploads/${fileType}`);
    
    logger.debug(`Processando upload: ${file.originalname} -> ${fileType}`);
    
    // Criar diretório se não existir
    if (!fs.existsSync(uploadPath)) {
      fs.mkdirSync(uploadPath, { recursive: true });
      logger.info(`Diretório criado: ${uploadPath}`);
    }
    
    cb(null, uploadPath);
  },
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname);
    const filename = `${uuidv4()}${ext}`;
    logger.debug(`Nome do arquivo gerado: ${filename}`);
    cb(null, filename);
  }
});

const upload = multer({ storage });
module.exports = upload;
