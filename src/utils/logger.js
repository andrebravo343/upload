const fs = require('fs');
const path = require('path');

class Logger {
  constructor() {
    this.logDir = path.join(__dirname, '../../logs');
    this.ensureLogDirectory();
  }

  ensureLogDirectory() {
    if (!fs.existsSync(this.logDir)) {
      fs.mkdirSync(this.logDir, { recursive: true });
    }
  }

  getTimestamp() {
    return new Date().toISOString();
  }

  formatMessage(level, message, data = null) {
    const timestamp = this.getTimestamp();
    let logMessage = `[${timestamp}] [${level.toUpperCase()}] ${message}`;
    
    if (data) {
      logMessage += ` | Data: ${JSON.stringify(data)}`;
    }
    
    return logMessage;
  }

  writeToFile(level, message, data = null) {
    const formattedMessage = this.formatMessage(level, message, data);
    const logFile = path.join(this.logDir, `${level}.log`);
    
    fs.appendFileSync(logFile, formattedMessage + '\n');
  }

  info(message, data = null) {
    const formattedMessage = this.formatMessage('INFO', message, data);
    console.log(formattedMessage);
    this.writeToFile('info', message, data);
  }

  error(message, data = null) {
    const formattedMessage = this.formatMessage('ERROR', message, data);
    console.error(formattedMessage);
    this.writeToFile('error', message, data);
  }

  warn(message, data = null) {
    const formattedMessage = this.formatMessage('WARN', message, data);
    console.warn(formattedMessage);
    this.writeToFile('warn', message, data);
  }

  debug(message, data = null) {
    const formattedMessage = this.formatMessage('DEBUG', message, data);
    console.log(formattedMessage);
    this.writeToFile('debug', message, data);
  }

  // Log específico para uploads
  upload(fileInfo) {
    this.info('Upload realizado com sucesso', {
      filename: fileInfo.filename,
      originalName: fileInfo.originalname,
      type: fileInfo.type,
      size: fileInfo.size,
      path: fileInfo.path
    });
  }

  // Log específico para acessos a arquivos
  fileAccess(filename, ip, userAgent) {
    this.info('Arquivo acessado', {
      filename,
      ip,
      userAgent: userAgent ? userAgent.substring(0, 100) : 'N/A'
    });
  }

  // Log específico para erros de upload
  uploadError(error, fileInfo = null) {
    this.error('Erro no upload', {
      error: error.message,
      stack: error.stack,
      fileInfo
    });
  }
}

module.exports = new Logger();
