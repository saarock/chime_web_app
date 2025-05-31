// Import all the necessary dependencies

import React, { JSX, ReactNode } from "react";

// socketProvider props define here
export interface SocketProviderProps {
  children: React.ReactNode;
}

// PageProtector props defind here
export interface PageProtectorProps {
  children: JSX.Element;
}

//PageWrapper component prpos
export interface PageWrapperProps {
  children: React.ReactNode;
}

// Button props
export enum Variant {
  primary = "primary",
  secondary = "secondary",
  danger = "danger",
  ternary = "ternary",
  outline = "outline",
}

export interface ButtonProps {
  text?: string;
  type?: React.ButtonHTMLAttributes<HTMLButtonElement>["type"];
  onClick: () => void;
  variant?: Variant;
  disabled?: boolean;
  children?: ReactNode; // specially for icons
  className?: string;
  style?: React.CSSProperties
}

// input props

export interface InputProps {
  placeholder: React.InputHTMLAttributes<HTMLInputElement>["placeholder"];
  type?: React.InputHTMLAttributes<HTMLInputElement>["type"];
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  variant?: Variant;
  disabled?: boolean;
  onMouseEnter?: () => void;
  onMouseLeave?: () => void;
  value?: string;
  className?: string;
  id: string;
}

//ComponentForLoginAndResgisterComponentForTop component props
export interface ComponentForLoginAndResgisterComponentForTopProps {
  title: string;
  secondTitle: string;
  path: string;
  name: string;
  LoginWithGoogleComponent: React.ComponentType;
}
