import axios from 'axios'
import React, { useEffect, useState } from 'react'
import toast from 'react-hot-toast';
import { baseURL } from '../../paths/base_url';
import { useNavigate } from 'react-router-dom';

const SSignIn = () => {
    const nav = useNavigate();
    useEffect(() => {
        if (window.localStorage.sv_token !== undefined) {
            nav('/upload_assesments')
        }
    }, []);
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const handleSubmittion = async () => {
        if (username !== "" && password !== "") {
            let formdata = new FormData();

            formdata.append("username", username);
            formdata.append("passcode", password);
            const bodydata = formdata;
            const request = axios.request({
                method: 'POST',
                url: `${baseURL}externals_login.php`,
                data: bodydata
            });
            console.log((await request).data);
            if ((await request).data.status === 200) {
                toast.loading('login Successiful!')
                window.localStorage.setItem("sv_token", (await request).data.token);
                setTimeout(() => {
                    toast.remove();
                    nav('/upload_assesments');
                }, 2000);
            } else {toast.error((await request).data.message);}
        } else {toast.error("Fill all fields !!!");}
    }
    return (
        <div className='auth_body'>
            <div className="">
                <h1 className='text-center text-lg text-bold' style={{
                    fontWeight: '900'
                }}>SIGN <span className="text-blue">IN</span></h1>
                <br />
                <input type="text" placeholder='Username' value={username} onChange={(e) => setUsername(e.target.value)} />
                <br />
                <input type="password" placeholder='Password' value={password} onChange={(e) => setPassword(e.target.value)} />
                <div className="message"></div>
                <button onClick={handleSubmittion}>Login</button>
            </div>
        </div>
    )
}

export default SSignIn