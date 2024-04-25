const multer = require('multer');
const fse = require('fs-extra');
const { uuid } = require('uuidv4');

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        let path = './src/public/uploads';
        if (!fse.existsSync(path)) {
            fse.mkdirSync(path, { recursive: true });
        }
        cb(null, path);
    },
    filename: (req, file, cb) => {
        let ext = file.originalname.substring(file.originalname.lastIndexOf('.'));
        cb(null, 'GamRush-' + Date.now() + '-' + uuid().substring(0, 5) + ext);
    },
});
const upload = multer({
    storage: storage,
    limits: { fiedlSize: 5 * 1024 * 1024 },
});

module.exports = { upload };
