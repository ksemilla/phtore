import Input from "@/components/elements/Input"
import Label from "@/components/elements/Label"
import { classNames, fieldChecker } from "@/utils"
import {
  FieldValues,
  Path,
  RegisterOptions,
  useFormContext,
} from "react-hook-form"
import FormGroup from "./FormGroup"

interface FieldInputProps<T> {
  name: Path<T>
  rules?: RegisterOptions<FieldValues, string>
  label?: false | string
  disabled?: boolean
}

interface CheckboxInputProps<T> extends Omit<FieldInputProps<T>, "label"> {
  reverse?: boolean
  label: string
}

interface NumberInputProps<T> extends FieldInputProps<T> {
  visibleArrows?: boolean
}

const useFormElements = <T extends FieldValues>() => {
  const TextInput = (props: FieldInputProps<T>) => {
    const {
      register,
      formState: { errors },
    } = useFormContext<T>()
    const { name, rules, label, disabled } = props
    return (
      <FormGroup name={name} label={label} rules={rules}>
        <Input
          type="text"
          {...register(name, rules)}
          hasError={fieldChecker(errors, name)}
          disabled={disabled}
        />
      </FormGroup>
    )
  }

  const NumberInput = (props: NumberInputProps<T>) => {
    const {
      register,
      formState: { errors },
    } = useFormContext<T>()
    const { name, rules, label, visibleArrows, disabled } = props
    return (
      <FormGroup name={name} label={label} rules={rules}>
        <Input
          id={visibleArrows ? "visible-arrow" : ""}
          type="number"
          {...register(name, {
            ...rules,
            setValueAs: (val) => parseFloat(val),
          })}
          hasError={fieldChecker(errors, name)}
          disabled={disabled}
        />
      </FormGroup>
    )
  }

  const CheckboxInput = (props: CheckboxInputProps<T>) => {
    const { register } = useFormContext<T>()
    const { name, rules, label, reverse } = props
    return (
      <div
        className={classNames(
          "flex items-center gap-x-2",
          reverse ? "flex-row-reverse" : ""
        )}
      >
        <Input
          type="checkbox"
          {...register(name, rules)}
          className="cursor-pointer focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300 rounded disabled:text-gray-300 disabled:cursor-default"
        />
        <Label>{label}</Label>
      </div>
    )
  }

  return {
    TextInput,
    NumberInput,
    CheckboxInput,
  }
}

export default useFormElements
