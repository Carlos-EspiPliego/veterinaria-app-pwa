import '@styles/Inicio.scss'
import NavBar from '@components/NavBarIntro';
import LoginForm from '@containers/auth/LoginForm';

const Inicio = () => {

  return (
    <div className='background'>
      <NavBar />
      <div className='flex justify-center items-center h-screen px-4'>
        <LoginForm />
      </div>
    </div>
  )
}

export default Inicio