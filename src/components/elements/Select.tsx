import { forwardRef } from "react"

interface SelectProps extends React.DetailedHTMLProps<React.SelectHTMLAttributes<HTMLSelectElement>, HTMLSelectElement> {}

const Select = forwardRef<HTMLSelectElement, SelectProps>((props, ref) => {
  return (
    <select
      ref={ref}
      {...props}
      className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
    />
  )
})

export default Select