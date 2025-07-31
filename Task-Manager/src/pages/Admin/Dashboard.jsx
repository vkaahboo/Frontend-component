import React, { useEffect, useState } from 'react'
import { useUserAuth } from "../../hooks/useUserAuth"
import { useContext } from 'react'
import { UserContext } from '../../context/userContext'
import DashboardLayout from '../../components/layouts/DashboardLayout'
import { useNavigate } from 'react-router-dom'
import axiosInstance from '../../utils/axiosInstance'
import { API_PATHS } from '../../utils/apiPaths'
import moment from 'moment'


const Dashboard = () => {
  useUserAuth();

  const {user} = useContext(UserContext)

  const navigate = useNavigate();

  const [dashboardData, setDashboardData] = useState(null);
  const [pieChartData, setPieChartData] = useState([]);
  const [barChartData, setBarChartData] = useState([]);

  const getDashboardData = async () => {
    try {
      const response = await axiosInstance.get(
        API_PATHS.TASK.GET_DASHBOARD_DATA
      );
      if(response.data){
        setDashboardData(response.data);
      }
    } catch (error) {
      console.error("Error al recuperar los usuarios:", error);
    }
  };


  useEffect(() => {
    getDashboardData();

    return () => {}
  }, []);
  

  return <DashboardLayout activeMenu="Dashboard">
    <div className="card my-5">
      <div>
        <div className="col-span-3">
          <h2 className="text-xl md:text-2xl">¡Buenos dias! {user?.name}</h2>
          <p className="text-xs md:text-[13px] text-gray-400 mt-1.5">
            {moment().format("dddd do MM YYYY")}
          </p>
        </div>
      </div>
    </div>
    </DashboardLayout>

}

export default Dashboard