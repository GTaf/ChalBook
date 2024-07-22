import 'react-native-url-polyfill/auto'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { createClient } from '@supabase/supabase-js'
import { Database } from '../app/database.type'

const supabaseUrl = "https://kpyhmirbldryrtcuzqpw.supabase.co"
const supabaseAnonKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImtweWhtaXJibGRyeXJ0Y3V6cXB3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTIwMDQ1NTEsImV4cCI6MjAyNzU4MDU1MX0.qHkgXsQwfUMr3Vm_R-Xpi-gLCkTRHTZ0lVMBDUvHY9s"

export const supabase = createClient<Database>(supabaseUrl, supabaseAnonKey, {
  auth: {
    storage: AsyncStorage,
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: false,
  },
})