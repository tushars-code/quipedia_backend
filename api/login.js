// In login.js
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY);

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
