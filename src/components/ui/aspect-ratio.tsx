
import * as AspectRatioPrimitive from "@radix-ui/react-aspect-ratio"
import { cn } from "@/lib/utils"
import { Skeleton } from "./skeleton"
import { useState } from "react"

const AspectRatio = AspectRatioPrimitive.Root

// Add an optimized image component that shows skeleton while loading
const OptimizedImage = ({ 
  src, 
  alt, 
  className, 
  ...props 
}: React.ImgHTMLAttributes<HTMLImageElement>) => {
  const [isLoading, setIsLoading] = useState(true);
  
  return (
    <div className="relative">
      {isLoading && (
        <Skeleton className={cn("absolute inset-0", className)} />
      )}
      <img
        src={src}
        alt={alt || ""}
        className={cn(isLoading ? "opacity-0" : "opacity-100 transition-opacity duration-300", className)}
        onLoad={() => setIsLoading(false)}
        {...props}
      />
    </div>
  );
};

export { AspectRatio, OptimizedImage }
