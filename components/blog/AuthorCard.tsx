import { User, Twitter, Github, Linkedin } from 'lucide-react';

interface AuthorCardProps {
  author: string;
}

export default function AuthorCard({ author }: AuthorCardProps) {
  return (
    <div className="rounded-2xl bg-gradient-to-br from-primary/10 to-primary/5 border border-primary/20 p-6">
      <div className="flex items-start gap-4">
        <div className="w-14 h-14 rounded-full bg-primary/20 flex items-center justify-center shrink-0">
          <User className="h-7 w-7 text-primary" />
        </div>
        
        <div className="flex-1 min-w-0">
          <h4 className="font-semibold text-primary">{author}</h4>
          <p className="text-sm text-muted-foreground mt-1">
            Senior Django Developer & Technical Writer
          </p>
          
          <div className="flex items-center gap-2 mt-3">
            <a 
              href="#" 
              className="p-2 rounded-lg bg-primary/10 hover:bg-primary/20 text-primary transition-colors"
            >
              <Twitter className="h-4 w-4" />
            </a>
            <a 
              href="#" 
              className="p-2 rounded-lg bg-primary/10 hover:bg-primary/20 text-primary transition-colors"
            >
              <Github className="h-4 w-4" />
            </a>
            <a 
              href="#" 
              className="p-2 rounded-lg bg-primary/10 hover:bg-primary/20 text-primary transition-colors"
            >
              <Linkedin className="h-4 w-4" />
            </a>
          </div>
        </div>
      </div>
      
      <p className="mt-4 text-sm text-muted-foreground leading-relaxed">
        Passionate about building scalable web applications and sharing knowledge 
        with the developer community.
      </p>
    </div>
  );
}