import * as React from "react"

function ArrowIcon(props: any) {
  return (
    <svg
      width={22 * 1.2}
      height={22 * 1.2}
      viewBox="0 0 22 17"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <g opacity={0.55}>
        <path
          d="M14 1l7 7.5-7 7.5"
          stroke="#fff"
          strokeWidth={0.5}
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M.25 8.25h20.5a.25.25 0 110 .5H.25a.25.25 0 010-.5z"
          fill="#fff"
        />
      </g>
    </svg>
  )
}

export default ArrowIcon
