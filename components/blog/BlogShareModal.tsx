import { motion } from 'framer-motion';
import { X, Twitter, Facebook, Linkedin, Link2, Mail, Check, Copy } from 'lucide-react';
import { useState } from 'react';
import { toast } from 'sonner';

interface BlogShareModalProps {
  title: string;
  url: string;
  excerpt: string;
  onClose: () => void;
}

export default function BlogShareModal({ title, url, excerpt, onClose }: BlogShareModalProps) {
  const [copied, setCopied] = useState(false);

  const shareLinks = [
    {
      name: 'Twitter',
      icon: Twitter,
      url: `https://twitter.com/intent/tweet?text=${encodeURIComponent(title)}&url=${encodeURIComponent(url)}`,
      color: 'hover:bg-blue-500/10 hover:text-blue-500',
    },
    {
      name: 'Facebook',
      icon: Facebook,
      url: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`,
      color: 'hover:bg-blue-600/10 hover:text-blue-600',
    },
    {
      name: 'LinkedIn',
      icon: Linkedin,
      url: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`,
      color: 'hover:bg-blue-700/10 hover:text-blue-700',
    },
    {
      name: 'Email',
      icon: Mail,
      url: `mailto:?subject=${encodeURIComponent(title)}&body=${encodeURIComponent(excerpt + '\n\n' + url)}`,
      color: 'hover:bg-primary/10 hover:text-primary',
    },
  ];

  const handleCopyLink = () => {
    navigator.clipboard.writeText(url);
    setCopied(true);
    toast.success('Link copied to clipboard!');
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-background/80 backdrop-blur-sm"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.95, opacity: 0 }}
        className="relative w-full max-w-md rounded-2xl bg-card border border-primary/20 shadow-elevated p-6"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-lg hover:bg-muted transition-colors"
        >
          <X className="h-5 w-5 text-muted-foreground" />
        </button>

        {/* Header */}
        <h3 className="text-xl font-bold text-foreground mb-2">Share this article</h3>
        <p className="text-sm text-muted-foreground mb-6">{title}</p>

        {/* Share Buttons */}
        <div className="grid grid-cols-4 gap-3 mb-6">
          {shareLinks.map((link) => (
            <a
              key={link.name}
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              className={`flex flex-col items-center gap-2 p-4 rounded-xl border border-primary/10 bg-muted/30 transition-all ${link.color}`}
            >
              <link.icon className="h-5 w-5" />
              <span className="text-xs font-medium">{link.name}</span>
            </a>
          ))}
        </div>

        {/* Copy Link */}
        <div className="flex items-center gap-2">
          <div className="flex-1 px-4 py-3 rounded-xl bg-muted/50 border border-primary/10 text-sm text-muted-foreground truncate">
            {url}
          </div>
          <button
            onClick={handleCopyLink}
            className={`p-3 rounded-xl transition-all ${
              copied 
                ? 'bg-primary/20 text-primary' 
                : 'bg-primary/10 hover:bg-primary/20 text-primary'
            }`}
          >
            {copied ? <Check className="h-5 w-5" /> : <Copy className="h-5 w-5" />}
          </button>
        </div>
      </motion.div>
    </motion.div>
  );
}