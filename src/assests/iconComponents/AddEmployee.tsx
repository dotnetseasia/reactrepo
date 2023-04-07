import * as React from "react";
import { SVGProps } from "react";

const SvgAddEmployee = (props: SVGProps<SVGSVGElement>) => (
  <svg
  width="3em"
    height="3em"
    viewBox="0 0 50 59"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <circle cx={18.5} cy={18.5} r={18.5} fill="#FFF7ED" />
    <path
      d="M21.813 40.208a7.687 7.687 0 1 1 7.687-7.687 7.696 7.696 0 0 1-7.688 7.687Zm0-11.958a4.27 4.27 0 1 0 0 8.541 4.27 4.27 0 0 0 0-8.541Zm12.812 29.042v-.855a12.812 12.812 0 0 0-25.625 0v.855a1.708 1.708 0 1 0 3.417 0v-.855a9.396 9.396 0 0 1 18.791 0v.855a1.708 1.708 0 0 0 3.417 0ZM50 48.75a11.958 11.958 0 0 0-19.931-8.912 1.709 1.709 0 1 0 2.279 2.545 8.541 8.541 0 0 1 14.235 6.367 1.708 1.708 0 0 0 3.417 0ZM38.896 33.375a7.688 7.688 0 1 1 7.687-7.688 7.696 7.696 0 0 1-7.687 7.688Zm0-11.958a4.27 4.27 0 1 0 0 8.54 4.27 4.27 0 0 0 0-8.54Z"
      fill="#FCA734"
    />
  </svg>
);

export default SvgAddEmployee;
