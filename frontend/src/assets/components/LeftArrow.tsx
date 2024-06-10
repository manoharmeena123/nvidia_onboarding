import * as React from "react";
import { SVGProps } from "react";
 const SvgComponent = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={22}
    height={22}
    fill="none"
    {...props}
  >
    <path
      fill="#000"
      d="m9.625 17.875.97-.97-5.212-5.218H19.25v-1.374H5.383l5.211-5.219-.969-.969L2.75 11l6.875 6.875Z"
    />
  </svg>
);

export default SvgComponent;
