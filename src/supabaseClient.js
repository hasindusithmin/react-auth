
import {createClient} from "@supabase/supabase-js"

const supabase = createClient("https://itbnozqiheazburehgvv.supabase.co",process.env.KEY)

export default supabase;