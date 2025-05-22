
import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

/**
 * Optimizes animations to run in small chunks for better performance
 * @param callback Animation callback function
 * @param frames Number of frames to process in each chunk
 */
export function optimizeAnimation(
  callback: (timestamp: number) => boolean | void,
  frames: number = 5
): () => void {
  let running = true;
  let frameCount = 0;

  const step = (timestamp: number) => {
    if (!running) return;
    
    // Limit frame processing to improve performance
    if (frameCount < frames) {
      frameCount++;
      const shouldContinue = callback(timestamp);
      if (shouldContinue === false) {
        running = false;
        return;
      }
    } else {
      frameCount = 0;
      // Schedule next frame with a small delay to allow browser to handle other tasks
      setTimeout(() => requestAnimationFrame(step), 0);
      return;
    }
    
    requestAnimationFrame(step);
  };

  requestAnimationFrame(step);
  return () => { running = false; };
}

/**
 * Creates a throttled function that only invokes the provided function
 * at most once per specified interval
 * @param fn Function to throttle
 * @param delay Delay in ms
 */
export function throttle<T extends (...args: any[]) => any>(
  fn: T,
  delay: number
): (...args: Parameters<T>) => void {
  let lastCall = 0;
  return (...args: Parameters<T>) => {
    const now = Date.now();
    if (now - lastCall < delay) return;
    lastCall = now;
    return fn(...args);
  };
}
