import supabase from '../lib/supabaseClient';

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { email } = req.body;
    const { error } = await supabase.auth.signInWithOtp({ email });
    if (error) {
      return res.status(400).json({ error: error.message });
    }
    res.status(200).json({ message: 'Magic link sent to email' });
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
}