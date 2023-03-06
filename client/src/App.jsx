import {
    BrowserRouter as Router,
    Routes,
    Route,
} from 'react-router-dom';

import NavBar from './components/Navbar.jsx';
import Cart from './components/checkout/Cart.jsx';
import AdminPage from "./admin/AdminPage.jsx";
import ProfileBar from "./components/ProfileBar.jsx";
import ProductList from './components/Products/ProductList.jsx';
import LoginForm from './components/login/LoginForm.jsx';
import NewUserForm from './components/login/NewUserForm.jsx';
import SuperAdminPage from "./admin/SuperAdminPage.jsx";
import RequireAuth from './components/auth/RequireAuth';
import DetailsCard from './components/DetailsCard';
import ProductsOverview from './components/ProductsOverview';
import Page404 from "./components/Page404";


function App() {
  return (
    <div className="flex flex-col w-screen min-h-screen bg-stone-100">
      <Router>

        <header className="flex w-full max-w-[1440px] m-auto items-center border-b text-xl bg-white md:shadow-sm">
          <ProfileBar/>
          <NavBar/>
        </header>
        
        <main className='bg-stone-100 min-h-screen px-2'>
          <Routes>
            <Route exact path='/login' element={< LoginForm/>}></Route>
            <Route exact path='/create-new-user' element={< NewUserForm/>}></Route>

            <Route element={<RequireAuth allowedRoles={['user', 'admin', 'super-admin']} />}>
              <Route exact path='/' element={< ProductList/>}></Route>
              <Route exact path='/product/:id' element={< DetailsCard />}></Route>
              <Route exact path='/cart' element={< Cart />}></Route>
            </Route>

            <Route element={<RequireAuth allowedRoles={['admin', 'super-admin']} />}>
              <Route exact path='/admin' element={< AdminPage/>}></Route>
            </Route>

            <Route element={<RequireAuth allowedRoles={['super-admin']}/>}>
              <Route exact path='/admin/super' element={< SuperAdminPage />}>
                <Route exact path='/admin/super/store/:id' element={< ProductsOverview />}></Route>
              </Route>
            </Route>

            <Route exact path='/*' element={<Page404 />}></Route>

          </Routes>
        </main>
      </Router>
    </div>
  )
}

export default App;
