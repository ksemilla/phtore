import { DeepPartial, FieldValues, FormProvider, SubmitErrorHandler, SubmitHandler, useForm } from "react-hook-form"

interface FormProps<T extends FieldValues> {
  children: React.ReactNode
  defaultValues?: DeepPartial<T>
  onSubmit?: SubmitHandler<T>
  onInvalid?: SubmitErrorHandler<T>
  disabled?: boolean
  id?: string
  loading?: boolean
}

const Form = <T extends FieldValues>(props: FormProps<T>) => {

  const { defaultValues, onSubmit, onInvalid, children, disabled, id, loading } = props

  const methods = useForm<T>({
    defaultValues
  })

  const { handleSubmit } = methods

  return (
    <FormProvider {...methods}>
      <form
        id={id}
        onSubmit={handleSubmit(
          (data) => onSubmit?.(data),
          (data) => onInvalid?.(data)
        )}>
        
        <fieldset disabled={disabled || loading}>
          {children}
        </fieldset>
      </form>
    </FormProvider>
  )
}

export default Form