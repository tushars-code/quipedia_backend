import supabase from '../lib/supabaseClient';
import formidable from 'formidable';
import fs from 'fs';

export const config = {
  api: {
    bodyParser: false,
  },
};

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const form = new formidable.IncomingForm();

    form.parse(req, async (err, fields, files) => {
      if (err) return res.status(500).json({ error: 'File parsing error' });

      const file = files.file;
      const data = fs.readFileSync(file.filepath);

      const { data: uploadData, error } = await supabase.storage
        .from('quipedia-media')
        .upload(`certificates/${file.originalFilename}`, data, {
          contentType: file.mimetype,
        });

      if (error) return res.status(500).json({ error: error.message });

      const url = `${process.env.SUPABASE_URL}/storage/v1/object/public/quipedia-media/${uploadData.path}`;
      res.status(200).json({ url });
    });
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
}
