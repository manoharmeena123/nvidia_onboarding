import * as React from "react"
import { SVGProps } from "react"
const SvgComponent = (props: SVGProps<SVGSVGElement>) => (
  <svg width={32} height={32} {...props}>
    <title>{"Google Logo"}</title>
    <clipPath id="a">
      <path d="M29.667 13.333H16V19h7.867c-.734 3.6-3.8 5.667-7.867 5.667-4.8 0-8.667-3.867-8.667-8.667S11.2 7.333 16 7.333c2.067 0 3.933.733 5.4 1.933l4.267-4.267c-2.6-2.266-5.934-3.666-9.667-3.666C7.867 1.333 1.333 7.867 1.333 16S7.866 30.667 16 30.667c7.333 0 14-5.333 14-14.667 0-.867-.133-1.8-.333-2.667" />
    </clipPath>
    <g className="colors" clipPath="url(#a)">
      <path fill="#FBBC05" d="M0 24.667V7.333L11.333 16z" />
      <path fill="#EA4335" d="M0 7.333 11.333 16 16 11.933l16-2.6V0H0z" />
      <path fill="#34A853" d="M0 24.667 20 9.334l5.267.667L32 0v32H0z" />
      <path fill="#4285F4" d="M32 32 11.333 16l-2.667-2 23.333-6.667z" />
    </g>
  </svg>
)
export default SvgComponent
