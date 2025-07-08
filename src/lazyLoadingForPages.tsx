// Import all the necessary dependencies here
import React, {  } from "react";

// Lazy load non-protected page
export const HomePage = React.lazy(() =>
  import("./pages/nonProtectedIndex").then((module) => ({
    default: module.default.Home,
  })),
);
export const LoginPage = React.lazy(() =>
  import("./pages/nonProtectedIndex").then((module) => ({
    default: module.default.LoginPage,
  })),
);

export const ContactPage = React.lazy(() =>
  import("./pages/nonProtectedIndex").then((module) => ({
    default: module.default.ContactPage,
  })),
);

// Lazy loading protected page
// const ChatsPage = React.lazy(() =>
//   import("./pages/protectedIndex").then((module) => ({
//     default: module.default.ChatsPage,
//   })),
// );
export const ChimeProfilePage = React.lazy(() =>
  import("./pages/protectedIndex").then((module) => ({
    default: module.default.ChimeProfilePage,
  })),
);
export const VideoCallPage = React.lazy(() =>
  import("./pages/protectedIndex").then((module) => ({
    default: module.default.VideoCallPage,
  })),
);

export const NotFound = React.lazy(() =>
  import("./pages/FallBackIndex").then((module) => ({
    default: module.default.NotFound,
  })),
);
