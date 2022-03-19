import * as React from "react"

function SearchIcon(props: any) {
  return (
    <svg
      width={14}
      height={14}
      viewBox="0 0 14 14"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M9.04 5c0 2.205-1.796 4-4.02 4C2.796 9 1 7.205 1 5s1.796-4 4.02-4c2.224 0 4.02 1.795 4.02 4zM8.031 8l5.02 5"
        stroke="#fff"
        strokeOpacity={0.85}
        strokeWidth={2}
      />
    </svg>
  )
}

export default SearchIcon;
