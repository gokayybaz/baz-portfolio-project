import React, { createContext, useContext, useState, useEffect } from 'react';
import { supabase } from '../lib/supabaseClient';

const AuthContext = createContext();

export function AuthProvider({ children }) {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    // Check for stored session on initial load
    useEffect(() => {
        const checkAuth = async () => {
            try {
                // Check if we have session in localStorage
                const { data: { session } } = await supabase.auth.getSession();

                if (session) {
                    // Fetch user profile data from profiles table
                    const { data: profileData, error } = await supabase
                        .from('profiles')
                        .select('*')
                        .eq('id', session.user.id)
                        .maybeSingle();

                    if (error && error.code !== 'PGRST116') {
                        // Handle error, but ignore "No rows returned" error
                        throw error;
                    }

                    setUser({ ...session.user, profile: profileData || {} });
                    setIsAuthenticated(true);
                }
            } catch (error) {
                console.error('Error checking authentication:', error);
                await logout();
            } finally {
                setLoading(false);
            }
        };

        checkAuth();
    }, []);

    // Login function using profiles table
    const login = async (email, password) => {
        try {
            setLoading(true);

            // Check if user exists in profiles table
            const { data: profileData, error: profileError } = await supabase
                .from('profiles')
                .select('*')
                .eq('email', email)
                .eq('password', password) // Note: In a real app, you should never store plain passwords
                .maybeSingle();

            if (profileError && profileError.code !== 'PGRST116') {
                throw profileError;
            }

            if (!profileData) {
                return {
                    success: false,
                    error: { message: 'Geçersiz e-posta veya şifre' }
                };
            }

            // Sign in to create a supabase session (assuming you have auth set up)
            // If you don't have auth enabled, you can skip this and manage sessions manually
            const { data, error } = await supabase.auth.signInWithPassword({
                email,
                password
            });

            if (error) throw error;

            setUser({ ...(data?.user || {}), profile: profileData });
            setIsAuthenticated(true);

            return { success: true };

        } catch (error) {
            console.error('Login error:', error);
            return {
                success: false,
                error: { message: error.message || 'Giriş sırasında bir hata oluştu' }
            };
        } finally {
            setLoading(false);
        }
    };

    // Register a new user
    const register = async (email, password) => {
        try {
            setLoading(true);

            // Check if email already exists
            const { data: existingUser, error: checkError } = await supabase
                .from('profiles')
                .select('id')
                .eq('email', email)
                .maybeSingle();

            if (checkError && checkError.code !== 'PGRST116') {
                throw checkError;
            }

            if (existingUser) {
                return {
                    success: false,
                    error: { message: 'Bu e-posta adresi zaten kullanılıyor' }
                };
            }

            // Create auth user if you're using Supabase Auth
            const { data, error } = await supabase.auth.signUp({
                email,
                password
            });

            if (error) throw error;

            // Create profile entry
            const { error: insertError } = await supabase
                .from('profiles')
                .insert({
                    id: data.user.id,
                    email,
                    password, // Note: In a real app, you should never store plain passwords
                    created_date: new Date().toISOString()
                });

            if (insertError) throw insertError;

            // Automatically log in after registration
            return login(email, password);

        } catch (error) {
            console.error('Registration error:', error);
            return {
                success: false,
                error: { message: error.message || 'Kayıt sırasında bir hata oluştu' }
            };
        } finally {
            setLoading(false);
        }
    };

    const logout = async () => {
        try {
            // Sign out from Supabase if using Auth
            await supabase.auth.signOut();

            // Reset state
            setUser(null);
            setIsAuthenticated(false);

            return { success: true };
        } catch (error) {
            console.error('Logout error:', error);
            return {
                success: false,
                error: { message: error.message || 'Çıkış sırasında bir hata oluştu' }
            };
        }
    };

    const value = {
        isAuthenticated,
        user,
        loading,
        login,
        logout,
        register
    };

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export const useAuth = () => useContext(AuthContext);
