import React, { ReactNode } from "react";

interface Props {
    children?: ReactNode;
    onClick?: any;
}

export default function Button({ children, onClick } : Props) {
  const styles = "px-4 py-2 rounded-md font-medium transition-all bg-blue-500 text-white hover:bg-blue-700";

  return (
    <button onClick={() => onClick()} className={styles}>
      {children}
    </button>
  );
}
