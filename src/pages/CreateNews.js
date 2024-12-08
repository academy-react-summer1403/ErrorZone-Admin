// ** React Imports
import { useRef, useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

// ** Custom Components


// ** Steps



// ** Core Imports


import BreadCrumbs from "../@core/components/breadcrumbs";
import Wizard from "../@core/components/wizard";

import GlobalData from "../@core/components/createNews/GlobalData";
import  {createNews, createNewsAPI}  from "../core/services/Paper";
import { onFormData } from "../utility/hooks/form-data-helper.utils";
import Describe from "../@core/components/createNews/Describe";
import Textarea from "../@core/components/createNews";
import useMutationPost from "../customHook/useMutationPost";

const CreateNewsPage = () => {
  // ** Ref
  const ref = useRef(null);

  // ** State
  const [stepper, setStepper] = useState(null);
  const [files, setFiles] = useState([]);
  const [title, setTitle] = useState();
  const [miniDescribe, setMiniDescribe] = useState();
  const [describe, setDescribe] = useState();
  const [googleTitle, setGoogleTitle] = useState();
  const [googleDescribe, setGoogleDescribe] = useState();
  const [newsCategoryId, setNewsCategoryId] = useState();
  const [keyword, setKeyword] = useState();
  const [isLoading, setLoading] = useState(false);

  // ** Hooks
  const navigate = useNavigate();
  
  
  const onSubmit = async () => {
    const Data = {
      image: files[0],
      title,
      googleTitle,
      googleDescribe,
      miniDescribe,
      describe,
      keyword,
      newsCatregoryId: newsCategoryId,
    };

    try {
      setLoading(true);

      const formData = onFormData(Data);
      const createBlog = await createNewsAPI(formData);

      if (createBlog.success) {
        toast.success("خبر با موفقیت ثبت شد !");

        navigate("/papers");
      } else toast.error(createBlog.message);
    } catch (error) {
      setLoading(false);

      toast.error("مشکلی در ارسال خیر به وجود آمد !");
    } finally {
      setLoading(false);
    }
  };

  const steps = [
    {
      id: "global-data",
      title: "اطلاعات عمومی",
      subtitle: "اطلاعات عمومی خبر",
      content: (
        <GlobalData
          stepper={stepper}
          setTitle={setTitle}
          setGoogleTitle={setGoogleTitle}
          setGoogleDescribe={setGoogleDescribe}
          setMiniDescribe={setMiniDescribe}
          setKeyword={setKeyword}
          setNewsCategoryId={setNewsCategoryId}
          files={files}
          setFiles={setFiles}
        />
      ),
    },
     {
      id: "describe",
       title: "توضیحات",
       subtitle: "توضیحات خبر",
       content: (
          <Describe
            stepper={stepper}
            setDescribe={setDescribe}
            describe={describe}
            onSubmit={onSubmit}
            isLoading={isLoading}
        />
      //  <Textarea />
       ),
     },
  ];
  return (
    <div className="horizontal-wizard">
      <BreadCrumbs
        title="افزودن خبر"
        data={[
          { title: "مدیریت اخبار", links: "/papers" },
          { title: "افزودن خبر" },
        ]}
      />
      <Wizard instance={(el) => setStepper(el)} ref={ref} steps={steps} />
    </div>
  );
};

export default CreateNewsPage