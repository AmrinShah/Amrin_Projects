const fs = require('fs');
const path = require('path');

// 📁 File path
const filePath = path.join(__dirname, 'sample.txt');
const renamedPath = path.join(__dirname, 'renamed.txt');

// 🔧 Toggle operations
const CREATE_FILE = true;
const APPEND_FILE = true;
const READ_FILE = true;
const RENAME_FILE = true;
const DELETE_FILE = true;

// ✅ Create or overwrite a file
if (CREATE_FILE) {
    fs.writeFile(filePath, 'This is the initial content.\n', (err) => {
        if (err) throw err;
        console.log('✅ File created or overwritten.');
    });
}

// ➕ Append content to the file
if (APPEND_FILE) {
    fs.appendFile(filePath, 'Appended content.\n', (err) => {
        if (err) throw err;
        console.log('✅ Content appended.');
    });
}

// 📖 Read and display file content
if (READ_FILE) {
    fs.readFile(filePath, 'utf8', (err, data) => {
        if (err) throw err;
        console.log('📄 File Content:\n' + data);
    });
}

// ✏️ Rename the file
if (RENAME_FILE) {
    fs.rename(filePath, renamedPath, (err) => {
        if (err) throw err;
        console.log('📁 File renamed.');
    });
}

// 🗑️ Delete the renamed file
if (DELETE_FILE) {
    fs.unlink(renamedPath, (err) => {
        if (err) throw err;
        console.log('🗑️ File deleted.');
    });
}
