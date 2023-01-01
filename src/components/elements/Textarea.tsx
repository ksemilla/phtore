import { classNames } from "@/utils"
import { forwardRef } from "react"

interface TextareaProps extends React.DetailedHTMLProps<React.TextareaHTMLAttributes<HTMLTextAreaElement>, HTMLTextAreaElement> {
  hasError?: boolean
}

const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>((props, ref) => {

  const { hasError, ...rest } = props

  return (
    <textarea
      ref={ref}
      {...rest}
      className={classNames(
        "block w-full rounded-md shadow-sm sm:text-sm",
        hasError ? "border-red-300 focus:border-red-500 focus:ring-red-500" : "border-gray-300 focus:border-indigo-500 focus:ring-indigo-500",
      )}
    />
  )
})

export default Textarea