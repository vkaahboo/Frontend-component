export const BASE_URL = "http://localhost:8000";

export const API_PATHS = {

    AUTH: {
        //registro de nuevo usuario
        REGISTER: "/api/auth/register",
        //login con la autenticacion del token
        LOGIN: "/api/auth/login",
        //logeado obtengo detalles user
        GET_PROFILE: "api/auth/profile"
    },

    USERS: {
        //get todos los user solo admin
        GET_ALL_USERS: "/api/users",
        //get user por el id
        GET_USER_BY_ID: (userId) => `/api/users/${userId}`,
        //crea un user pero solo el admin
        CREATE_USER: "/api/users",
        //actualizacion detalles user
        UPDATE_USER: (userId) => `/api/users/${userId}`,
        //eliminar user
        DELETE_USER: (userId) => `/api/users/${userId}`,
    },

    TASK: {
        //get dashboard data
        GET_DASHBOARD_DATA:"/api/tasks/dashboard-data",
        //get user dashboard data
        GET_USER_DASHBOARD_DATA:"/api/tasks/user-dashboard-data",
        //get todas las task, el admin todas, el user solo las que tiene asignada
        GET_ALL_TASKS:"/api/tasks",
        //get task con id
        GET_TASK_BY_ID: (taskId) => `/api/tasks/${taskId}`,
        //crea task solo admin
        CEATE_TASKS:"/api/tasks",
        //actualizar la task
        UPDATE_TASKS: (taskId) => `/api/tasks/${taskId}`,
        //eliminar la task
        DELETE_TASKS: (taskId) => `/api/tasks/${taskId}`,

        //actualiza el estado de la task
        UPDATE_TASK_STATUS: (taskId) => `/api/tasks/${taskId}/status`,
        //actualiza el progreso de la task
        UPDATE_TODO_CHECKLIST: (taskId) => `/api/tasks/${taskId}/todo`,
    },

    REPORTS: {
        //descarga todas las task en excel
        EXPORT_TASKS: "/api/reports/export/tasks",
        //descarga todas el reporte de los users
        EXPORT_USERS: "/api/reports/export/users"
    },

    IMAGE: {
        UPLOAD_IMAGE: "/api/auth/upload-image",
    }

}