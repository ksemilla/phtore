import { classNames } from "@/utils"
import { forwardRef } from "react"

interface SelectProps extends React.DetailedHTMLProps<React.SelectHTMLAttributes<HTMLSelectElement>, HTMLSelectElement> {
  hasError?: boolean
}

const Select = forwardRef<HTMLSelectElement, SelectProps>((props, ref) => {

  const { hasError, ...rest } = props
  return (
    <select
      ref={ref}
      {...rest}
      className={classNames(
        "block w-full rounded-md shadow-sm sm:text-sm",
        hasError ? "border-red-300 focus:border-red-500 focus:ring-red-500" : "border-gray-300 focus:border-indigo-500 focus:ring-indigo-500",
      )}
    />
  )
})

export default Select