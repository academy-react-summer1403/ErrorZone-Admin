import {
  Col, 
  Row,
} from "reactstrap";
import { onDashboardReportChange } from "../redux/dashboardReport";
import { useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import ChartJS from "../@core/components/ChartjsDoughnutChart";
import { dashboardReportAPI } from "../core/services/Paper";
import CardMedal from "../@core/components/cardMedal/cardMedal";
import StatsCard from "../@core/components/StatsCard";

const Home = () => {
  const [dashboardReport, setDashboardReport] = useState();

  // ** Hooks
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchDashboardReport = async () => {
      try {
        const getDashboardReport = await dashboardReportAPI();

        dispatch(onDashboardReportChange(getDashboardReport));
        setDashboardReport(getDashboardReport);
      } catch (error) {
        toast.error("مشکلی در دریافت اطلاعات داشبورد به وجود آمد !");
      }
    };

    fetchDashboardReport();
  }, []);


  return (
    <div>
    <div id="dashboard-ecommerce">
      <Row className="match-height">
        <Col xl="4" md="6" xs="12">
          <CardMedal dashboardData={dashboardReport} />
        </Col>
        <Col xl="8" md="6" xs="12">
          <StatsCard
            cols={{ xl: "3", sm: "6" }}
            dashboardData={dashboardReport}
          />
        </Col>
      </Row>
      <Row className="match-height dashboard-chart-box-wrapper">
        <ChartJS />
      </Row>
    </div>
    </div>
  );
};

export default Home;
