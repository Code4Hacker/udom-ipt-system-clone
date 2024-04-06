import axios from 'axios';
import { Button } from 'primereact/button';
// import { Checkbox } from 'primereact/checkbox';
import { InputText } from 'primereact/inputtext'
import React, { useRef } from 'react'
import { useState } from 'react'
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { baseURL } from '../paths/base_url';
import { useIdleTimer } from 'react-idle-timer';
import { useEffect } from 'react';
import Loading from '../components/Loading';
import emailjs from '@emailjs/browser';
const Registration = () => {
  const [checked1, setChecked1] = useState(false);
  const [loading, setLoading] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [show, setShow] = useState(false);
  const navigate = useNavigate();
  const onIdle = () => {
    toast.loading("Please, don't take much time...");
  }
  const { getRemainingTime } = useIdleTimer({
    onIdle,
    timeout: .11 * 60 * 1000
  });
  const handleSubmit = async () => {
    window.localStorage.clear();
    toast.dismiss();
    if (username.length < 2) toast.error("username not meet requirements");
    if (password.length < 2) toast.error("password not meet requirements");

    if (!(username.length < 2) && !(password.length < 2)) {

      let the_body = JSON.stringify({
        "t_number": username,
        "password": password
      });
      try {
        const checkingUser = await axios.request({
          url: `${baseURL}student_ul.php`,
          method: "POST",
          data: the_body
        });
        if (checkingUser.data.status === 200) {
          toast.success("Credential are Valid!\nlogin Successiful...");
          setTimeout(() => {
            toast.loading("Redirecting...");
            show ? setShow(false) : setShow(true);
            setShow(true);
            switch (checkingUser.data.success) {
              case "student":
                window.localStorage.setItem("std_usr", username);
                window.localStorage.setItem("role", "std");
                setTimeout(() => {
                  toast.dismiss();
                  navigate("/user_board");
                }, 1500);
                break;
              case "supervisor":
                window.localStorage.setItem("super", username);
                window.localStorage.setItem("role", "super");
                setTimeout(() => {
                  toast.dismiss();
                  navigate("/super_dashboard");
                }, 1500);
                break;
              case "administrator":
                window.localStorage.setItem("admin", username);
                window.localStorage.setItem("role", "admin");
                setTimeout(() => {
                  toast.dismiss();
                  navigate("/admin_dashboard");
                }, 1500);
                break;
              default:
                break;
            }
          }, 2000);
        } else {
          toast.error("Fail to Sign In.\ncredential are Incorrect!");
        }

      } catch (error) {
        toast.error(`Something went wrong! \n ${error}`)
      }

    }
  }
  // const clear = () => {
  //   window.localStorage.clear();
  // }
  const load = () => {
    setLoading(true);

    setTimeout(() => {
      setLoading(false);
    }, 2000);
  };
  // useEffect(() => clear());
    const form = useRef();
  
    const sendEmail = async() => {
      // e.preventDefault();
    //   const data = {
    //     service_id: 'service_r77en09',
    //     template_id: 'template_daikb7k',
    //     user_id: 'pGoqf69cjpYVPD8xZ',
    //     template_params: {
    //       to_name:'James',
    //       email:'paulprogrammer947@gmail.com',
    //       message:'hello from emjs gemini'
    //     }
    // };
    //   const responses = axios.request({
    //     url:"https://api.emailjs.com/api/v1.0/email/send",
    //     method:"POST",
    //     headers:{
    //       'Content-Type': 'application/json',
    //       'Accept': 'application/json',
    //   },
    //   body: JSON.stringify(data)
    //   });
      // console.log((await responses).data)
      try {
        const response = await emailjs.send('service_r77en09','template_daikb7k', {name:"GeminiArc", recipient:"paulprogrammer947@gmail.com", from_name:"GeminiArc2", "message":"I miss you, please work"});

        console.log(response);
      } catch (error) {
        console.log("ERROR", error)
      }
      
    }

    // const sendt = async() => {
    //   const client = new SMTPClient({
    //     user: 'Gemini Child',
    //     password: 'Paul1322',
    //     host: 'smtp.paulprogrammer947.com',
    //     ssl: true,
    //   });
      
    //   try {
    //     const message = await client.sendAsync({
    //       text: 'i hope this works',
    //       from: 'you <username@your-email.com>',
    //       to: 'someone <someone@your-email.com>, another <another@your-email.com>',
    //       cc: 'else <else@your-email.com>',
    //       subject: 'testing emailjs',
    //     });
    //     console.log(message);
    //   } catch (err) {
    //     console.error(err);
    //   }
    // }
    useEffect(() => { 
      emailjs.init("pGoqf69cjpYVPD8xZ")
    //   (function(){
    //     emailjs.init({
    //       publicKey: "pGoqf69cjpYVPD8xZ",
    //     });
    //  })();
      sendEmail()
    },[])








  return (
    <>
      <div className="load">
        {
          show ? <Loading message={"Something Wrong"} /> : ""
        }
      </div>
      <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">

          <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
            IPT ASSESSMENT  SYSTEM SIGN IN
          </h2>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm shadow-xl p-5 rounded-md border-b-8" style={{
          borderColor: 'var(--bold-ocean)'
        }}>
          <div className="space-y-6">
            <div>
              <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
                Username
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
                  backgroundColor: 'var(--bold-ocean)'
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