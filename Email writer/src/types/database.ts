export interface Email {
  id: string;
  user_id: string;
  subject: string;
  content: string;
  recipient: string;
  category: string;
  tags: string[];
  is_favorite: boolean;
  created_at: string;
  updated_at: string;
}

export interface EmailTemplate {
  id: string;
  name: string;
  description: string | null;
  category: string;
  template: string;
  variables: string[];
  created_by: string | null;
  is_public: boolean;
  created_at: string;
  updated_at: string;
}

export interface Database {
  public: {
    Tables: {
      emails: {
        Row: Email;
        Insert: Omit<Email, 'id' | 'created_at' | 'updated_at'>;
        Update: Partial<Omit<Email, 'id' | 'created_at' | 'updated_at'>>;
      };
      email_templates: {
        Row: EmailTemplate;
        Insert: Omit<EmailTemplate, 'id' | 'created_at' | 'updated_at'>;
        Update: Partial<Omit<EmailTemplate, 'id' | 'created_at' | 'updated_at'>>;
      };
    };
  };
}