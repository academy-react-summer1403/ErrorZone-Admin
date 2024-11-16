
import { Mail, Home, Airplay, Circle, Book  } from "react-feather";


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

    id: "smaplePage",
    title: "مدیریت اخبار و مقالات",
    icon: <Airplay size={20} />,
    // navLink: "/sample",
    children: [
      {
        id: "invoiceList",
        title: "لیست اخبار ومقالات",
        icon: <Circle size={12} />,
        navLink: "/papers",
      },
      {
        id: "invoiceList",
        title: "افزودن اخبار و مقالات",
        icon: <Circle size={12} />,
        navLink: "/createPapers",
      },
    ],


  },
    {id: "courses",
    title: "لیست دوره ها",
    icon: <Book size={20} />,
    navLink: "/courses",
    },

];
