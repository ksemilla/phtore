import { forwardRef, useState } from "react"

interface ImgProps extends React.DetailedHTMLProps<React.ImgHTMLAttributes<HTMLImageElement>, HTMLImageElement> {
  // hasError?: boolean
}

const Img = forwardRef<HTMLImageElement, ImgProps>((props, ref) => {

  const [timeNow] = useState(new Date().valueOf())

  return (
    <img
      ref={ref}
      {...props}
      src={`${props.src}?${timeNow}`}
    />
  )
})

export default Img