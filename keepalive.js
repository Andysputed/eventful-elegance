import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load environment variables from .env file
dotenv.config({ path: path.resolve(__dirname, '.env') });

const supabaseUrl = process.env.VITE_SUPABASE_URL;
const supabaseKey = process.env.VITE_SUPABASE_KEY;

if (!supabaseUrl || !supabaseKey) {
  console.error('Supabase URL or Key is missing from .env');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

async function keepAlive() {
  try {
    console.log(`[${new Date().toISOString()}] Sending heartbeat to Supabase...`);
    
    // We do a simple query to keep the database active
    // Querying one row from a small/common table is sufficient
    const { data, error } = await supabase
      .from('menu_items')
      .select('id')
      .limit(1);

    if (error) {
      console.error('Error querying Supabase:', error.message);
    } else {
      console.log('Heartbeat successful. Database is alive.');
    }
  } catch (err) {
    console.error('Unexpected error:', err);
  }
}

keepAlive();
