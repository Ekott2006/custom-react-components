/* eslint-disable @typescript-eslint/no-misused-promises */
import { FieldValues, Path, RegisterOptions, useForm } from "react-hook-form";

type FormBasicType = {
  firstName: string
  lastName: string
  password: string
  confirmPassword: string
}
type CustomFormErrorFields = {
  isRequired: boolean
  minLength: number
  min: number
  maxLength: number
  max: number
}

const useCustomForm = <T extends FieldValues,>() => {
  const form = useForm<T>();
  type FormErrorType = CustomFormErrorFields &
    Omit<RegisterOptions<T, Path<T>>, keyof CustomFormErrorFields>;


  function formErrorHelper(fieldName: string, props: Partial<FormErrorType>): RegisterOptions<T, Path<T>> {
    const errors: Partial<RegisterOptions<T, Path<T>>> = {};

    if (props.minLength) errors.minLength = {
      message: `${fieldName} should be at least ${props.minLength} Characters`,
      value: props.minLength
    }
    if (props.min) errors.min = { message: `${fieldName} should be at least ${props.min}`, value: props.min }
    if (props.maxLength) errors.maxLength = {
      message: `${fieldName} should be at most ${props.maxLength} Characters`,
      value: props.maxLength
    }
    if (props.max) errors.max = { message: `${fieldName} should be at most ${props.max}`, value: props.max }
    if (props.isRequired) errors.required = `${fieldName} is Required`

    return { ...props, ...errors } as RegisterOptions<T, Path<T>>;
  }

  return {...form, formErrorHelper};
};

const Form = () => {
  const { handleSubmit, register, formErrorHelper, formState: { errors } } = useCustomForm<FormBasicType>();
  const onSubmit = handleSubmit((data) => {
    console.log(data);
  })
  return <form onSubmit={onSubmit}>
    <input className={`px-3 py-1 border  rounded block w-full ${errors.firstName ? "border-red-600" : "border-slate-500"}`}
      type="text" {...register("firstName", formErrorHelper("First Name", {
        isRequired: true,
        minLength: 3,
        maxLength: 200
      }))} aria-invalid={errors.firstName ? "true" : "false"}
    />

    <label><input type="text" {...register("firstName", {})} /></label>
    <button> Submit</button></form >;
};

export default Form