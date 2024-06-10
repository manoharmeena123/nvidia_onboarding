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
      d="m12.375 4.125-.983.958 5.211 5.23H2.75v1.374h13.853l-5.211 5.207.983.981L19.25 11l-6.875-6.875Z"
    />
  </svg>
);

export default SvgComponent;
