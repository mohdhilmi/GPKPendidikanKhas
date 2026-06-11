import { createClient } from '@supabase/supabase-js'
import { Database } from '@/types/database'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://placeholder.supabase.co'
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'placeholder-key'

export const supabase = createClient<Database>(supabaseUrl, supabaseAnonKey)

// Helper to get public URL for storage files
export const getStorageUrl = (bucket: string, path: string) => {
  const { data } = supabase.storage.from(bucket).getPublicUrl(path)
  return data.publicUrl
}

// Upload file helper
export const uploadFile = async (
  bucket: string,
  path: string,
  file: File
) => {
  const { data, error } = await supabase.storage
    .from(bucket)
    .upload(path, file, {
      cacheControl: '3600',
      upsert: false,
    })

  if (error) throw error
  return data
}

// Delete file helper
export const deleteFile = async (bucket: string, paths: string[]) => {
  const { data, error } = await supabase.storage.from(bucket).remove(paths)
  if (error) throw error
  return data
}
