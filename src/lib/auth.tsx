'use client'

import { createContext, useContext, useEffect, useState, ReactNode } from 'react'
import { supabase } from './supabase'
import { Profile } from '@/types/database'

interface User {
  id: string
  email: string
}

interface AuthContextType {
  user: User | null
  profile: Profile | null
  loading: boolean
  signIn: (email: string, password: string) => Promise<{ error: string | null }>
  signOut: () => Promise<void>
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  profile: null,
  loading: true,
  signIn: async () => ({ error: null }),
  signOut: async () => {},
})

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [profile, setProfile] = useState<Profile | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Check active session
    const checkSession = async () => {
      try {
        const { data: { session } } = await supabase.auth.getSession()
        if (session?.user) {
          setUser({ id: session.user.id, email: session.user.email || '' })
          await fetchProfile(session.user.id)
        }
      } catch (error) {
        console.error('Session check error:', error)
      } finally {
        setLoading(false)
      }
    }

    checkSession()

    // Listen to auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        if (session?.user) {
          setUser({ id: session.user.id, email: session.user.email || '' })
          await fetchProfile(session.user.id)
        } else {
          setUser(null)
          setProfile(null)
        }
        setLoading(false)
      }
    )

    return () => subscription.unsubscribe()
  }, [])

  const fetchProfile = async (userId: string) => {
    try {
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('user_id', userId)
        .single()

      if (!error && data) {
        setProfile(data as Profile)
      } else {
        // Create default profile if not exists
        setProfile({
          id: userId,
          user_id: userId,
          nama: 'Mohamad Hilmi',
          jawatan: 'Guru Penolong Kanan Pendidikan Khas',
          sekolah: 'SK Senai',
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString(),
        })
      }
    } catch (error) {
      console.error('Profile fetch error:', error)
      // Use default profile for demo
      setProfile({
        id: userId,
        user_id: userId,
        nama: 'Mohamad Hilmi',
        jawatan: 'Guru Penolong Kanan Pendidikan Khas',
        sekolah: 'SK Senai',
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      })
    }
  }

  const signIn = async (email: string, password: string) => {
    try {
      const { error } = await supabase.auth.signInWithPassword({ email, password })
      if (error) return { error: error.message }
      return { error: null }
    } catch (err: any) {
      return { error: err.message || 'Ralat login' }
    }
  }

  const signOut = async () => {
    await supabase.auth.signOut()
    setUser(null)
    setProfile(null)
  }

  return (
    <AuthContext.Provider value={{ user, profile, loading, signIn, signOut }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => useContext(AuthContext)
