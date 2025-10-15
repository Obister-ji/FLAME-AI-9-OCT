import { supabase } from '../supabase/client';
import type { Email, EmailTemplate } from '../types/database';

// Get current user ID from Clerk
const getUserId = (): string | null => {
  // Get user ID from localStorage (set by ClerkProvider)
  const userId = window.localStorage.getItem('clerk_user_id');
  
  // If no user ID found, log error and return null
  if (!userId) {
    console.error('No user ID found. User may not be authenticated.');
    return null;
  }
  
  return userId;
};

// Email operations
export const fetchEmails = async (): Promise<Email[]> => {
  const userId = getUserId();
  if (!userId) {
    console.log('Cannot fetch emails: User not authenticated');
    return [];
  }

  try {
    const { data, error } = await supabase
      .from('emails')
      .select('*')
      .eq('user_id', userId)
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Error fetching emails:', error);
      return [];
    }

    console.log(`Fetched ${data?.length || 0} emails for user ${userId}`);
    return data || [];
  } catch (err) {
    console.error('Unexpected error fetching emails:', err);
    return [];
  }
};

export const createEmail = async (email: Omit<Email, 'id' | 'user_id' | 'created_at' | 'updated_at'>): Promise<Email | null> => {
  const userId = getUserId();
  if (!userId) {
    console.error('Cannot create email: User not authenticated');
    return null;
  }

  try {
    const { data, error } = await supabase
      .from('emails')
      .insert({
        ...email,
        user_id: userId
      })
      .select()
      .single();

    if (error) {
      console.error('Error creating email:', error);
      return null;
    }

    console.log('Email created successfully:', data.id);
    return data;
  } catch (err) {
    console.error('Unexpected error creating email:', err);
    return null;
  }
};

export const updateEmail = async (id: string, updates: Partial<Email>): Promise<Email | null> => {
  const { data, error } = await supabase
    .from('emails')
    .update(updates)
    .eq('id', id)
    .select()
    .single();

  if (error) {
    console.error('Error updating email:', error);
    return null;
  }

  return data;
};

export const deleteEmail = async (id: string): Promise<boolean> => {
  const { error } = await supabase
    .from('emails')
    .delete()
    .eq('id', id);

  if (error) {
    console.error('Error deleting email:', error);
    return false;
  }

  return true;
};

export const toggleEmailFavorite = async (id: string, isFavorite: boolean): Promise<Email | null> => {
  return updateEmail(id, { is_favorite: isFavorite });
};

// Email template operations
export const fetchEmailTemplates = async (): Promise<EmailTemplate[]> => {
  const { data, error } = await supabase
    .from('email_templates')
    .select('*')
    .or('is_public.eq.true,created_by.eq.' + (getUserId() || ''))
    .order('created_at', { ascending: false });

  if (error) {
    console.error('Error fetching email templates:', error);
    return [];
  }

  return data || [];
};

export const createEmailTemplate = async (template: Omit<EmailTemplate, 'id' | 'created_by' | 'created_at' | 'updated_at'>): Promise<EmailTemplate | null> => {
  const userId = getUserId();
  if (!userId) return null;

  const { data, error } = await supabase
    .from('email_templates')
    .insert({
      ...template,
      created_by: userId
    })
    .select()
    .single();

  if (error) {
    console.error('Error creating email template:', error);
    return null;
  }

  return data;
};

export const updateEmailTemplate = async (id: string, updates: Partial<EmailTemplate>): Promise<EmailTemplate | null> => {
  const { data, error } = await supabase
    .from('email_templates')
    .update(updates)
    .eq('id', id)
    .select()
    .single();

  if (error) {
    console.error('Error updating email template:', error);
    return null;
  }

  return data;
};

export const deleteEmailTemplate = async (id: string): Promise<boolean> => {
  const { error } = await supabase
    .from('email_templates')
    .delete()
    .eq('id', id);

  if (error) {
    console.error('Error deleting email template:', error);
    return false;
  }

  return true;
};