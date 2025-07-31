import React, { useContext, useState } from 'react'
import AuthLayout from '../../components/layouts/AuthLayout'
import { validateEmail } from '../../utils/helper';
import ProfilePhotoSelector from '../../components/inputs/ProfilePhotoSelector';
import Input from '../../components/inputs/input';
import { Link, useNavigate } from 'react-router-dom';
import axiosInstance from '../../utils/axiosInstance';
import { API_PATHS } from '../../utils/apiPaths';
import { UserContext } from '../../context/userContext';
import uploadImage from '../../utils/uploadImage';

const Signup = () => {
  const [profilePic, setProfilePic] = useState(null);
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [adminInviteToken, setAdminInviteToken] = useState('');

  const [error, setError] = useState(null);

  const {updateUser} = useContext(UserContext)
  const navigate = useNavigate();

  //Formulario de Registro usuario
  //Registo API 
    const handleSignUp = async (e) => {
      e.preventDefault();

      let profileImageUrl = ''

      if(!fullName){
        setError("Por favor introduce tu nombre completo");
        return;
      }
  
      if(!validateEmail(email)){
        setError("Por favor introduce un correo electrónico válido");
        return;
      }
  
      if(!password) {
        setError("Por favor introduce la contraseña");
        return;
      }
  
      setError("");

      //API call de registro
      try {

        //subir la imagen si esta disponbible
        if(profilePic){
          const imgUploadRes = await uploadImage(profilePic);
          profileImageUrl = imgUploadRes.imageUrl || "";
        }

        const response = await axiosInstance.post(API_PATHS.AUTH.REGISTER, {
          name: fullName,
          email,
          password,
          profileImageUrl,
          adminInviteToken
        });

        const { token, role } = response.data;

        if(token){
          localStorage.setItem("token", token);
          updateUser(response.data);

          //redireccionamos segun el role
          if(role === "admin") {
            navigate("/admin/dashboard")
          } else {
            navigate("/user/dashboard");
          }
        }

      } catch (error) {
        if(error.response && error.response.data.message){
          setError(error.response.data.message)
        } else {
          setError("ALgo ha fallado. Intente de nuevo")
        }
      }

  }
  
  
  return (
    <AuthLayout>
      <div className="lg:w-[100%] h-auto md:h-full mt-10 md:mt-0 flex flex-col justify-center">
        <h3 className="text-xl font-semibold text-black">Crear Cuenta</h3>
        <p className="text-xs text-slate-700 mt-[5px] mb-6">
          Introduce tus datos a continuación
        </p>

        <form onSubmit={handleSignUp}>
          <ProfilePhotoSelector image={profilePic} setImage={setProfilePic} />
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Input
              value={fullName}
              onChange={({ target}) => setFullName(target.value)}
              label="Nombre"
              placeholder="Introduce tu nombre completo"
              type="text"
            />

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

            <Input
              value={adminInviteToken}
              onChange={({ target}) => setAdminInviteToken(target.value)}
              label="Invitacion de Administrador"
              placeholder="Introduce 6 digitos"
              type="text"
            />
          </div>

            {error && <p className="text-red-500 text-xs pb-2.5">{error}</p>}

            <button type="submit" className="btn-primary">
                Registrate
            </button>

            <p className="text-[13px] text-slate-800 mt-3">
              Ya tienes una cuenta? {" "}
              <Link className="font-medium text-primary underline" to="/login">
              Iniciar Sesión
              </Link>
            </p>
        </form>
      </div>
    </AuthLayout>
  )
  };



export default Signup