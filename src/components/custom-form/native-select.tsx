import { inputVariants } from "@/components/form/input.tsx";
import { cn } from "@/lib/utils.ts";
import type { VariantProps } from "class-variance-authority";
import { type ComponentPropsWithoutRef, forwardRef } from "react";

export type NativeSelectProps = {
    options: { title: string; value?: string; isDefaultValue?: boolean }[];
} & VariantProps<typeof inputVariants> &
    ComponentPropsWithoutRef<"select">;

const NativeSelect = forwardRef<HTMLSelectElement, NativeSelectProps>(
    function CustomSelect({ className, variant, options, ...props }, ref) {
        return (
            <select
                ref={ref}
                {...props}
                className={cn(inputVariants({ variant }), className)}
                defaultValue={options.find((x) => x.isDefaultValue)?.value ?? options.length > 0 ? options[0].value : undefined}
            >
                {options.map((x) => (
                    <option
                        value={x.value ?? ""}
                        key={x.title}
                        disabled={x.isDefaultValue}
                    >
                        {x.title}
                    </option>
                ))}
            </select>
        );
    },
);
export default NativeSelect;
