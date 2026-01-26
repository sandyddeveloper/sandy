import { motion } from 'framer-motion';
import { ChevronUp } from 'lucide-react';

export default function BackToTop() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <motion.button
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 20 }}
      onClick={scrollToTop}
      className="fixed bottom-6 right-6 z-40 p-4 rounded-full bg-primary text-primary-foreground shadow-django hover:scale-110 transition-transform"
    >
      <ChevronUp className="h-5 w-5" />
    </motion.button>
  );
}