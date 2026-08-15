const express = require('express');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const cors = require('cors');
const { PDFDocument } = require('pdf-lib');

const app = express();
const PORT = process.env.PORT || 8080;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

const uploadDir = './uploads';
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

const outputDir = './output';
if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, uploadDir),
  filename: (req, file, cb) => cb(null, Date.now() + '-' + file.originalname)
});

const upload = multer({ storage, limits: { fileSize: 50 * 1024 * 1024 } });

const usageStats = {
  totalRequests: 0,
  totalConversions: 0,
  totalMerges: 0,
  dailyStats: {}
};

function logUsage(endpoint, ip) {
  usageStats.totalRequests++;
  const today = new Date().toISOString().split('T')[0];
  if (!usageStats.dailyStats[today]) {
    usageStats.dailyStats[today] = { requests: 0, conversions: 0, merges: 0 };
  }
  usageStats.dailyStats[today].requests++;
  console.log('[Usage] ' + endpoint + ' - ' + new Date().toISOString());
}

app.post('/api/upload', upload.single('pdf'), (req, res) => {
  logUsage('upload', req.ip);
  if (!req.file) return res.status(400).json({ error: 'No file uploaded' });
  res.json({ success: true, filename: req.file.filename, originalName: req.file.originalname });
});

app.post('/api/convert', upload.single('pdf'), async (req, res) => {
  logUsage('convert', req.ip);
  usageStats.totalConversions++;
  if (!req.file) return res.status(400).json({ error: 'No file uploaded' });
  try {
    const pdfBuffer = fs.readFileSync(req.file.path);
    const outputFolder = path.join(outputDir, req.file.filename.replace('.pdf', ''));
    if (!fs.existsSync(outputFolder)) fs.mkdirSync(outputFolder, { recursive: true });
    const outputPdf = await PDFDocument.create();
    const newPdf = await PDFDocument.load(pdfBuffer);
    const pages = await outputPdf.copyPages(newPdf, newPdf.getPageIndices());
    pages.forEach(page => outputPdf.addPage(page));
    const outputBuffer = await outputPdf.save();
    fs.writeFileSync(path.join(outputFolder, 'converted.pdf'), outputBuffer);
    fs.unlinkSync(req.file.path);
    res.json({ success: true, downloadUrl: '/output/' + req.file.filename.replace('.pdf', '') + '/converted.pdf', pages: newPdf.getPageCount() });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.post('/api/merge', upload.array('pdfs', 20), async (req, res) => {
  logUsage('merge', req.ip);
  usageStats.totalMerges++;
  if (!req.files || req.files.length < 2) return res.status(400).json({ error: 'At least 2 PDFs required' });
  try {
    const outputPdf = await PDFDocument.create();
    for (const file of req.files) {
      const buffer = fs.readFileSync(file.path);
      const pdf = await PDFDocument.load(buffer);
      const pages = await outputPdf.copyPages(pdf, pdf.getPageIndices());
      pages.forEach(page => outputPdf.addPage(page));
      fs.unlinkSync(file.path);
    }
    const mergedName = 'merged-' + Date.now() + '.pdf';
    const outputBuffer = await outputPdf.save();
    fs.writeFileSync(path.join(outputDir, mergedName), outputBuffer);
    res.json({ success: true, downloadUrl: '/output/' + mergedName, pages: outputPdf.getPageCount() });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', requests: usageStats.totalRequests });
});

app.get('/api/stats', (req, res) => {
  res.json({
    totalRequests: usageStats.totalRequests,
    totalConversions: usageStats.totalConversions,
    totalMerges: usageStats.totalMerges,
    dailyStats: usageStats.dailyStats
  });
});

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../public/index.html'));
});

app.listen(PORT, () => {
  console.log('Server running on port ' + PORT);
});
