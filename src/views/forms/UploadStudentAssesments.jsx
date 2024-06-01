import axios from 'axios'
import React, { useEffect, useState } from 'react'
import toast from 'react-hot-toast';
import { baseURL } from '../../paths/base_url';
import { useNavigate } from 'react-router-dom';

const USAssesments = () => {
    const nav = useNavigate();
    useEffect(() => {
        if (window.localStorage.sv_token !== undefined) {
            console.log(localStorage.sv_token);
        } else {
            nav('/auth_token');
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
                url: `${baseURL}externals_.php`,
                data: bodydata
            });
            console.log((await request).data);
            if ((await request).data.status === 200) {
                toast.success('Registered Successiful!')
                window.localStorage.setItem("v_token", (await request).data.token);
                localStorage.removeItem("v_token");
            } else {toast.error((await request).data.message);}
        } else {toast.error("Fill all fields !!!");}
    }
    return (
        <div className='auth_body'>
            <div className="">
                <h1 className='text-center text-lg text-bold' style={{
                    fontWeight: '900'
                }}>ATTENTION FIRST</h1>
                <p className='text-center ml-5 mr-5'>Please change your credential for security reasons. <b>Important</b></p>
                <br />
                <input type="text" placeholder='Enter New Username' value={username} onChange={(e) => setUsername(e.target.value)} />
                <br />
                <input type="password" placeholder='Enter New Password' value={password} onChange={(e) => setPassword(e.target.value)} />
                <div className="message"></div>
                <button onClick={handleSubmittion}>Verify</button>
            </div>
        </div>
    )
}

export default USAssesments


