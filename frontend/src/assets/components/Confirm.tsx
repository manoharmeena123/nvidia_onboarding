import * as React from "react"
import { SVGProps } from "react"
const SvgComponent = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={48}
    height={48}
    fill="none"
    {...props}
  >
    <path
      fill="#4ADE80"
      d="M24 3a21 21 0 1 0 0 42 21 21 0 0 0 0-42Zm-3 29.386-7.5-7.5 2.386-2.386L21 27.614 32.115 16.5l2.394 2.379L21 32.386Z"
    />
  </svg>
)
export default SvgComponent
