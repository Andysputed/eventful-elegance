import { createClient } from '@supabase/supabase-js';

export default async function handler(req, res) {
  // Secure the endpoint so only Vercel Cron can call it
  // You can set CRON_SECRET in your Vercel Environment Variables
  const authHeader = req.headers.authorization;
  if (process.env.CRON_SECRET && authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  const supabaseUrl = process.env.VITE_SUPABASE_URL;
  const supabaseKey = process.env.VITE_SUPABASE_KEY;

  if (!supabaseUrl || !supabaseKey) {
    return res.status(500).json({ error: 'Supabase credentials missing' });
  }

  const supabase = createClient(supabaseUrl, supabaseKey);

  try {
    const { data, error } = await supabase
      .from('menu_items')
      .select('id')
      .limit(1);

    if (error) {
      console.error('Error querying Supabase:', error.message);
      return res.status(500).json({ error: 'Failed to query Supabase', details: error.message });
    }

    return res.status(200).json({ 
      message: 'Heartbeat successful. Database is alive.', 
      time: new Date().toISOString() 
    });
  } catch (err) {
    console.error('Unexpected error:', err);
    return res.status(500).json({ error: 'Unexpected error occurred', details: err.message });
  }
}
