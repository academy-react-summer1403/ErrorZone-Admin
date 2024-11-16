
import { Mail, Home, Airplay, Circle, Book , Users} from "react-feather";


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
    id: "users",
    title: "مدیریت کاربران",
    icon: <Users size={20} />,
    children: [
      {
        title: "لیست کاربران",
        navLink: "/users",
  
        icon: <Circle />,
      },
      {
        title: "افزودن کاربر",
        navLink: "/create-user",
     
        icon: <Circle />,
      },
    ],
  },

  {
    id: "smaplePage",
    title: "مدیریت اخبار و مقالات",
    icon: <Airplay size={20} />,
    // navLink: "/sample",
    children: [
      {
        id: "newsList",
        title: "لیست اخبار ومقالات",
        icon: <Circle size={12} />,
        navLink: "/papers",
      },
      {
        id: "createNews",
        title: "افزودن اخبار و مقالات",
        icon: <Circle size={12} />,
        navLink: "/createPapers",
      },   
      {
        id: "NewsCategory",
        title: "لیست دسته بندی ها",
        icon: <Circle size={12} />,
        navLink: "/newsCategory",
      },
      
      {
        id: "crfeateCategory",
        title: "افزودن دسته بندی ",
        icon: <Circle size={12} />,
        navLink: "/create-category",
      },      
      
    ],
  },


    {
      id: "commentslist",
      title: "مدیریت کامنت ها",
      icon: <Book size={12} />,
      navLink: "/comments",
    },



  {
    id: "courses",
    title: "لیست دوره ها",
    icon: <Book size={20} />,
    navLink: "/courses",
  },

];
