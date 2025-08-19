require("dotenv").config();

const express = require("express");
const app = express();
const uploadRoutes = require("./routes/uploadRoutes");
const path = require("path");
const bodyParser = require("body-parser");
const logger = require("./utils/logger");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Middleware de logs para todas as requisições
app.use((req, res, next) => {
  logger.info(`${req.method} ${req.path}`, {
    ip: req.ip,
    userAgent: req.get('User-Agent'),
    timestamp: new Date().toISOString()
  });
  next();
});

// Rota para servir ficheiros
app.use("/files", express.static(path.join(__dirname, "../uploads")));

// Middleware para log de acesso a arquivos
app.use("/files", (req, res, next) => {
  if (req.path) {
    logger.fileAccess(req.path, req.ip, req.get('User-Agent'));
  }
  next();
});

// Rotas
app.use("/upload", uploadRoutes);

// Rota de health check
app.get("/health", (req, res) => {
  logger.info('Health check realizado');
  res.json({ 
    status: "OK", 
    timestamp: new Date().toISOString(),
    uptime: process.uptime()
  });
});

// Rota para listar arquivos (opcional)
app.get("/files", (req, res) => {
  const fs = require('fs');
  const uploadsPath = path.join(__dirname, "../uploads");
  
  try {
    const types = ['img', 'audio', 'video', 'doc'];
    const files = {};
    
    types.forEach(type => {
      const typePath = path.join(uploadsPath, type);
      if (fs.existsSync(typePath)) {
        files[type] = fs.readdirSync(typePath);
      } else {
        files[type] = [];
      }
    });
    
    res.json(files);
  } catch (error) {
    logger.error('Erro ao listar arquivos', { error: error.message });
    res.status(500).json({ error: "Erro ao listar arquivos" });
  }
});

// Porta
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  logger.info(`Servidor iniciado na porta ${PORT}`);
  console.log(`Servidor a correr na porta http://localhost:${PORT}/`);
});
