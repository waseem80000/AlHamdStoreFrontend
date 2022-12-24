import React from 'react';
import { useDispatch } from 'react-redux';
import { LoginRequest } from '../../actions/auth.actions';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    dispatch(LoginRequest({ email: e.target[0].value, password: e.target[1].value }, navigate));
  };

  return (
    <div className='w-screen h-screen bg-gray-100 flex justify-center items-center'>
      <div className='w-full max-w-xs'>
        <form onSubmit={handleLogin} className='bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4'>
          <div className='mb-4'>
            <label className='block text-gray-700 text-sm font-bold mb-2' for='username'>
              Username
            </label>
            <input
              className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
              id='username'
              type='text'
              placeholder='Username'
            />
          </div>
          <div className='mb-6'>
            <label className='block text-gray-700 text-sm font-bold mb-2' for='password'>
              Password
            </label>
            <input
              className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline'
              id='password'
              type='password'
              placeholder='******************'
            />
          </div>
          <div className='flex items-center justify-between'>
            <button
              className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline'
              type='submit'
            >
              Sign In
            </button>
            <a className='inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800' href='.'>
              Forgot Password?
            </a>
          </div>
        </form>
        <p className='text-center text-gray-500 text-xs'>&copy;2022 Konfor. All rights reserved.</p>
      </div>
    </div>
  );
};

export default Login;
