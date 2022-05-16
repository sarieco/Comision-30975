
const express = require('express');
const multer = require('multer');

const router = express.Router();

const storage = multer.diskStorage({
    destination: (req, file, cb) => { cb(null, 'public/uploads') },
    filename: (req, file, cb) => {
        const extension = file.mimetype.split('/')[1];
        cb(null, `${file.fieldname}-${Date.now()}.${extension}`);
    },
});

const upload = multer({ storage });

router.post('/single', upload.single('single-file'), (req, res) => {
    const file = req.file;
    if (!file) {
        const error = new Error('You must upload a file!');
        error.httpStatusCode = 400;
        return next(error);
    }
    res.json({ success: true, result: file });
});

router.post('/multiple', upload.array('multiple-files', 5), (req, res) => {
    const files = req.files;
    if (!files) {
        const error = new Error('You must upload a file!');
        error.httpStatusCode = 400;
        return next(error);
    }
    res.json({ success: true, result: files });
});

module.exports = router;