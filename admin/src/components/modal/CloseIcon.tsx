import React from "react";


function CloseIcon(props: any) {
    return <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 50 50"
        width="50"
        height="50"
        {...props}
    >
        <path d="M50 0L0 50" id="line1"
              opacity="1"
              stroke="#999999"
              strokeWidth="4"
              strokeOpacity="1"
        />
        <path d="M0 0L50 50" id="line2"
              opacity="1"
              stroke="#999999"
              strokeWidth="4"
              strokeOpacity="1"/>
    </svg>
}

export default CloseIcon;