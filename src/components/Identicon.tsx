import { classNames } from "@/utils";
import { toSvg } from "jdenticon";

const Identicon = (props: {value: string, size: number, containerSize: number}) => {
  const { value, size, containerSize } = props
  const svgString = toSvg(value, size)
  return (
    <div
      dangerouslySetInnerHTML={{__html: svgString}}
      className={classNames(
        "flex justify-center items-center overflow-hidden",
        `w-${containerSize ?? "12"} h-${containerSize ?? "12"}`
      )}/>
  )
}

export default Identicon