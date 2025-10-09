import React, { useState } from 'react';
import { 
  Search, 
  Copy, 
  Download, 
  Trash2, 
  Star, 
  Filter,
  Calendar,
  Tag,
  Heart,
  SortAsc,
  SortDesc,
  Mail,
  User,
  FileText
} from 'lucide-react';
import toast from 'react-hot-toast';
import type { Email } from '../App';

interface EmailHistoryProps {
  emails: Email[];
  onDeleteEmail: (id: string) => void;
  onToggleFavorite: (id: string) => void;
}

export function EmailHistory({ emails, onDeleteEmail, onToggleFavorite }: EmailHistoryProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [sortBy, setSortBy] = useState<'date' | 'subject' | 'category'>('date');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc');
  const [showFavoritesOnly, setShowFavoritesOnly] = useState(false);

  const categories = ['All', ...Array.from(new Set(emails.map(e => e.category)))];

  const filteredAndSortedEmails = emails
    .filter(email => {
      const matchesSearch = email.subject.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           email.content.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           email.recipient.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           email.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
      const matchesCategory = selectedCategory === 'All' || email.category === selectedCategory;
      const matchesFavorites = !showFavoritesOnly || email.isFavorite;
      
      return matchesSearch && matchesCategory && matchesFavorites;
    })
    .sort((a, b) => {
      let comparison = 0;
      
      switch (sortBy) {
        case 'date':
          comparison = new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
          break;
        case 'subject':
          comparison = a.subject.localeCompare(b.subject);
          break;
        case 'category':
          comparison = a.category.localeCompare(b.category);
          break;
      }
      
      return sortOrder === 'asc' ? comparison : -comparison;
    });

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    toast.success('Copied to clipboard!');
  };

  const downloadEmail = (email: Email) => {
    const content = `Subject: ${email.subject}\nRecipient: ${email.recipient}\nCategory: ${email.category}\nTags: ${email.tags.join(', ')}\nCreated: ${email.createdAt.toLocaleDateString()}\n\n${email.content}`;
    const element = document.createElement('a');
    const file = new Blob([content], { type: 'text/plain' });
    element.href = URL.createObjectURL(file);
    element.download = `${email.subject.replace(/\s+/g, '-')}-${Date.now()}.txt`;
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
    toast.success('Email downloaded!');
  };

  const toggleSortOrder = () => {
    setSortOrder(prev => prev === 'asc' ? 'desc' : 'asc');
  };

  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    }).format(date);
  };

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      <div className="bg-card rounded-lg p-6 shadow-sm border border-border">
        <h2 className="text-2xl font-bold text-primary mb-6 flex items-center gap-2">
          <Calendar className="w-6 h-6" />
          Email History
        </h2>

        {/* Filters and Search */}
        <div className="flex flex-col lg:flex-row gap-4 mb-6">
          {/* Search */}
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search emails..."
              className="w-full pl-10 pr-4 py-2 border border-border rounded-lg bg-background text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
            />
          </div>

          {/* Category Filter */}
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="px-4 py-2 border border-border rounded-lg bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
          >
            {categories.map(category => (
              <option key={category} value={category}>{category}</option>
            ))}
          </select>

          {/* Sort Options */}
          <div className="flex gap-2">
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as 'date' | 'subject' | 'category')}
              className="px-4 py-2 border border-border rounded-lg bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
            >
              <option value="date">Sort by Date</option>
              <option value="subject">Sort by Subject</option>
              <option value="category">Sort by Category</option>
            </select>
            
            <button
              onClick={toggleSortOrder}
              className="px-3 py-2 border border-border rounded-lg bg-background text-foreground hover:bg-muted transition-colors"
              title="Toggle sort order"
            >
              {sortOrder === 'asc' ? <SortAsc className="w-4 h-4" /> : <SortDesc className="w-4 h-4" />}
            </button>
          </div>

          {/* Favorites Filter */}
          <button
            onClick={() => setShowFavoritesOnly(!showFavoritesOnly)}
            className={`px-4 py-2 border border-border rounded-lg transition-colors ${
              showFavoritesOnly 
                ? 'bg-accent text-accent-foreground border-accent' 
                : 'bg-background text-foreground hover:bg-muted'
            }`}
          >
            <Heart className={`w-4 h-4 ${showFavoritesOnly ? 'fill-current' : ''}`} />
          </button>
        </div>

        {/* Results Count */}
        <div className="text-sm text-muted-foreground mb-4">
          Showing {filteredAndSortedEmails.length} of {emails.length} emails
        </div>

        {/* Emails Grid */}
        {filteredAndSortedEmails.length === 0 ? (
          <div className="text-center py-12">
            <div className="text-muted-foreground mb-4">
              <Mail className="w-12 h-12 mx-auto mb-4 opacity-50" />
              <p>No emails found</p>
              <p className="text-sm">Try adjusting your filters or create some new emails</p>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-4">
            {filteredAndSortedEmails.map(email => (
              <div
                key={email.id}
                className="bg-background border border-border rounded-lg p-4 hover:shadow-md transition-all duration-300 card-hover group"
              >
                {/* Header */}
                <div className="flex justify-between items-start mb-3">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <h3 className="font-semibold text-primary line-clamp-1">
                        {email.subject}
                      </h3>
                      {email.recipient && (
                        <div className="flex items-center gap-1 text-xs text-muted-foreground">
                          <User className="w-3 h-3" />
                          <span className="truncate max-w-32">{email.recipient}</span>
                        </div>
                      )}
                    </div>
                    <div className="flex items-center gap-2 text-xs text-muted-foreground">
                      <span className="px-2 py-1 bg-muted rounded">{email.category}</span>
                      <span>{formatDate(email.createdAt)}</span>
                    </div>
                  </div>
                  
                  <button
                    onClick={() => onToggleFavorite(email.id)}
                    className="ml-2 p-1 rounded hover:bg-muted transition-colors"
                    title={email.isFavorite ? 'Remove from favorites' : 'Add to favorites'}
                  >
                    <Star className={`w-4 h-4 ${email.isFavorite ? 'fill-accent text-accent' : 'text-muted-foreground'}`} />
                  </button>
                </div>

                {/* Content Preview */}
                <div className="mb-3">
                  <p className="text-sm text-foreground line-clamp-3">
                    {email.content.substring(0, 200)}...
                  </p>
                </div>

                {/* Tags */}
                {email.tags.length > 0 && (
                  <div className="flex flex-wrap gap-1 mb-3">
                    {email.tags.slice(0, 3).map(tag => (
                      <span
                        key={tag}
                        className="inline-flex items-center gap-1 px-2 py-1 bg-muted text-muted-foreground rounded text-xs"
                      >
                        <Tag className="w-2 h-2" />
                        {tag}
                      </span>
                    ))}
                    {email.tags.length > 3 && (
                      <span className="text-xs text-muted-foreground">
                        +{email.tags.length - 3} more
                      </span>
                    )}
                  </div>
                )}

                {/* Actions */}
                <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                  <button
                    onClick={() => copyToClipboard(email.content)}
                    className="flex-1 px-3 py-1 bg-primary text-primary-foreground rounded text-sm hover:bg-primary/90 transition-colors"
                  >
                    <Copy className="w-3 h-3 inline mr-1" />
                    Copy
                  </button>
                  <button
                    onClick={() => downloadEmail(email)}
                    className="flex-1 px-3 py-1 bg-secondary text-secondary-foreground rounded text-sm hover:bg-secondary/90 transition-colors"
                  >
                    <Download className="w-3 h-3 inline mr-1" />
                    Download
                  </button>
                  <button
                    onClick={() => onDeleteEmail(email.id)}
                    className="px-3 py-1 bg-destructive text-destructive-foreground rounded text-sm hover:bg-destructive/90 transition-colors"
                  >
                    <Trash2 className="w-3 h-3" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}