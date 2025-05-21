// api/login.js
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

// api/login.js
export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { email } = req.body;
    // login logic
    res.status(200).json({ message: 'Login initiated' });
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
}
