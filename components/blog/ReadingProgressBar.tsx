import { motion, MotionValue } from 'framer-motion';

interface ReadingProgressBarProps {
  progress: MotionValue<number>;
}

export default function ReadingProgressBar({ progress }: ReadingProgressBarProps) {
  return (
    <div className="fixed top-0 left-0 right-0 z-50 h-1 bg-muted">
      <motion.div
        className="h-full bg-gradient-to-r from-primary via-primary to-accent"
        style={{ scaleX: progress, transformOrigin: 'left' }}
      />
    </div>
  );
}