import * as React from "react";
import { SVGProps } from "react";
const SvgComponent = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={577}
    height={636}
    fill="none"
    {...props}
  >
    <g clipPath="url(#a)">
      <path fill="#E9AB00" d="M145 648.528V133l144 83.444V732l-144-83.472Z" />
      <path
        fill="#020617"
        d="M145 572.333V1116l144-83.36V489l-144 83.333ZM289 216.315V383l144-83.343V133l-144 83.315ZM433 466.423V1006l144-83.451V383l-144 83.423Z"
      />
      <path
        fill="#F87171"
        d="M1 1039.59V489l143.999 83.386L145 1123 1 1039.59Z"
      />
      <path
        fill="#E0978B"
        d="M144.682 406 1 489.514 145.318 573 289 489.514 144.682 406Z"
      />
      <path fill="#93C5FD" d="M289 929.59V383l145 83.382V1013l-145-83.41Z" />
      <path
        fill="#E8D5AC"
        d="M288.682 50 145 133.514 289.318 217 433 133.514 288.682 50Z"
      />
      <path
        fill="#7FA9D1"
        d="M432.682 300 289 383.514 433.318 467 577 383.514 432.682 300Z"
      />
    </g>
    <defs>
      <clipPath id="a">
        <path fill="#fff" d="M0 0h577v892H0z" />
      </clipPath>
    </defs>
  </svg>
);
export default SvgComponent;
