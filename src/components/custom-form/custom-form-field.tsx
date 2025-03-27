import Input, { type InputProps } from "@/components/form/input.tsx";
import NativeSelect, {
    type NativeSelectProps,
} from "@/components/form/native-select.tsx";
import type { FormErrorType } from "@/components/form/use-custom-form";
import {
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form.tsx";
import { Switch, type SwitchProps } from "@/components/ui/switch.tsx";
import { toTitleCase } from "@/lib/utils.ts";
import type * as LabelPrimitive from "@radix-ui/react-label";
import type { ComponentPropsWithoutRef } from "react";
import type {
    ControllerProps,
    FieldValues,
    Path,
    RegisterOptions,
} from "react-hook-form";
import { twMerge } from "tailwind-merge";
import { createFormOptions } from "./form-utils";
import Textarea, { type TextareaProps } from "./textarea";

export type CustomFormFieldProps<T extends FieldValues> = {
    formOptions: Omit<ControllerProps<T, Path<T>>, "render" | "rules"> & {
        rules?: Partial<FormErrorType<T>>;
        formErrorHelper: (
            fieldName: string,
            props: Partial<FormErrorType<T>>,
        ) => RegisterOptions<T, Path<T>>;
    };
    fieldName?: string;
    helper:
        | {
        type: "confirm-password";
        confirmKey: keyof T;
        input?: InputProps;
    }
        | {
        type: "date" | "time" | "email" | "password" | "text" | "basic-input";
        input?: InputProps;
    }
        | { type: "basic-select" | "select"; input: NativeSelectProps }
        | {
        type: "switch" | "basic-switch";
        input?: SwitchProps;
    }
        | { type: "textarea" | "basic-textarea"; input?: TextareaProps };
    label?: ComponentPropsWithoutRef<typeof LabelPrimitive.Root>;
    error?: ComponentPropsWithoutRef<"p">;
    className?: string;
};

const CustomFormField = <T extends FieldValues>(
    props: CustomFormFieldProps<T>,
) => {
    const { formOptions, label, error, helper, className } = props;
    const { input, formRules } = createFormOptions<T>(helper);
    const fieldName = props.fieldName ?? toTitleCase(formOptions.name);


    if (helper.type === "select" || helper.type === "basic-select") {
        const options = helper.input.options;
        // @ts-expect-error Type mismatch
        formOptions.defaultValue =
            formOptions.defaultValue ??
            (options.length > 0 ? options[0].value : undefined);
    }

    return (
        <FormField
            {...formOptions}
            render={({ field }) => {
                return (
                    <FormItem className={twMerge("space-y-2 block", className)}>
                        <FormLabel {...label}>{label?.children ?? fieldName}</FormLabel>
                        {input.type === "input" && (
                            <FormControl>
                                <Input {...field} {...input.props} />
                            </FormControl>
                        )}
                        {input.type === "select" && (
                            <FormControl>
                                <NativeSelect {...field} {...input.props} />
                            </FormControl>
                        )}
                        {input.type === "switch" && (
                            <FormControl>
                                <Switch
                                    {...input.props}
                                    checked={field.value}
                                    onCheckedChange={field.onChange}
                                />
                            </FormControl>
                        )}
                        {input.type === "textarea" && (
                            <FormControl>
                                <Textarea {...field} {...input.props} />
                            </FormControl>
                        )}
                        <FormMessage
                            role={"alert"}
                            aria-live={"polite"}
                            {...error}
                            className={"mt-1"}
                        />
                    </FormItem>
                );
            }}
            rules={formOptions.formErrorHelper(fieldName, {
                ...formRules,
                ...formOptions.rules,
            })}
        />
    );
};

export default CustomFormField;
