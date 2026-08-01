import { cva } from "class-variance-authority"

export const sidebarMenuButtonVariants = cva(
  "flex w-full items-center gap-2 overflow-hidden rounded-md p-2 text-left text-sm outline-hidden hover:bg-sidebar-accent hover:text-sidebar-accent-foreground focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:focus-visible:ring-destructive/20 dark:aria-invalid:focus-visible:ring-destructive/40 aria-disabled:pointer-events-none aria-disabled:opacity-50 group-data-[collapsible=icon]:size-8! group-data-[collapsible=icon]:p-0! [&>svg]:size-4 [&>svg]:shrink-0",
  {
    variants: {
      variant: {
        default: "hover:bg-sidebar-accent hover:text-sidebar-accent-foreground",
        outline:
          "border border-sidebar-border bg-background shadow-xs hover:bg-sidebar-accent hover:text-sidebar-accent-foreground",
      },
      size: {
        default: "h-9 text-sm",
        sm: "h-8 text-xs",
        lg: "h-10 text-base",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)
