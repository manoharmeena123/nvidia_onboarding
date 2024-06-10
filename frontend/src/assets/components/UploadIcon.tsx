import * as React from "react"
import { SVGProps } from "react"
const SvgComponent = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={24}
    height={24}
    fill="none"
    {...props}
  >
    <path
      fill="#E5E5E5"
      fillRule="evenodd"
      d="M4.5 3v3H3V3a1.5 1.5 0 0 1 1.5-1.5h15A1.5 1.5 0 0 1 21 3v3h-1.5V3h-15Zm1.058 11.557L4.5 13.5 12 6l7.5 7.5-1.058 1.057-5.692-5.684V22.5h-1.5V8.873l-5.692 5.684Z"
      clipRule="evenodd"
    />
  </svg>
)
export default SvgComponent
