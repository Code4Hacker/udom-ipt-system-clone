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
            nav('/ss_sign_in');
        }
    }, []);
    return (
        <div className='auth_body'>
            <div className="">
                <h1 className='text-center text-lg text-bold' style={{
                    fontWeight: '900'
                }}>WELCOME HOME ( DASHBOARD )</h1>
               
            </div>
        </div>
    )
}

export default USAssesments


