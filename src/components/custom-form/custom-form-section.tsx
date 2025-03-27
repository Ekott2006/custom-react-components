import {FieldValues, useController, UseControllerProps, useForm} from "react-hook-form";
import {ComponentPropsWithoutRef} from "react";

// TODO: Complete this
interface CustomInputProps<T extends CustomForm> {
    formOptions: Omit<UseControllerProps<T>, "control"> & { control: UseControllerProps["control"] }
    label?: ComponentPropsWithoutRef<"label">


}

const CustomInput = <T extends CustomForm, >(props: CustomInputProps<T>) => {
    const {formOptions, label} = props
    const controller = useController(props.formOptions)
    console.log(controller.field.)
    return <div>

        <input {...controller.field}  />
        {controller.fieldState.error && <p>{controller.fieldState.error?.message}</p>}
    </div>

}
interface CustomForm {
    name: string
}
const CustomFormSection = () => {
    const {control} = useForm<CustomForm>()
    return (
        <div>
            <CustomInput formOptions={{control, name: "name"}}/>
        </div>
    )
}
export default CustomFormSection
