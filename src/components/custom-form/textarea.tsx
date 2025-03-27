import { cn } from "@/lib/utils";
import type { VariantProps } from "class-variance-authority";
import { type ComponentProps, forwardRef } from "react";
import { inputVariants } from "./input";

export type TextareaProps = ComponentProps<"textarea"> &
    VariantProps<typeof inputVariants>;

const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
    ({ className, variant, ...props }, ref) => {
        return (
            <textarea
                className={cn(
                    inputVariants({ variant, className: "resize-none" }),
                    className,
                )}
                ref={ref}
                rows={4}
                {...props}
            />
        );
    },
);
export default Textarea;
