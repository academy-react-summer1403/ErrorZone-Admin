import {
  Col, 
  Row,
} from "reactstrap";
import { useContext } from 'react'
import { onDashboardReportChange } from "../redux/dashboardReport";
import { useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import ChartJS from "../@core/components/ChartjsDoughnutChart";
import { dashboardReportAPI } from "../core/services/Paper";
import CardMedal from "../@core/components/cardMedal/cardMedal";
import StatsCard from "../@core/components/StatsCard";
import CardProfile from "../@core/components/CardProfile/CardProfile";
import { ThemeColors } from '@src/utility/context/ThemeColors'
import RevenueReport from "../@core/components/RevenuReport/RevenuReport";

const Home = () => {
  const [dashboardReport, setDashboardReport] = useState();

  const { colors } = useContext(ThemeColors)

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
    <div>

      <Row>
        <CardProfile />
        
      </Row>

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
        
      <Row >
           <RevenueReport  primary={colors.primary.main} warning={colors.warning.main}/>
      </Row>
    </div>
    </div>
  );
};

export default Home;
