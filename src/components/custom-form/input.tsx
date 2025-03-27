import type { ExtractStringLiterals, IconProps } from "@/lib/types";
import { cn } from "@/lib/utils";
import { type VariantProps, cva } from "class-variance-authority";
import { EyeIcon, EyeOffIcon, SearchIcon } from "lucide-react";
import {
    type ComponentProps,
    type ComponentPropsWithoutRef,
    type FC,
    type HTMLInputTypeAttribute,
    forwardRef,
    useState,
} from "react";
import { twMerge } from "tailwind-merge";

// Base input styles
const baseInputClassName =
    "flex w-full rounded-lg border-dark-gray-100 bg-background text-foreground shadow-sm shadow-black/5 transition-shadow placeholder:text-muted-foreground/70 placeholder:text-sm focus-visible:border-primary focus-visible:outline-none focus-visible:ring-[3px] focus-visible:ring-primary disabled:cursor-not-allowed disabled:opacity-50";
const searchInputClassName =
    "[&::-webkit-search-cancel-button]:appearance-none [&::-webkit-search-decoration]:appearance-none [&::-webkit-search-results-button]:appearance-none [&::-webkit-search-results-decoration]:appearance-none pe-9 ps-9";
const fileInputClassName =
    "p-0 pr-3 italic text-muted-foreground/70 file:me-3 file:h-full file:border-0 file:border-r file:border-solid file:border-dark-gray-100 file:bg-transparent file:px-3 file:text-sm file:font-medium file:not-italic file:text-foreground";

// Password toggle button styles
const passwordToggleButtonClassName =
    "absolute inset-y-0 end-0 flex h-full w-9 items-center justify-center rounded-e-lg text-muted-foreground/80 outline-offset-2 transition-colors hover:text-foreground focus:z-10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-ring/70 disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50";

// eslint-disable-next-line react-refresh/only-export-components
export const inputVariants = cva(baseInputClassName, {
    variants: {
        variant: {
            login: "p-4 text-lg border",
            default: "px-4 py-2 border-2",
        },
    },
    defaultVariants: {
        variant: "default",
    },
});

type PasswordInputProps = {
    type: "custom-password";
    container?: ComponentPropsWithoutRef<"div">;
    icon?: IconProps;
    button?: ComponentPropsWithoutRef<"button">;
};

type SearchInputProps = {
    type: "custom-search";
    container?: ComponentPropsWithoutRef<"div">;
    icon?: IconProps;
    iconContainer?: ComponentPropsWithoutRef<"div">;
};
type DefaultInputProps = {
    type?: ExtractStringLiterals<HTMLInputTypeAttribute>;
};
export type InputProps = ComponentProps<"input"> &
    (SearchInputProps | PasswordInputProps | DefaultInputProps) &
    VariantProps<typeof inputVariants>;
const Input: FC<InputProps> = forwardRef<HTMLInputElement, InputProps>(
    (props, ref) => {
        const [isVisible, setIsVisible] = useState<boolean>(false);
        const toggleVisibility = () => setIsVisible((prevState) => !prevState);

        return (
            <div
                className={
                    props.type === "custom-password" || props.type === "custom-search"
                        ? "relative"
                        : "contents"
                }
            >
                <input
                    type={
                        props.type === "custom-password" && isVisible ? "text" : props.type
                    }
                    ref={ref}
                    data-slot="input"
                    {...props}
                    className={cn(
                        inputVariants({ variant: props.variant }),
                        props.type === "custom-search" && searchInputClassName,
                        props.type === "file" && fileInputClassName,
                        (props.type === "date" ||
                            props.type === "time" ||
                            props.type === "datetime-local") &&
                        "block",
                        props.className,
                    )}
                />
                {props.type === "custom-search" && (
                    <div
                        {...props?.iconContainer}
                        className={twMerge(
                            "text-muted-foreground/80 pointer-events-none absolute inset-y-0 start-0 flex items-center justify-center ps-3 peer-disabled:opacity-50",
                            props.iconContainer?.className,
                        )}
                    >
                        <SearchIcon size={16} aria-hidden="true" {...props.icon} />
                    </div>
                )}
                {props.type === "custom-password" ? (
                    <button
                        type="button"
                        onClick={toggleVisibility}
                        aria-label={isVisible ? "Hide password" : "Show password"}
                        aria-pressed={isVisible}
                        aria-controls="password"
                        {...props.button}
                        className={twMerge(
                            passwordToggleButtonClassName,
                            props.button?.className,
                        )}
                    >
                        {isVisible ? (
                            <EyeOffIcon size={16} aria-hidden="true" {...props.icon} />
                        ) : (
                            <EyeIcon size={16} aria-hidden="true" {...props.icon} />
                        )}
                    </button>
                ) : (
                    <></>
                )}
            </div>
        );
    },
);

export default Input;
