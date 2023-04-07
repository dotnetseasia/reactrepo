import * as React from "react";
import { SVGProps } from "react";

const SvgAddRole = (props: SVGProps<SVGSVGElement>) => (
  <svg
  width="3em"
    height="3em"
    viewBox="0 0 53 51"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <circle cx={18.5} cy={18.5} r={18.5} fill="#F6F5FF" />
    <path
      d="M51.458 30.958h-3.083v-3.083a1.542 1.542 0 1 0-3.083 0v3.083h-3.084a1.542 1.542 0 0 0 0 3.084h3.084v3.083a1.542 1.542 0 1 0 3.083 0v-3.083h3.083a1.542 1.542 0 0 0 0-3.084ZM29.875 32.5a9.25 9.25 0 1 0-9.25-9.25 9.26 9.26 0 0 0 9.25 9.25Zm0-15.417a6.167 6.167 0 1 1 0 12.333 6.167 6.167 0 0 1 0-12.333ZM29.875 35.583A13.89 13.89 0 0 0 16 49.458a1.542 1.542 0 0 0 3.083 0 10.792 10.792 0 0 1 21.584 0 1.542 1.542 0 0 0 3.083 0 13.89 13.89 0 0 0-13.875-13.875Z"
      fill="currentColor"
    />
  </svg>
);

export default SvgAddRole;
