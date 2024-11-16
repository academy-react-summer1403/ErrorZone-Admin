import { Col, Row } from "reactstrap";
import NewsInfoCard from "./NewsInfoCard";
import NewsTabs from "./Tabs";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import CourseComs from "./Commentts";
import EditBlog from "./EditBlog";
import { activeNews, getNewsDet, getNewsRep } from "../../../core/services/detailNews";

const NewsView = () => {

  const { id } = useParams();

  const [active, setActive] = useState("1");
  const [newsDet, setNewsDet] = useState([]);
  const [newsCom, setNewsCom] = useState([]);
  const [repCom, setRepCom] = useState([]);
  const [editModal, setEditModal] = useState(false);
  const [refetchEdit, setRefetchEdit] = useState(false);


  const toggleTab = (tab) => {
    if (active !== tab) {
      setActive(tab);
    }
  };

  const NewsById = async () => {
    try {
      const responses = await getNewsDet(id);
      setNewsDet(responses.detailsNewsDto);
      setNewsCom(responses.commentDtos);
    } catch (error) {
      throw new Error("ERROR: ", error);
    }
  };



  const NewsRepById = async (comId) => {
    try {
      const responses = await getNewsRep(comId);
      setRepCom(responses);
    } catch (error) {
      throw new Error("ERROR: ", error);
    }
  };

  

  const activeOrDeactive = async () => {
    try {
      const dataa = { Active: newsDet.active , Id: id };
      const data =new FormData();
      const keys = Object.keys(dataa);
      keys.forEach((key) => {
        const item = dataa[key];
        data.append(key, item);
      });
    

      const responses = await activeNews(data);
    } catch (error) {
      throw new Error("ERROR: ", error);
    }
  };

  useEffect(() => {
    NewsById();
  }, [refetchEdit]);


  const toggle = () => setEditModal(!editModal);
  return (
    <div className="app-user-view ">
      <Row>
        <Col xl="4" lg="5" xs={{ order: 1 }} md={{ order: 0, size: 5 }}>
          <NewsInfoCard
            newsDet={newsDet}
            setEditModal={setEditModal}
            activeOrDeactive={activeOrDeactive}
          />
        </Col>
        <Col xl="8" lg="7" xs={{ order: 0 }} md={{ order: 1, size: 7 }}>
          <CourseComs
            newsCom={newsCom}
            NewsRepById={NewsRepById}
            repCom={repCom}
          />
        </Col>
      </Row>
      <EditBlog
        isOpen={editModal}
        toggle={toggle}
        blogId={newsDet?.id}
        setRefetchEdit={setRefetchEdit}
      />
    </div>
  );
};
export default NewsView;