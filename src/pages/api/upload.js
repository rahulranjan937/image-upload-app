import connectDB from '@/utils/connectDB';
import PhotoStory from '@/models/PhotoStory';
import multer from 'multer';
import path from 'path';

const upload = multer({
  storage: multer.diskStorage({
    destination: './public/uploads',
    filename: function (req, file, cb) {
      const originalName = encodeURIComponent(path.parse(file.originalname).name).replace(/[^a-zA-Z0-9]/g, '');
      const timestamp = Date.now();
      const extension = path.extname(file.originalname).toLowerCase();
      cb(null, originalName + '_' + timestamp + extension);
    },
  }),
});

connectDB();

export default async function handler(req, res) {
  if (req.method === 'POST') {
    try {
      upload.single('file')(req, res, async function (err) {
        if (err) {
          return res.status(422).send({
            errors: [{ title: 'Image Upload Error', detail: err.message }],
          });
        }

        const file = req.file;
        const { name, description } = req.body;

        if (!file) {
          return res.status(422).send({
            errors: [{ title: 'Image Upload Error', detail: 'No file uploaded' }],
          });
        }

        const newPhotoStory = new PhotoStory({
          name: name,
          description: description,
          imageUrl: file.path,
        });

        await newPhotoStory.save();

        return res.status(201).json({
          name: name,
          description: description,
          imageUrl: file.path,
        });
      });
    } catch (error) {
      res.status(500).json({ error: 'Error uploading file' });
    }
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
}

export const config = {
  api: {
    bodyParser: false,
  },
};
