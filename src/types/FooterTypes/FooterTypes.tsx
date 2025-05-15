import React from "react";

// Footer propsType
// export interface SimpleFooterProps {
//   companyName?: string;
//   companyDescription?: string;
//   socialLinks?: { name: string; url: string; icon: React.ReactNode }[];
// }

export type SimpleFooterProps = {
    companyName?: string,
    companyDescription: string,
    socialLinks?: { name: string; url: string; icon: React.ReactNode }[],
}


