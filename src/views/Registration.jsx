import axios from 'axios';
import { Button } from 'primereact/button';
// import { Checkbox } from 'primereact/checkbox';
import { InputText } from 'primereact/inputtext'
import React from 'react'
import { useState } from 'react'
import toast, { Toaster } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { baseURL } from '../paths/base_url';

const Registration = () => {
  const [checked1, setChecked1] = useState(false);
  const [loading, setLoading] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const handleSubmit = async() => { 
    // console.log(baseURL);
    if(username.length < 2) toast.error("username not meet requirements");
    if(password.length < 2) toast.error("password not meet requirements");

    if(!(username.length < 2) && !(password.length < 2)){

      // toast.success("perfect");
      // setTimeout(() => {
      //   navigate("/user_board");
      // }, 1000);
      let the_body = JSON.stringify({
        "t_number":"T22-03-10247",
        "password":"admin123"
      });
      const checkingUser = await axios.request({
        url:`${baseURL}student.php`,
        method:"POST"
      });
    }
  }
    const load = () => {
        setLoading(true);

        setTimeout(() => {
            setLoading(false);
        }, 2000);
    };
  return (
    <>
    <Toaster position='top-right'/>
    <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
       
        <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
          IPT SYSTEM SIGN IN
        </h2>
      </div>

      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm shadow-xl p-5 rounded-md border-b-8"  style={{
        borderColor:'var(--bold-ocean)'
      }}>
        <div className="space-y-6">
          <div>
            <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
              Email address
            </label>
            <div className="mt-2">
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                required
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                onChange={(e) => setUsername(e.target.value)}
                value={username}
              />
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between">
              <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">
                Password
              </label>
             
            </div>
            <div className="mt-2">
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                required
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                onChange={(e) => setPassword(e.target.value)}
                value={password}
              />
            </div>
          </div>

          <div>
            <button
              type="submit"
              className="flex w-full justify-center rounded-md px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
             style={{
              backgroundColor:'var(--bold-ocean)'
             }}
             onClick={handleSubmit}>
              Sign in
            </button>
          </div>
        </div>
      </div>
    </div>
    </>
  )
}

export default Registration