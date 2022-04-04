import axios from 'axios';
import useLocalStorage from 'use-local-storage';
import { useNavigate } from 'react-router-dom';

const Login = () => {
    let navigate = useNavigate();
    let [token, setToken] = useLocalStorage('token', '');
    const userLogin = (e) => {
        e.preventDefault();
        let email = e.target.email.value;
        let password = e.target.password.value;
        axios
            .post('/users/login', { email, password })
            .then((res) => {
                setToken(res.data.token);
                if (localStorage.getItem('token').length > 2) {
                    alert('Logged in successfully');
                    navigate('/members');
                }
            })
            .catch((e) => console.log(e));
    };
    return (
        <div>
            <form className='form' onSubmit={userLogin}>
                <h4>Login</h4>
                <label>
                    <h5>Email</h5>
                </label>
                <input
                    type='email'
                    required
                    name='email'
                    placeholder='email'
                    className='form-control'
                />
                <label>
                    <h5>Password</h5>
                </label>
                <input
                    type='password'
                    name='password'
                    className='form-control'
                    placeholder='password'
                />
                <div className='text-center upSpace'>
                    <button className='btn btn-primary'>Login</button>
                </div>
            </form>
        </div>
    );
};
export default Login;
