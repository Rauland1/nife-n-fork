export const API_HEADERS = {
  "x-api-key": process.env.NEXT_PUBLIC_X_API_KEY,
  "x-rapidapi-host": process.env.NEXT_PUBLIC_X_RAPIDAPI_HOST,
  "x-rapidapi-key": process.env.NEXT_PUBLIC_X_RAPIDAPI_KEY,
};

export const LINKS = [
  { name: "Home", path: "/", btn: false, onMobile: true, onDesktop: true },
  {
    name: "Restaurants",
    path: "/restaurants",
    btn: false,
    onMobile: true,
    onDesktop: true,
  },
  {
    name: "Sign In",
    path: "/api/auth/login",
    btn: true,
    onMobile: true,
    onDesktop: true,
  },
];

export const USER_LINKS = [
  { name: "Home", path: "/", btn: false, onMobile: true, onDesktop: true },
  {
    name: "Restaurants",
    path: "/restaurants",
    btn: false,
    onMobile: false,
    onDesktop: true,
  },
  {
    name: "Profile",
    path: "/profile",
    btn: true,
    onMobile: true,
    onDesktop: true,
  },
  {
    name: "Log Out",
    path: "/api/auth/logout",
    btn: false,
    onMobile: true,
    onDesktop: false,
  },
];
