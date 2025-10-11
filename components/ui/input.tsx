import * as React from "react"

import { cn } from "@/lib/utils"

function Input({ className, type, ...props }: React.ComponentProps<"input">) {
  return (
    <input
      type={type}
      data-slot="input"
      className={cn(
        // Design Token System - Standard Input
        "w-full h-10 px-4 py-2 text-base bg-white dark:bg-neutral-900 border border-neutral-300 dark:border-neutral-700 rounded-lg",
        "text-neutral-900 dark:text-white placeholder:text-neutral-500 dark:placeholder:text-neutral-400",
        "transition-all duration-200 outline-none",
        "focus:ring-2 focus:ring-primary-500/50 focus:border-primary-500",
        "disabled:opacity-50 disabled:cursor-not-allowed disabled:bg-neutral-100 dark:disabled:bg-neutral-800",
        "aria-invalid:border-danger-500 aria-invalid:ring-2 aria-invalid:ring-danger-500/50",
        // File input styles
        "file:mr-4 file:py-1 file:px-3 file:rounded-md file:border-0 file:text-sm file:font-medium file:bg-neutral-100 dark:file:bg-neutral-800 file:text-neutral-700 dark:file:text-neutral-300 hover:file:bg-neutral-200 dark:hover:file:bg-neutral-700",
        className
      )}
      {...props}
    />
  )
}

export { Input }
