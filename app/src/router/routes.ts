// ROUTE NAMES

export const ROUTES = {
  ROOT: "",
  APP: "/app",
  // App pública
  PUBLIC: "",
  HOME: "",
  // App privada
  PRIVATE: "admin",
  DASHBOARD: "",
  // Common routes
  FAMILY: "family",
  SPECIES: "species",
  SPECIMEN: "specimen",

  // Auth
  AUTH: "/app/auth",
  REGISTER: "register",
  LOGIN: "login",
  LOGOUT: "logout",
  CONFIRM_EMAIL_REQUIRED: "email-confirmation-required",
  CONFIRM_EMAIL: "confirm-email/:token",

  // 404 Error
  ELSE: "*",

  // Test
  TEST: "/test",
};
