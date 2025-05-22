
import * as React from "react"
import * as HoverCardPrimitive from "@radix-ui/react-hover-card"
import { motion } from "framer-motion"

import { cn } from "@/lib/utils"

const HoverCard = HoverCardPrimitive.Root

const HoverCardTrigger = HoverCardPrimitive.Trigger

const HoverCardContent = React.forwardRef<
  React.ElementRef<typeof HoverCardPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof HoverCardPrimitive.Content>
>(({ className, align = "center", sideOffset = 4, ...props }, ref) => (
  <HoverCardPrimitive.Content
    ref={ref}
    align={align}
    sideOffset={sideOffset}
    asChild
    className={cn(
      className
    )}
    {...props}
  >
    <motion.div
      initial={{ opacity: 0, scale: 0.95, y: 10 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95, y: 10 }}
      transition={{ duration: 0.2, ease: "easeOut" }}
      className={cn(
        "z-50 w-64 rounded-md border p-4 text-popover-foreground shadow-md outline-none",
        "backdrop-blur-md bg-white/90 border-leaf-100/50 shadow-xl",
        "transition-all duration-300"
      )}
    >
      {props.children}
    </motion.div>
  </HoverCardPrimitive.Content>
))
HoverCardContent.displayName = HoverCardPrimitive.Content.displayName

export { HoverCard, HoverCardTrigger, HoverCardContent }
