import React, { useState } from 'react'
import AuthLayout from '../../components/layouts/AuthLayout'
import { validateEmail } from '../../utils/helper';
import ProfilePhotoSelector from '../../components/inputs/ProfilePhotoSelector';
import Input from '../../components/inputs/input';
import { Link } from 'react-router-dom';

const Signup = () => {
  const [profilePic, setProfilePic] = useState(null);
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [adminInviteToken, setAdminInviteToken] = useState('');

  const [error, setError] = useState(null);

  //Formulario de Registro usuario
  //Registo API 
    const handleSignUp = async (e) => {
      e.preventDefault();

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
  
    };


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
              value={password}
              onChange={({ target}) => setPassword(target.value)}
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
}

export default Signup