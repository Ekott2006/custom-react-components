import { RegisterOptions, useForm } from "react-hook-form"

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

type FormErrorType<T extends keyof FormBasicType> = CustomFormErrorFields &
    Omit<RegisterOptions<FormBasicType, T>, keyof CustomFormErrorFields>;

function formError<T extends keyof FormBasicType>(fieldName: string, props: Partial<FormErrorType<T>>): RegisterOptions<FormBasicType, T> {
    const errors: Partial<RegisterOptions<FormBasicType, T>> = {};

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

    return { ...props, ...errors } as RegisterOptions<FormBasicType, T>;
}


const FormBasic = () => {
    const { register, handleSubmit, formState: { errors } } = useForm<FormBasicType>()
    console.log(errors);
    const onSubmit = handleSubmit((data) => {
        console.log(data);
    })

    return (
        // eslint-disable-next-line @typescript-eslint/no-misused-promises
        <form onSubmit={onSubmit} className="max-w-xl mx-auto grid gap-4">
            <h1 className="text-3xl font-bold text-center">Custom Form</h1>
            <label>
                <p>First Name: </p>
                <input className={`px-3 py-1 border  rounded block w-full ${errors.firstName ? "border-red-600" : "border-slate-500"}`}
                    type="text" {...register("firstName", formError<"firstName">("First Name", {
                        isRequired: true,
                        minLength: 3,
                        maxLength: 200
                    }))} aria-invalid={errors.firstName ? "true" : "false"}
                />
                {errors.firstName ? <p className="text-red-700" role="alert">{errors.firstName.message}</p> : <></>}
            </label>
            <label>
                <p>Last Name: </p>
                <input className={`px-3 py-1 border  rounded block w-full ${errors.lastName ? "border-red-600" : "border-slate-500"}`}
                    type="text" {...register("lastName", formError("Last Name", {
                        isRequired: true,
                        minLength: 3,
                        maxLength: 200
                    }))} aria-invalid={errors.lastName ? "true" : "false"} />
                {errors.lastName ? <p className="text-red-700" role="alert">{errors.lastName.message}</p> : <></>}
            </label>
            <label>
                <p>Password: </p>
                <input className={`px-3 py-1 border  rounded block w-full ${errors.password ? "border-red-600" : "border-slate-500"}`}
                    type="password" {...register("password", formError("Password", {
                        isRequired: true,
                        minLength: 6,
                        maxLength: 50
                    }))} aria-invalid={errors.password ? "true" : "false"} />
                {errors.password ? <p className="text-red-700" role="alert">{errors.password.message}</p> : <></>}
            </label>
            <label>
                <p>Confirm Password: </p>
                <input className={`px-3 py-1 border  rounded block w-full ${errors.confirmPassword ? "border-red-600" : "border-slate-500"}`}
                    type="password" {...register("confirmPassword", formError("Confirm Password", { validate: (value, formValues) => value === formValues.password }))}
                    aria-invalid={errors.confirmPassword ? "true" : "false"} />
                {errors.confirmPassword ?
                    <p className="text-red-700" role="alert">Passwords do not Match</p> : <></>}
            </label>
            <button
                className="bg-slate-500 hover:bg-slate-800 hover:scale-110 text-white rounded px-4 py-1.5 w-max transition-all duration-500">Submit
            </button>
        </form>
    )
}

export default FormBasic