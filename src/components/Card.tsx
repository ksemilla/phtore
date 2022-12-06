import { classNames } from "@/utils"
import { ReactNode } from "react"

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  children?: ReactNode
  classNamesProps?: string
  tilt?: boolean
  containerClassNames?: string
}

const Card: React.FC<CardProps> = ({ children, classNamesProps, containerClassNames, tilt=true, ...rest }) => {
  return (
    <div className={classNames(
      "rounded-lg bg-gray-300 relative",
      containerClassNames ?? ""
    )}>
      <div
        className={classNames(
        "relative top-0 right-0 left-0 bottom-0 bg-white shadow rounded-lg cursor-pointer h-full",
        tilt ? "hover:-top-0.5 hover:left-0.5" : "",
        classNamesProps ?? "",
        )}
        {...rest}
      >
        {children}
      </div>
    </div>
  )
}

export default Card