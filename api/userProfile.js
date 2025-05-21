import supabase from '../lib/supabaseClient';

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { id, name, role, bio } = req.body;

    const { error } = await supabase.from('profiles').upsert({
      id,
      name,
      role, // student, speaker, institute, org
      bio,
    });

    if (error) return res.status(400).json({ error: error.message });

    res.status(200).json({ message: 'Profile updated' });
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
}