
import React, { useEffect, useRef, useState } from 'react'
import { BarTop, Sidebar, Topbar } from '../../components'
import { useParams } from 'react-router-dom'
import axios from 'axios';
import { baseURL } from '../../paths/base_url';


const IndividualStudent = () => {
    const [student, setStudent] = useState({});
    const params = useParams();
    const {id} = params;
    const handleGetUser =  async() => {
        let formdata = new FormData();
        formdata.append("studentId", id);
        const bodydata = formdata;
        const requests = axios.request({
            url:`${baseURL}arrival_data.php`,
            method:"POST",
            data: bodydata
        });

        console.log((await requests).data.arrival[0]);
        setStudent((await requests).data.arrival[0]);
    }
    useEffect(()  => {
        handleGetUser();
    }, []);
    return (
        <div className='view user_board'>
            <div className="flex_box" style={{
                '--width': '240px', '--width-two': 'auto', '--height': '100vh'
            }}>
                <div className="left-screen-view">
                    <Sidebar />
                </div>
                <div className="right-screen-view">
                    <BarTop />
                    <Topbar
                        headline={"Welcome to Academic Year"}
                        subheadline={"Dashboard"}
                        note={"2022/2023"}
                    />
                    <div>
                        {/* IndividualStudent {params.id} */}
                        <div className="absolute">
                            <div><div><iframe className='border_box fullbox'  src={`https://www.google.com/maps/embed/v1/directions?origin=Dodoma,+Tanzania&destination=${student !== null ? student.region+" "+student.district+" "+student.place:"udom, cive"}&key=AIzaSyBFw0Qbyq9zTFTd-tUY6dZWTgaQzuU17R8`}></iframe></div></div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default IndividualStudent;
