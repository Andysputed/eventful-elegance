import { createClient } from '@supabase/supabase-js';

// ✅ CRITICAL: Force dynamic rendering to bypass Vercel caching
export const dynamic = 'force-dynamic';

export default async function handler(req, res) {
  // 🔒 Secure the endpoint so only Vercel Cron can call it
  // Set CRON_SECRET in your Vercel Environment Variables for security
  const cronSecret = process.env.CRON_SECRET;
  if (cronSecret) {
    const authHeader = req.headers.authorization;
    if (authHeader !== `Bearer ${cronSecret}`) {
      console.warn(`[KEEPALIVE] Unauthorized access attempt at ${new Date().toISOString()}`);
      return res.status(401).json({ error: 'Unauthorized' });
    }
  }

  // ⚠️ DEBUG: Verify request is coming from Vercel
  const isVercelCron = req.headers['x-vercel-cron-secret'] || process.env.VERCEL_ENV === 'production';
  console.log(`[KEEPALIVE] Request received at ${new Date().toISOString()}, Vercel: ${isVercelCron}`);

  // Get Supabase credentials
  const supabaseUrl = process.env.VITE_SUPABASE_URL;
  // ✅ Use service role key instead of anon key to bypass RLS
  const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.VITE_SUPABASE_KEY;

  if (!supabaseUrl || !supabaseKey) {
    console.error('[KEEPALIVE] Error: Supabase credentials missing');
    return res.status(500).json({ 
      error: 'Supabase credentials missing',
      timestamp: new Date().toISOString() 
    });
  }

  try {
    // Create Supabase client with service role key
    const supabase = createClient(supabaseUrl, supabaseKey);

    // ✅ Execute a simple query to wake the database
    // Using RLS-bypassing query via service role
    const { data, error } = await supabase
      .from('menu_items')
      .select('id', { count: 'exact', head: true })
      .limit(1);

    if (error) {
      console.error(`[KEEPALIVE] Supabase query error: ${error.message}`, error);
      return res.status(500).json({ 
        error: 'Failed to query Supabase',
        message: error.message,
        timestamp: new Date().toISOString(),
        code: error.code
      });
    }

    // ✅ Log success for Vercel dashboard
    console.log(`[KEEPALIVE] ✓ Database pinged successfully at ${new Date().toISOString()}`);
    
    // ✅ Set explicit cache-control headers to prevent Vercel caching
    res.setHeader('Cache-Control', 'no-store, no-cache, must-revalidate, proxy-revalidate, max-age=0');
    res.setHeader('Pragma', 'no-cache');
    res.setHeader('Expires', '0');

    return res.status(200).json({ 
      success: true,
      message: 'Heartbeat successful. Database is alive.', 
      timestamp: new Date().toISOString(),
      rowCount: data?.length || 0
    });
  } catch (err) {
    console.error(`[KEEPALIVE] Unexpected error: ${err.message}`, err);
    return res.status(500).json({ 
      error: 'Unexpected error occurred',
      message: err.message,
      timestamp: new Date().toISOString()
    });
  }
}
