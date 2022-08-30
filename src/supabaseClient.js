
import {createClient} from "@supabase/supabase-js"

const supabase = createClient("https://itbnozqiheazburehgvv.supabase.co",process.env.REACT_APP_KEY)

export default supabase;