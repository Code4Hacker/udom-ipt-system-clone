import axios from 'axios'
import React, { useEffect, useState } from 'react'
import toast from 'react-hot-toast';
import { baseURL } from '../../paths/base_url';
import { useNavigate } from 'react-router-dom';
import { DatePicker, Divider } from 'rsuite';

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
        <div className='main_upload'>
            <div className="flex_card">
                <div className="">
                    <h1 className='text-center text-lg text-bold pt-5' style={{
                        fontWeight: '900'
                    }}> ASSESMENT FORM FOR FIELD SUPERVISOR/TRAINING OFFICER ( AFSO )</h1>
                    <div className="pt-5">

                        <span>Student Information</span>
                    </div>
                    <div className="grid_50_50">
                        <div className="" style={{
                            "--template": "auto 50%"
                        }}>
                            <input type="text" placeholder='Name of Student' />
                            <input type="text" placeholder='Registration Number' />
                        </div>
                        <div className="" style={{
                            "--template": "auto 25%"
                        }}>
                            <input type="text" placeholder='Degree Programme' />
                            <input type="text" placeholder='Year of Study' />
                        </div>
                    </div>
                    <div className="pt-2">

                        <span>Address</span>
                    </div>
                    <div className="grid_50_50">
                        <div className="" style={{
                            "--template": "auto 25%"
                        }}>
                            <input type="text" placeholder='Name of Origanization/Company' />
                            <input type="text" placeholder='Branch Name' />
                        </div>
                        <div className="" style={{
                            "--template": "auto 40%"
                        }}>
                            <input type="text" placeholder='Region' />
                            <input type="text" placeholder='District' />
                        </div>
                    </div>
                    <div className="pl-24 pr-24">
                        <Divider />
                    </div>
                    <div className="pt-2">

                        <span>Student Complete period of IPT</span>
                    </div>
                    <div className="grid_50_50">
                        <div className="" style={{
                            "--template": "100%"
                        }}>
                            <DatePicker placeholder="From Date" />
                            <DatePicker placeholder="To Date" />
                            <input type="text" placeholder='Has been working under Mr/Mrs...' />
                            <input type="text" placeholder='Position' />
                        </div>
                        <div className="" style={{
                            "--template": "auto"
                        }}>
                            <textarea name="" id="" style={{
                                resize: 'none'
                            }} placeholder='The duties assigned to him/her were: '></textarea>
                        </div>
                    </div>
                    <div className="pl-24 pr-24">
                        <Divider />
                    </div>
                    <div className="pt-2">

                        <span>Attitude Assesment ( Max Score Each (3)) </span>
                    </div>
                    <div className="grid_50_50">
                        <div className="" style={{
                            "--template": "auto 25% auto"
                        }}>
                            <input type="number" placeholder='Pactuality' />
                            <input type="number" placeholder='Regular Attendance' />
                            <input type="number" placeholder='Dressing Suitability' />
                        </div>
                        <div className="" style={{
                            "--template": "auto 40%"
                        }}>
                            <input type="number" placeholder='Confidentiality' />
                            <input type="number" placeholder='Accountability' />
                        </div>
                        <div className="" style={{
                            "--template": "auto auto auto"
                        }}>
                            <input type="number" placeholder='Disciplined' />
                            <input type="number" placeholder='Cooperation' />
                            <input type="number" placeholder='Accepting Guidance' />
                        </div>
                        <div className="" style={{
                            "--template": "auto auto auto"
                        }}>
                            <input type="number" placeholder='Readiness to accept responsibilities' />
                            <input type="number" placeholder='Time Management Consciousness' />
                            <input type="number" placeholder='Trustfulness' />
                        </div>
                        <div className="" style={{
                            "--template": "auto"
                        }}>
                            <input type="number" placeholder='( Max Score (2)) Caring of Organization resources (furniture, computer systems, etc... )' max={2} maxLength={2} />
                        </div>
                        <div className="" style={{
                            "--template": "auto auto"
                        }}>
                            <input type="number" placeholder='Self-initiative' />
                            <input type="number" placeholder='Decision making capability' />
                        </div>
                    </div>
                    <div className="pt-2">

                        <span>Attending Checkup</span>
                    </div>
                    <div className="grid_50_50">
                        <div className="" style={{
                            "--template": "auto auto"
                        }}>
                            <input type="number" placeholder='How many days did not appear for work ?' />
                            <input type="number" placeholder="Where the reason of Student's absence communicated to you?" />
                        </div>
                        <div className="" style={{
                            "--template": "30% auto"
                        }}>
                            <input type="number" placeholder='What are they ?' />
                            <input type="number" placeholder="Was the logbook submitted to you weekly for your comments and signature?" />
                        </div>
                    </div>
                    <Divider/>
                    <div className="pt-2">

                        <span>Skills Assesment ( Max Score Each (3)) </span>
                    </div>
                    <div className="grid_50_50">
                        <div className="" style={{
                            "--template": "auto"
                        }}>
                            <input type="number" placeholder='( 15 MARKS ) Knowledge and skills demostrated by the student' title='( 15 MARKS ) Knowledge and skills demostrated by the student'/>
                            
                        </div>
                        <div className="" style={{
                            "--template": "auto 40%"
                        }}>
                            <input type="number" placeholder='( 10 MARKS ) Willingness to accept challenges' title='( 10 MARKS ) Willingness to accept challenges' />
                            <input type="number" placeholder='( 5 MARKS ) Readiness to utilize his/her potential for the organisation' title='( 5 MARKS ) Readiness to utilize his/her potential for the organisation' />
                        </div>
                        <div className="" style={{
                            "--template": "auto auto"
                        }}>
                            <input type="number" placeholder='( 15 MARKS ) Creativity (any new idea or solution provided by the student )' title='( 15 MARKS ) Creativity (any new idea or solution provided by the student )' />
                            <input type="number" placeholder='( 5 MARKS ) Confidence' title='( 5 MARKS ) Confidence' />
                        </div>
                        <div className="dp" style={{
                            "--template": "auto"
                        }}>
                           <input type="number" placeholder='( 10 MARKS ) Hardworking' title='( 10 MARKS ) Hardworking' style={{
                            width:'110% !important',
                           }}/>
                        </div>

                        <div className="dp" style={{
                            "--template": "auto",
                            marginRight:'10px'
                        }}>
                            <span>What were student's achevements ( if any )?</span>
                           <input type="number" placeholder='( 10 MARKS ) Hardworking' title='( 10 MARKS ) Hardworking'/>
                        </div>
                        <div className="dp" style={{
                            "--template": "auto"
                        }}>
                            <span style={{fontSize:'11px'}}>What is your readiness to take more (and how many) students for Industrial Practical
                                Training in the future, and in which areas? (e.g Networking, Website design and
                                development, System administration, Computer application training, Software
                                development, Security, etc.)?</span>
                            <input type="number" placeholder='( 10 MARKS ) Hardworking' title='( 10 MARKS ) Hardworking' />
                        </div>
                    </div>

                </div>
                <div className="">
                    <h1 className='text-center text-lg text-bold' style={{
                        fontWeight: '900'
                    }}>PREVIEW ( DASHBOARD )</h1>
                </div>
            </div>
        </div>
    )
}

export default USAssesments


