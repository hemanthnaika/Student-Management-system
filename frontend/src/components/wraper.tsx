import React from "react";

const Wrapper = ({ children }: { children: React.ReactNode }) => {
  return <div className="px-2 md:px-4 lg:px-8 xl:px-16">{children}</div>;
};

export default Wrapper;
