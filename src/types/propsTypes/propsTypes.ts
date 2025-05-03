
// Import all the necessary dependencies

import React, { ReactNode } from "react";

// socketProvider props define here
export interface SocketProviderProps {
  children: ReactNode;
};

// PageProtector props defind here 
export interface PageProtectorProps {
  children: ReactNode,
}


//PageWrapper component prpos
export interface PageWrapperProps {
  children: ReactNode
}



// Button props
enum Variant {
  "primary",
  "secondary",
  "danger",
  "ternary"
}

export interface ButtonProps {
  text: string,
  type: React.ButtonHTMLAttributes<HTMLButtonElement>['type'],
  onClick: () => {},
  variant: Variant,
  disabled: boolean,
}



// input props 

export interface InputProps {
  placeHolder: React.InputHTMLAttributes<HTMLInputElement>["placeholder"],
  type: React.InputHTMLAttributes<HTMLInputElement>['type'],
  onChange: () => {},
  variant: Variant,
  disabled: boolean,
}

//ComponentForLoginAndResgisterComponentForTop component props
export interface ComponentForLoginAndResgisterComponentForTopProps {
  title: string,
  secondTitle: string,
  path:string,
  name: string,
}