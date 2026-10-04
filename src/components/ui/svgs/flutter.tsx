import type { SVGProps } from "react";

const Flutter = (props: SVGProps<SVGSVGElement>) => (
  <svg xmlns="http://w3.org" viewBox="0 0 128 128" {...props}>
    <g fill="none" fillRule="evenodd">
      {/* Top smaller diamond */}
      <path 
        fill="#47C5FB" 
        d="m84.7 13.5-31 31 18.5 18.5 43.5-43.5z" 
      />
      {/* Middle lower diamond */}
      <path 
        fill="#47C5FB" 
        d="m53.7 44.5-43.5 43.5 18.5 18.5 62-62z" 
      />
      {/* Bottom dark blue diamond intersection */}
      <path 
        fill="#00569E" 
        d="m72.2 63-18.5 18.5 18.5 18.5 31-31z" 
      />
      {/* Lower right overlay diamond */}
      <path 
        fill="#0175C2" 
        d="m72.2 100 18.5 18.5h31l-31-31z" 
      />
    </g>
  </svg>
);

export { Flutter };
