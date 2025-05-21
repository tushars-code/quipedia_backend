import supabase from '../lib/supabaseClient';

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { title, description, speaker_id, tags } = req.body;

    const { error } = await supabase.from('sessions').insert({
      title,
      description,
      speaker_id,
      tags,
    });

    if (error) return res.status(400).json({ error: error.message });

    res.status(200).json({ message: 'Session posted' });
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
}
