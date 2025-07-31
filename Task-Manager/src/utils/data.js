import {
    LuLayoutDashboard,
    LuUsers,
    LuClipboardCheck,
    LuSquarePlus,
    LuLogOut,
} from "react-icons/lu";

export const SIDE_MENU_DATA = [
    {
        id: "01",
        label: "Panel de Control",
        icon: LuLayoutDashboard,
        path: "/admin/dashboard"
    },
    {
        id: "02",
        label: "Gestionar Tareas",
        icon: LuClipboardCheck,
        path: "/admin/tasks"
    },
    {
        id: "03",
        label: "Crear Tarea",
        icon: LuSquarePlus,
        path: "/admin/create-task"
    },
    {
        id: "04",
        label: "Miembros del Equipo",
        icon: LuUsers,
        path: "/admin/users"
    },
    {
        id: "05",
        label: "Cerrar Sesión",
        icon: LuLogOut,
        path: "logout"
    },

];

export const SIDE_MENU_USER_DATA = [
    {
        id: "01",
        label: "Panel de Control",
        icon: LuLayoutDashboard,
        path: "/user/dashboard"
    },
    {
        id: "02",
        label: "Mis Tareas",
        icon: LuClipboardCheck,
        path: "/user/tasks"
    },
     {
        id: "05",
        label: "Cerrar Sesión",
        icon: LuLogOut,
        path: "logout"
    },
];

export const PRIORITY_DATA = [
    { label: "Low", value: "Low"},
    { label: "Medium", value: "Medium"},
    { label: "High", value: "High"},
];

export const STATUS_DATA = [
    { label: "Pending", value: "Pending"},
    { label: "In Progress", value: "In Progress"},
    { label: "Completed", value: "Completed"},
];

