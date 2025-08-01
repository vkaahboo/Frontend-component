import React, { useState } from 'react'
import DashboardLayout from '../../components/layouts/DashboardLayout'
import { PRIORITY_DATA } from '../../utils/data'
import axiosInstance from '../../utils/axiosInstance'
import { API_PATHS } from '../../utils/apiPaths'
import toast from "react-hot-toast"
import { useLocation, useNavigate } from 'react-router-dom'
import moment from "moment"
import { LuTrash2 } from 'react-icons/lu'
import SelectDropdown from '../../components/inputs/SelectDropdown'
import SelectUsers from '../../components/inputs/SelectUsers'
import TodoListInput from '../../components/inputs/TodoListInput'
import AddAttachmentsInput from '../../components/inputs/AddAttachmentsInput'


const CreateTask = () => {
  const location = useLocation();
  const { taskId } = location.state || {};
  const navigate = useNavigate();

  const [ taskData, setTaskData] = useState({
    title:"",
    description: "",
    priority: "Low",
    dueDate: "",
    assignedTo: [],
    todoCheckList: [],
    attachments: [],
  });

  const [currentTask, setCurrentTask] = useState(null);

  const[error, setError] = useState("");
  const[loading, setLoading] = useState(false);

  const[openDeleteAlert, setOpenDeleteAlert] = useState(false)

  const handleValueChange = (key,value) => {
    setTaskData((prevData) =>({ ...prevData, [key]: value }));
  };

  //resetea el form
  const clearData = () => {
    setTaskData({
      title:"",
      description:"",
      priority:"Low",
      dueDate: "",
      assignedTo: [],
      todoCheckList: [],
      attachments: [],
    });
  };

  //crear task
  const createTask = async () => {

    setLoading(true);
    try {
      const todoList = taskData.todoCheckList?.map((item) => ({
        text: item,
        completed: false,
      }))

      const response = await axiosInstance.post(API_PATHS.TASK.CEATE_TASKS, {
        ...taskData,
        dueDate: new Date(taskData.dueDate).toISOString(),
        todoCheckList: todoList,
      });

      toast.success("Tarea creada correctamente")

      clearData();
    } catch (error) {
      console.error("Error al crear la tarea:", error);
      setLoading(false)
    } finally {
      setLoading(false)
    }
  }

  //actualiza task
  const updateTask = async () => {
    try {
      
    } catch (error) {
      
    }
  }


  const handleSubmit = async () => {
    setError(null);

    //input de validacion
    if(!taskData.title.trim()) {
      setError("Titulo es requerido");
      return;
    }

    if(!taskData.description.trim()) {
      setError("Descripción es requerido");
      return;
    }

    if(!taskData.dueDate) {
      setError("Fecha es requerido");
      return;
    }

    if(taskData.assignedTo?.length === 0) {
      setError("La tarea no esta asignado a ningun miembro");
      return;
    }

    if(taskData.todoCheckList?.length === 0) {
      setError("Add agregar que hacer a la tarea");
      return;
    }

    if(taskId) {
      updateTask();
      return;
    }

    createTask();

  }

  //obtener task por ID
  const getTaskDetailsById = async () => {
    try {
      
    } catch (error) {
      
    }
  }

  //eliminartask
  const deleteTask = async () => {
    try {
      
    } catch (error) {
      
    }
  }


  return (
    <DashboardLayout activeMenu="Create Task">
      <div className="mt-5">
        <div className="grid grid-cols-1 md:grid-cols-4 mt-4">
          <div className="form-card col-span-3">
            <div className="flex items-center justify-between">
              <h2 className="text-xl md:text-xl font-medium">
                {taskId? "Update Task" : "Create Task"}
              </h2>

              <button
              className="flex items-center gap-1.5 text-[13px] font-medium text-rose-500 bg-rose-50 rounded px-2 py-1 border border-rose100 hover:border-rose-300 cursor-pointer"
              onClick={() => setOpenDeleteAlert(true)}
              >
                <LuTrash2 className="text-base" /> Eliminar
              </button>
            </div>
              
            <div className="mt-4">
                <label
                className="text-xs font-medium text-slate-600">
                  Titulo de Tarea
                </label>

                <input
                placeholder="Crear una tarea"
                className="form-input"
                value={taskData.title}
                onChange={({ target }) =>
                handleValueChange("title", target.value)
              }
                />
            </div>

              <div className="mt-3">
                <label
                className="text-xs font-medium text-slate-600"
                >
                  Descripción
                </label>

                <textarea
                className="form-input"
                placeholder='Describe la Tarea'
                rows={4}
                value={taskData.description}
                onChange={({target}) =>
                  handleValueChange("description", target.value)
                }
                ></textarea>
              </div>

              <div className="grid grid-cols-12 gap-4 mt-2">
                <div className="col-span-6 md:col-span-4">
                  <label
                  className="text-xs font-medium text-slate-600"
                  >
                    Prioridad
                  </label>

                  <SelectDropdown
                  options={PRIORITY_DATA}
                  value={taskData.priority}
                  onChange={(value) => handleValueChange("priority", value)}
                  placeholder="Seleccionar prioridad"
                  />
                </div>

                <div className="col-span-6 md:col-span-4">
                  <label
                  className="text-xs font-medium text-slate-600"
                  >
                    Fecha de vencimiento
                  </label>

                  <input
                  className="form-input"
                  placeholder='Tarea'
                  value={taskData.dueDate}
                  onChange={({ target}) =>
                    handleValueChange("dueDate", target.value)
                  }
                  type="date"
                  />
                </div>

                  <div className="col-span-12 md:col-span-3">
                    <label className="text-xs font-medium text-slate-600">
                      Asignar tarea a:
                    </label>

                    <SelectUsers
                    selectedUsers={taskData.assignedTo}
                    setSelectedUsers={(value) => {
                      handleValueChange("assignedTo", value);
                    }}
                  />
                  </div>

              </div>

                  <div className="mt-3">
                    <label className="text-xs font-medium text-slate-600">
                      Lista de tarea
                    </label>

                    <TodoListInput
                    todoList={taskData?.todoCheckList}
                    setTodoList={(value) =>
                      handleValueChange("todoCheckList", value)
                    }
                    />
                  </div>

                  <div className="mt-3">
                    <label className="text-xs font-medium text-slate-600">
                      Añadir archivos
                    </label>

                    <AddAttachmentsInput
                    attachments={taskData?.attachments}
                    setAttachments={(value) =>
                      handleValueChange("attachments", value)
                    }
                    />
                  </div>

                  {error && (
                    <p className="text-xs font-medium text-red-500 mt-5">{error}</p>
                  )}

                  <div className="flex justify-end mt-7">
                    <button
                    className="add-btn"
                    onClick={handleSubmit}
                    disabled={loading}
                    >
                      {taskId ? "ACTUALIZAR TAREA" : "CREAR TAREA"}
                    </button>
                  </div>

          </div>
        </div>
      </div>
    </DashboardLayout>
  )
}

export default CreateTask