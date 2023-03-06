import { SlMenu } from 'react-icons/sl';
import { GiShoppingCart } from 'react-icons/gi';
import {Link, useNavigate} from 'react-router-dom';
import useAuth from '../hooks/useAuth';

function NavBar() {
  const { auth, setAuth } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    navigate(`/`);
    setAuth({})
  }

  return (
      <nav className='relative group p-3'>
        <SlMenu className='text-xl  cursor-pointer md:hidden'/>
        <div className={`absolute hidden right-0 top-0 bg-white z-10 min-h-min min-w-[100vw] shadow-lg group-hover:block md:block md:shadow-none md:relative md:min-w-max`}>
          <ul className="flex justify-evenly md:justify-end">

            {(auth?.accessToken && auth?.role === 'admin') && 
            <li className='py-2 inline hover:shadow-lg text-gray-700/80 hover:bg-blue-200/70 active:bg-blue-400/70 active:text-gray-100 rounded md:mr-2'>
              <Link to={'/admin'} className="py-2 px-3">Admin Page</Link> 
            </li>}

            {(auth?.accessToken && auth?.role === 'super-admin') && 
            <li className='py-2 inline hover:shadow-lg text-gray-700/80 hover:bg-blue-200/70 active:bg-blue-400/70 active:text-gray-100 rounded md:mr-2'>
              <Link to={'/admin/super'} className="py-2 px-3">Super Page</Link> 
            </li>}

            {auth?.accessToken && 
            <li className='py-2 inline hover:shadow-lg text-gray-700/80 hover:bg-blue-200/70 active:bg-blue-400/70 active:text-gray-100 rounded md:mr-2'>
              <Link to={'/'} className="py-2 px-3">Home</Link>
            </li>}

            {!auth?.accessToken && 
            <li className='py-2 inline hover:shadow-lg text-gray-700/80 hover:bg-orange-200/70 active:bg-orange-400/70 active:text-gray-100 rounded md:mr-2'>
              <Link to={'/login'} className="py-2 px-3">Login</Link>
            </li>}
            
            {!auth?.accessToken && 
            <li className='py-2 inline hover:shadow-lg text-gray-700/80 hover:bg-blue-200/70 active:bg-blue-400/70 active:text-gray-100 rounded md:mr-2'>
              <Link to={'/create-new-user'} className="py-2 px-3">Create new user</Link>
            </li>}

            {(auth?.accessToken && auth?.role === 'user') && 
            <li className='py-2 inline hover:shadow-lg text-gray-700/80 hover:bg-blue-200/70 active:bg-blue-400/70 active:text-gray-100 rounded md:mr-2'>
              <Link to={'/cart'}><GiShoppingCart className='text-3xl'/></Link>
            </li>}

            {auth?.accessToken && 
            <li className='py-2 inline hover:shadow-lg text-gray-700/80 hover:bg-blue-200/70 active:bg-blue-400/70 active:text-gray-100 rounded md:mr-2'>
              <Link to={'/login'}  onClick={handleLogout} className="py-2 px-3">Logout</Link> 
            </li>}

          </ul>
        </div> 
      </nav>
  )
}

export default NavBar;