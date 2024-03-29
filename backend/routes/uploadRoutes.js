import path from 'path';
import express from 'express';
import multer from 'multer';
import { v4 as uuidv4 } from 'uuid';

const router = express.Router();

const storage = multer.diskStorage({
    destination(req, file, cb) {
        cb(null, 'uploads/')
    },
    filename(req, file, cb) {
        cb(null, `${ file.fieldname }-${ uuidv4() }${ path.extname(file.originalname) }`)
    }
});

function checkFileType(file, cb) {
    const fileTypes = /jpg|jpeg|png/;
    const extname   = fileTypes.test(path.extname(file.originalname).toLowerCase());
    const mimetype  = fileTypes.test(file.mimetype);

    if(extname && mimetype) {
        return cb(null, true);
    } else {
        cb('Images only!');
    }
};

const upload = multer({
    storage,
    fileFilter: function(req, file, cb) {
        checkFileType(file, cb)
    }
});


router.post('/', upload.single('image'), (req, res) => {
    res.send(`/${ req.file.path }`);
});


export default router;