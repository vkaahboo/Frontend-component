import React, { useContext, useState } from 'react'
import AuthLayout from '../../components/layouts/AuthLayout'
import {Link, useNavigate} from 'react-router-dom'
import Input from '../../components/inputs/input';
import { validateEmail } from '../../utils/helper';
import axiosInstance from '../../utils/axiosInstance';
import { API_PATHS } from '../../utils/apiPaths';
import { UserContext } from '../../context/userContext';

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);


  const {updateUser} = useContext(UserContext)
  const navigate = useNavigate();

  //Formulario de inicio de sesión del usuario
  const handleLogin = async (e) => {
    e.preventDefault();

    if(!validateEmail(email)){
      setError("Por favor introduce un correo electrónico válido");
      return;
    }

    if(!password) {
      setError("Por favor introduce la contraseña");
      return;
    }

    setError("");

    //Api Call de login
    try {
      const response = await axiosInstance.post(API_PATHS.AUTH.LOGIN, {
        email,
        password
      });

      const  {token, role} = response.data;

      if(token){
        localStorage.setItem("token", token)
        updateUser(response.data)

        //redirecciona segun el role
        if(role === "admin") {
          navigate("/admin/dashboard");
        } else {
          navigate("/user/dashboard")
        }
      };


    } catch (error) {
      if(error.response && error.response.data.message){
        setError(error.response.data.message)
      } else {
        setError("ALgo ha fallado. Intente de nuevo")
      }
    }

  }

  return <AuthLayout>
    <div className="lg:w-[70%] h-3/4 md:h-full flex flex-col justify-center">
      <h3 className="text-xl font-semibold text-black">Bienvenido de nuevo!</h3>
      <p className="text-xs text-slate-700 mt-[5px] mb-6">
        Por favor introduce tus datos para logearte
      </p>

      <form onSubmit={handleLogin}>
        <Input
          value={email}
          onChange={({ target}) => setEmail(target.value)}
          label="Correo Electronico"
          placeholder="jhon@example.com"
          type="text"
        />

        <Input
          value={password}
          onChange={({ target}) => setPassword(target.value)}
          label="Contraseña"
          placeholder="Min 8 Caracteres"
          type="password"
        />

        {error && <p className="text-red-500 text-xs pb-2.5">{error}</p>}

        <button type="submit" className="btn-primary">
          Iniciar Sesion
        </button>

        <p className="text-[13px] text-slate-800 mt-3">
          No tienes una cuenta? {" "}
          <Link className="font-medium text-primary underline" to="/signup">
            Registrate
          </Link>
        </p>
      </form>
    </div>
  </AuthLayout>;
}

export default Login