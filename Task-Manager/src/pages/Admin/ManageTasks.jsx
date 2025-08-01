import React, { useEffect, useState } from 'react'
import DashboardLayout from '../../components/layouts/DashboardLayout'
import { useNavigate } from 'react-router-dom';
import axiosInstance from '../../utils/axiosInstance';
import { API_PATHS } from '../../utils/apiPaths';
import { LuFileSpreadsheet } from 'react-icons/lu';
import TaskStatusTabs from '../../components/layouts/TaskStatusTabs';

const ManageTasks = () => {
  const [allTasks, setAllTasks] = useState([]);

  const [tabs, setTabs] = useState([]);
  const [filterStatus, serFilterStatus] = useState("All")

  const navigate = useNavigate();

  const getAllTasks = async () => {
    try {
      const response = await axiosInstance.get(API_PATHS.TASK.GET_ALL_TASKS, {
        params: {
          status: filterStatus === "All" ? "" : filterStatus
        }
      })

      setAllTasks(response.data?.tasks?.length > 0 ? response.data.tasks : []);
      
      const statusSummary = response.data?.statusSummary || {};

      const statusArray = [
        {label: "All", count: statusSummary.all || 0 },
        {label: "Pending", count: statusSummary.pendingTasks || 0 },
        {label: "In Progress", count: statusSummary.inProgressTasks || 0 },
        {label: "Completed", count: statusSummary.completedTasks || 0 },
      ]

      setTabs(statusArray);
    
    } catch (error) {
      console.error["Error al conectar con los usuarios:", error]
    }
  }

  const handleClick = (taskData) => {
    navigate(`/admin/create-task`, { state: {taskId: taskData._id}})
  }

  //download reporte de la tarea
  const handleDownLoadReport = async () => {

  }

  useEffect(() => {
    getAllTasks(filterStatus);
    return () => {}
  }, [filterStatus]);


  return (
    <DashboardLayout activeMenu="Manage Tasks">
        <div className="my-5">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between">
            <div className="flex items-center justify-between gap-3">
              <h2 className="text-xl md:text-xl font-medium">Mis Tareas</h2>

              <button
              className="flex lg:hidden download-btn"
              onClick={handleDownLoadReport}
              >
                <LuFileSpreadsheet className="text-lg" />
                Descargar Reporte
              </button>
            </div>

            {allTasks?.length > 0 && (
              <div className="flex items-center gap-3">
                  <TaskStatusTabs
                  tabs={tabs}
                  activeTab={filterStatus}
                  setActiveTab={serFilterStatus}
                  />

                  <button
                  className="hidden lg:flex download-btn" onClick={handleDownLoadReport}
                  >
                    <LuFileSpreadsheet className="text-lg" />
                    Descargar Reporte
                  </button>
              </div>
            )}

          </div>
        </div>
    </DashboardLayout>
  )
}

export default ManageTasks