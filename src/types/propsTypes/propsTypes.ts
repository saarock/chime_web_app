
// Import all the necessary dependencies

import React, { JSX } from "react";

// socketProvider props define here
export interface SocketProviderProps {
  children: React.ReactNode;
};

// PageProtector props defind here 
export interface PageProtectorProps {
  children: JSX.Element,
}


//PageWrapper component prpos
export interface PageWrapperProps {
  children: React.ReactNode
}



// Button props
export enum Variant {
  primary = "primary",
  secondary = "secondary",
  danger = "danger",
  ternary = "ternary"
}

export interface ButtonProps {
  text: string,
  type?: React.ButtonHTMLAttributes<HTMLButtonElement>['type'],
  onClick: () => void,
  variant?: Variant,
  disabled?: boolean,
}



// input props 

export interface InputProps {
  placeHolder: React.InputHTMLAttributes<HTMLInputElement>["placeholder"],
  type?: React.InputHTMLAttributes<HTMLInputElement>['type'],
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void,
  variant?: Variant,
  disabled?: boolean,
  onMouseEnter? :() => void,
  onMouseLeave?: () => void,
  value?: string,
}

//ComponentForLoginAndResgisterComponentForTop component props
export interface ComponentForLoginAndResgisterComponentForTopProps {
  title: string,
  secondTitle: string,
  path: string,
  name: string,
  LoginWithGoogleComponent: React.FC
}
