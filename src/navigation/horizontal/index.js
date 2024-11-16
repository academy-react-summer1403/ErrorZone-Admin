import { Mail, Home, Book } from "react-feather";

export default [
  {
    id: "home",
    title: "Home",
    icon: <Home size={20} />,
    navLink: "/home",
  },
  {
    id: "secondPage",
    title: "Second Page",
    icon: <Mail size={20} />,
    navLink: "/second-page",
  },
  {
    id: "courses",
    title: "لیست دوره ها",
    icon: <Book size={20} />,
    navLink: "/courses",
  },
];
