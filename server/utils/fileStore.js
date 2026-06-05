const fs = require('fs');
const path = require('path');

const defaultDataPath = path.join(__dirname, '../data/expenses.json');
const dataPath = process.env.DATA_FILE_PATH
  ? path.resolve(process.env.DATA_FILE_PATH)
  : defaultDataPath;

function readData(filePath = dataPath) {
  try {
    const resolvedPath = path.resolve(filePath);
    const raw = fs.readFileSync(resolvedPath, 'utf8');
    return JSON.parse(raw || '[]');
  } catch (error) {
    if (error.code === 'ENOENT') {
      const targetPath = path.resolve(filePath);
      fs.mkdirSync(path.dirname(targetPath), { recursive: true });
      fs.writeFileSync(targetPath, '[]', 'utf8');
      return [];
    }
    throw error;
  }
}

function writeData(data, filePath = dataPath) {
  const resolvedPath = path.resolve(filePath);
  fs.mkdirSync(path.dirname(resolvedPath), { recursive: true });
  fs.writeFileSync(resolvedPath, JSON.stringify(data, null, 2), 'utf8');
}

module.exports = {
  readData,
  writeData,
};
