import { classNames } from "@/utils"
import { forwardRef } from "react"

interface InputProps extends React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement> {
  hasError?: boolean
}

const Input = forwardRef<HTMLInputElement, InputProps>((props, ref) => {

  const { hasError, className, ...rest } = props

  return (
    <input
      ref={ref}
      {...rest}
      className={className ?? classNames(
        "block w-full rounded-md shadow-sm sm:text-sm",
        hasError ? "border-red-300 focus:border-red-500 focus:ring-red-500" : "border-gray-300 focus:border-indigo-500 focus:ring-indigo-500"
      )}
    />
  )
})

export default Input