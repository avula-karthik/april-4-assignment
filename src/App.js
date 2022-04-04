import { BrowserRouter, Link, Route, Routes } from 'react-router-dom';
import './App.css';
import Registration from './Registration';
import Login from './Login';
import Logout from './Logout';
import Members from './Members';

function App() {
    return (
        <div className='App'>
            <BrowserRouter>
                <Link to='/register' className='btn btn-primary col-lg-4'>
                    Register
                </Link>
                <Link to='/login' className='btn btn-primary col-lg-6'>
                    already a member ? Login.
                </Link>
                <Link to='/logout' className='btn btn-danger col-lg-2'>
                    Logout
                </Link>
                <Routes>
                    <Route path='/register' element={<Registration />} />
                    <Route path='/login' element={<Login />} />
                    <Route path='/logout' element={<Logout />} />
                    <Route path='/members' element={<Members />} />
                </Routes>
            </BrowserRouter>
        </div>
    );
}

export default App;
