const multer = require('multer');
const path = require('path');

// Set storage engine for images
const storage = multer.diskStorage({
    destination: function (req: any, file: any, cb: any) {
        cb(null, './uploads/'); // Store images in the 'uploads' folder
    },
    filename: function (req: any, file: any, cb: any) {
        cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname)); // Use field name and timestamp
    }
});

// Check file type
function checkFileType(file: any, cb: any) {
    const filetypes = /jpeg|jpg|png|gif/;
    const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
    const mimetype = filetypes.test(file.mimetype);

    if (mimetype && extname) {
        return cb(null, true);
    } else {
        cb('Error: Images Only!');
    }
}

// Initialize upload
const upload = multer({
    storage: storage,
    limits: { fileSize: 5 * 1024 * 1024 }, // Set limit to 5MB (5 * 1024 * 1024 bytes)
    fileFilter: function (req: any, file: any, cb: any) {
        checkFileType(file, cb);
    }
});

module.exports = upload;
