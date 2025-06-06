
import { useState, useEffect } from 'react';
import { useAuth } from './useAuth';
import { supabase } from '@/integrations/supabase/client';
import type { Database } from '@/integrations/supabase/types';

type UserProfile = Database['public']['Tables']['user_profiles']['Row'];
type FocusSession = Database['public']['Tables']['focus_sessions']['Row'];
type UserCoins = Database['public']['Tables']['user_coins']['Row'];

export const useUserData = () => {
  const { user } = useAuth();
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [userCoins, setUserCoins] = useState<UserCoins | null>(null);
  const [sessions, setSessions] = useState<FocusSession[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user) {
      console.log('Fetching user data for:', user.email);
      fetchUserData();
    } else {
      console.log('No user, clearing data');
      setUserProfile(null);
      setUserCoins(null);
      setSessions([]);
      setLoading(false);
    }
  }, [user]);

  const fetchUserData = async () => {
    if (!user) return;
    
    setLoading(true);
    try {
      console.log('Fetching profile for user:', user.id);
      
      // Fetch user profile
      const { data: profile, error: profileError } = await supabase
        .from('user_profiles')
        .select('*')
        .eq('id', user.id)
        .single();

      if (profileError) {
        console.error('Profile fetch error:', profileError);
      } else {
        console.log('Profile fetched:', profile);
      }

      // Fetch user coins
      const { data: coins, error: coinsError } = await supabase
        .from('user_coins')
        .select('*')
        .eq('user_id', user.id)
        .single();

      if (coinsError) {
        console.error('Coins fetch error:', coinsError);
      } else {
        console.log('Coins fetched:', coins);
      }

      // Fetch focus sessions
      const { data: userSessions, error: sessionsError } = await supabase
        .from('focus_sessions')
        .select('*')
        .eq('user_id', user.id)
        .order('completed_at', { ascending: false });

      if (sessionsError) {
        console.error('Sessions fetch error:', sessionsError);
      } else {
        console.log('Sessions fetched:', userSessions?.length || 0);
      }

      setUserProfile(profile);
      setUserCoins(coins);
      setSessions(userSessions || []);
    } catch (error) {
      console.error('Error fetching user data:', error);
    } finally {
      setLoading(false);
    }
  };

  const updateUserProfile = async (profileData: Partial<UserProfile>) => {
    if (!user) return;

    console.log('Updating profile for user:', user.id, profileData);

    const { error } = await supabase
      .from('user_profiles')
      .upsert({
        id: user.id,
        ...profileData,
        updated_at: new Date().toISOString(),
      });

    if (error) {
      console.error('Profile update error:', error);
    } else {
      console.log('Profile updated successfully');
      await fetchUserData();
    }
  };

  const addFocusSession = async (sessionData: Omit<FocusSession, 'id' | 'user_id' | 'completed_at'>) => {
    if (!user) return;

    console.log('Adding focus session for user:', user.id, sessionData);

    // Add session
    const { error: sessionError } = await supabase
      .from('focus_sessions')
      .insert({
        user_id: user.id,
        ...sessionData,
      });

    // Update coins
    if (!sessionError && userCoins) {
      const newTotal = userCoins.total_coins + sessionData.coins_earned;
      await supabase
        .from('user_coins')
        .update({
          total_coins: newTotal,
          updated_at: new Date().toISOString(),
        })
        .eq('user_id', user.id);
    }

    if (!sessionError) {
      console.log('Focus session added successfully');
      await fetchUserData();
    } else {
      console.error('Focus session error:', sessionError);
    }
  };

  return {
    userProfile,
    userCoins,
    sessions,
    loading,
    updateUserProfile,
    addFocusSession,
    refetch: fetchUserData,
  };
};
