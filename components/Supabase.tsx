import 'react-native-url-polyfill/auto'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { createClient } from '@supabase/supabase-js'
import { Database } from '../app/database.type'

const supabaseUrl = "https://uyiiwdpimdxyyrlwhzic.supabase.co"
const supabaseAnonKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InV5aWl3ZHBpbWR4eXlybHdoemljIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDQ5OTc1NDcsImV4cCI6MjA2MDU3MzU0N30.j9trifLalMBx9bZ9TBifx32hKGuoS5IVQOfeCUPcGI4"

export const supabase = createClient<Database>(supabaseUrl, supabaseAnonKey, {
  auth: {
    storage: AsyncStorage,
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: false,
  },
})