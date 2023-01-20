import Label from "@/components/elements/Label"
import { classNames, getValueFromErrors } from "@/utils"
import { ErrorMessage } from "@hookform/error-message"
import { useCallback } from "react"
import { FieldValues, MultipleFieldErrors, RegisterOptions, useFormContext } from "react-hook-form"

interface FormGroupProps {
  children: React.ReactNode
  label?: false | string
  rules?: RegisterOptions<FieldValues, string>
  name: string
}

const FormGroup = (props: FormGroupProps) => {
  const { label, name, rules, children } = props

  const { formState: { errors } } = useFormContext()

  const renderErrorMessage = useCallback((data: {
    message: string;
    messages?: MultipleFieldErrors;
  })=>{
    const errorType = getValueFromErrors(errors, name)?.type
    return <p className="mt-1 text-xs text-red-500">{data.message ?? (
      (errorType === "required" && "This field is required") ||
      (errorType === "min" && `Minimum value of ${rules?.min?.valueOf() ?? rules?.min}`) ||
      (errorType === "max" && `Maximum value of ${rules?.max?.valueOf() ?? rules?.max}`) ||
      (errorType === "minLength" && `Minimum characters of ${rules?.minLength?.valueOf() ?? rules?.minLength}`) ||
      (errorType === "minLength" && `Maximum characters of ${rules?.maxLength?.valueOf() ?? rules?.maxLength}`)
      // TODO: Add other default messages
    )}</p>
  }, [rules, errors, name])

  return (
    <div className={classNames(
      label === false ? "" : "space-y-1",
    )}>
      <Label
        htmlFor={name}
      >
        {label ?? name} {rules?.required && <sup className="text-indigo-600">*</sup>}
      </Label>
      {children}
      <ErrorMessage
        errors={errors}
        name={name}
        render={renderErrorMessage}
      />
    </div>
  )
}

export default FormGroup