// ** React Imports
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

// ** Reactstrap Imports
import { Card } from "reactstrap";

// ** Core Imports


// ** Columns


// ** Custom Components
import BreadCrumbs from "../@core/components/breadcrumbs";
import useQueryGet from "../customHook/useQueryGet";
import { getNewsCategoryListsAPI } from "../core/services/Paper";
import CategoriesTable from "../@core/components/categories/CategoriesTable";
import { CATEGORY_COLUMNS } from "../@core/components/categories/categories-columns";


const CategoriesPage = () => {
  // ** States
  const [categories, setCategories] = useState([]);

//   const { getCategories } = useQueryGet(
//     ["category"] , '/News/GetListNewsCategory'
    
//   )

//   console.log('1222222333' , getCategories)

   useEffect(() => {
     const fetchCategories = async () => {
       try {
         const getCategories = await getNewsCategoryListsAPI();
         console.log('12333221' , getCategories)
         setCategories(getCategories);
       } catch (error) {
         toast.error("مشکلی در دریافت دسته بندی ها به وجود آمد !");
       }
     };

     fetchCategories();
   }, []);

  return (
    <div>
      <BreadCrumbs
        title="لیست دسته بندی ها"
        data={[
          { title: "لیست اخبار", link: "/news" },
          { title: "مدیریت دسته بندی ها" },
        ]}
      />
      <Card className="rounded">
        <CategoriesTable data={categories} columns={CATEGORY_COLUMNS} />
      </Card>
    </div>
  );
};

export default CategoriesPage;
