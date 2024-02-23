import React, { PropsWithChildren, ReactNode } from "react";

const FormError = ({ children }: PropsWithChildren) => {
  return <p className="mt-1 text-xs text-right text-red-400" role="alert">{children}</p>;
};

export default FormError;
