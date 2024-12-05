

import { Mail, Home, Airplay, Circle, Book , Users , Code, Calendar, MapPin, BookOpen , MessageSquare, MessageCircle, Globe, MoreHorizontal, AlignJustify, Map} from "react-feather";

export default [
  {
    id: "home",
    title: "داشبورد",
    icon: <Home size={20} />,
    navLink: "/home",
  },
  {
    id: "users",
    title: "مدیریت کاربران",
    icon: <Users size={20} />,
    children: [
      {
        title: "لیست کاربران",
        navLink: "/users",
  
        icon: <Circle size={20}/>,
      },
      {
        title: "افزودن کاربر",
        navLink: "/create-user",
     
        icon: <Circle />,
      },
      {
        title: "منتور ها",
        navLink: "/assistancecourse",
        icon: <Circle />,
      }, 
      {
        title: "شغل ها",
        navLink: "/jobs",
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
      id: "buildinglist",
      title: "مدیریت بخش ها",
      icon: <Map size={20} />,
      children: [
       {
        id: "buildinglist",
        title: " ساختمان ها",
        icon: <Circle size={12} />,
        navLink: "/building",
       },
       {
        id: "buildinglist",
        title: " بخش  ها",
        icon: <Circle size={12} />,
        navLink: "/departmemnt",
       },               
      ]
    }, 

    {
      id: "AssistanceworlList",
      title: " تسک ها",
      icon: <Book size={12} />,
      navLink: "/AssistanceWork",
    },  
    
    {
      id: "collection",
      title: " دسته بندی ها",
      icon: <AlignJustify size={20} />,
      children: [  
        {
          title: " تکنولوژی ها",
          navLink: "/technologhy",
          icon: <Circle />,
        },
      ]    
    },

    {
      id: "courses",
      title: "مدیریت دوره ها",
      icon: <Code size={20} />,
      children: [
  {
    id: "courses",
    title: "لیست دوره ها",
    icon: <Book size={20} />,
    navLink: "/courses",
    icon: <Circle />,    
  },      {
    title: "دوره های رزرو شده",
    navLink: "/coursereserved",
    icon: <Circle />,
  },
  {

    title: "دوره های من",
    navLink: "/mycourses",
    icon: <Circle />,
  },
  {
    title: "افزودن دوره",
    navLink: "/createcourse",
    icon: <Circle />,
  }, 
  {
    title: "پرداختی ها",
    navLink: "/coursepayment",
    icon: <Circle />,
  },       
   {
    title: "گروه های دوره",
    navLink: "/coursegroups",
    icon: <Circle />,
  },
  {
    title: "افزودن گروه دوره",
    navLink: "/createcoursegroup",
    icon: <Circle />,
  },
  {
    title: "کامنت های دوره",
    navLink: "/coursecomments",
    icon: <Circle />,
  }, 
   {
    title: "کلاس ها",
    navLink: "/classes",
    icon: <Circle />,
  },  
   {
    title: "ترم ها",
    navLink: "/terms",
    icon: <Circle />,
  },
   {
    title: "سطح بندی دوره",
    navLink: "/courselevel",
    icon: <Circle />,
  },
   {
    title: " وضعیت دوره",
    navLink: "/coursestatus",
    icon: <Circle />,
  },        

      ]
    },
    {
      id: "schedual",
      title: "زمان بندی",
      icon: <Calendar size={20} />,
      children: [
        {
          id: "adminSheduals",
          title: "زمان بندی ادمین ها",
          icon: <Circle size={12} />,
          navLink: "/admin-schedual",
        },      
        {
          id: "adminSheduals",
          title: "زمان بندی اساتید",
          icon: <Circle size={12} />,
          navLink: "/teacher-schedual",
        },          
      ],
    },

  {
    title: "تقویم",
    navLink: "/calendar",
    icon: <Calendar />,
  },  
  {
    title: "گروه اجتماعی ",
    navLink: "/socialgrouop",
    icon: <Globe />,
  },      
   
    {
    id: "chat",
    title: "چت",
    icon: <MessageSquare size={20} />,
    navLink: "/chat",
  },


];
