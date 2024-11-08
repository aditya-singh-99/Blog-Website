import mongoose, { mongo } from "mongoose";
import grid from "gridfs-stream"

let gfs, gridfsBucket
const conn = mongoose.connection
conn.once('open', () => {
    gridfsBucket = new mongoose.mongo.GridFSBucket(conn.db, {
        bucketName: 'fs'
    })
    gfs = grid(conn.db, mongoose.mongo)
    gfs.collection('fs')
})

export const uploadImage = (req, res) => {
    if (!req.file)
        return res.status(404).json("File not found");
    const baseUrl = `${req.protocol}://${req.get('host')}`;
    const imageUrl = `${baseUrl}/file/${req.file.filename}`;
    res.status(200).json(imageUrl);
}

export const getImage = async (req, res) => {
    try {
        const file = await gfs.files.findOne({ filename: req.params.filename })
        const readStream = gridfsBucket.openDownloadStream(file._id)
        readStream.pipe(res)
    } catch (error) {
        return res.status(500).json({ msg: error.message });
    }
}