import React from "react";

export const Rectangle: React.FC<{ height?: number, width?: number }> = (props) => {
  return <div style={{ height: props.height, width: props.width }} />;
}
