import axios from 'axios'
import React, { useState } from 'react'
import toast, { Toaster } from 'react-hot-toast';
import { baseURL } from '../../paths/base_url';
import { useNavigate } from 'react-router-dom';
import { Toast } from 'react-bootstrap';

const AuthToken = () => {
    const nav = useNavigate();
    const [show, setShow] = useState(false);
    const [token, setToken] = useState("");
    const handleTokenSubmittion = async () => {
        setShow(false);
        console.log("______________________***************_____________________")
        document.querySelector(".btn_token").style.background = "var(--dodge)";
        document.querySelector(".btn_token").style.backgroundColor = "royalblue";
        if (token !== "") {
            let formdata = new FormData();

            formdata.append("tokenNumber", token);
            const bodydata = formdata;
            const request = axios.request({
                method: 'POST',
                url: `${baseURL}token_verify.php`,
                data: bodydata
            });
            console.log("Verify ", (await request).data)
            if ((await request).data.status === 200) {
                document.querySelector(".btn_token").style.background = "var(--dodgecolor)";
                document.querySelector(".btn_token").style.backgroundColor = "green";
                window.localStorage.setItem("v_token", (await request).data.token);
                toast.remove()
                toast.loading("redirecting ...")
                setTimeout(() => {
                    toast.remove()
                    nav("/after_verify");

                }, 3000);




            } else {
                toast.error("Token is Invalid");
                setShow(!false);
            }
        } else {
            toast.error("Token Is Empty !!!");
            document.querySelector(".btn_token").style.background = "var(--dodge)";
            document.querySelector(".btn_token").style.backgroundColor = "red";
        }
    }
    return (
        <div className='auth_body'>
            <div className="">
                <h1 className='text-center p-5 text-lg text-bold'>VERIFY YOUR TOKEN</h1>
                <input type="text" placeholder='Enter Token' value={token} onChange={(e) => setToken(e.target.value)} />
                <div className="message"></div>
                <button onClick={handleTokenSubmittion} className='btn_token'>Connect</button>
            </div>
            <Toaster />
            <div className="box shadow-sm p-3" style={{
                borderRadius: '24px',
                zIndex: '3',
                background: 'orange',
                textAlign: 'center',
                color: 'white',
                display: `${show ? 'block' : 'none'}`

            }} > Sorry If you think something wen't wrong. <br /> Contact <span>ipt@help (+255 798 233 433)</span></div>
        </div>
    )
}

export default AuthToken


