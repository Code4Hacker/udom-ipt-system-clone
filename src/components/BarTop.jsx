import React, { useRef } from 'react'
import { udom_logo } from '../assets'
import { Button, Row } from 'react-bootstrap'
import { ArrowDown, BagCheckFill, BoxArrowRight, Fullscreen, Toggle2On } from 'react-bootstrap-icons'
import { useNavigate } from 'react-router-dom'
import { useIdleTimer } from 'react-idle-timer'
import { OverlayPanel } from 'primereact/overlaypanel';

const BarTop = ({ username, menu, extras }) => {
    const op = useRef(null);
    const tableRef = useRef(null);
    const navigator = useNavigate();

    const enterFullscreen = () => { };
    const storage = window.localStorage;

    if (!storage.getItem("std_usr")) navigator("/");

    const logOut = () => navigator("/");

    const { getRemainingTime } = useIdleTimer({
        onIdle: logOut,
        timeout: 10 * 60 * 1000
    });


    return (
        <div onClick={enterFullscreen}>
            <Row className='' style={{
                background: 'var(--bold-ocean)'
            }}>
                <div className="flex_box" style={{
                    "--width": '240px', "--width-two": 'auto', '--height': 'auto', padding: "0px", margin: '0px'
                }}>
                    <div className="" style={{ background: 'var(--light)' }}></div>
                    <div className="flex_box top-bar snipped_top" style={{
                        "--width": 'auto', "--width-two": 'auto', '--height': 'auto'
                    }}>
                        <div className="" style={{
                            marginLeft: "240px"
                        }}>
                            <button className="primary text-larger">
                                <i><Toggle2On /></i>
                            </button>
                        </div>
                        <OverlayPanel ref={op} className=''>
                            <div className="divide-y divide-gray-100 shadow-xl rounded" style={{
                                backgroundColor:'var(--light)'
                            }}>
                                    
                                    <div className="hidden shrink-0 divide-gray-100 devide sm:flex sm:flex-col sm:items-end rounded">
                                        <Button style={{
                                            border:"none",
                                            color:"var(--muted)",
                                            width:"100%",
                                            display:"flex",
                                            gap:"10px",
                                            background:"none !important",
                                            fontSize:"medium",
                                            borderBottom:"1px solid  var(--meal)",
                                            borderRadius:"0px"
                                        }} className='p-3 hover:text-white hover:bg-black hover:rounded'><BagCheckFill className='hover:text-white'/> <span className='-mt-1 hover:text-white'>Change  Password</span></Button>
                                        <Button style={{
                                            border:"none",
                                            color:"var(--muted)",
                                            width:"100%",
                                            display:"flex",
                                            gap:"10px",
                                            fontSize:"medium",
                                            borderBottom:"1px solid  var(--meal)",
                                            borderRadius:"0px"
                                        }}className='p-3 hover:bg-black hover:rounded'><BoxArrowRight className='hover:text-white'/> <span className='-mt-1 hover:text-white'> Log  Out</span></Button>
                                    </div>
                            </div>
                            
                        </OverlayPanel>
                        <div className="border_end">
                            <button className='primary'>
                                <span className="icon-b" style={{
                                    position: 'relative',
                                    top: '0px',
                                    fontSize: 'large'
                                }}><Fullscreen /></span>
                                <div className="image">
                                    <img src={udom_logo} alt="" />
                                </div>
                                <div onClick={(e) => op.current.toggle(e)}>
                                    <span>Paulo(Student)</span>
                                </div>
                                <span className='icon-bg'><ArrowDown /></span>
                            </button>
                        </div>
                    </div>
                </div>
            </Row>
        </div>
    )
}

export default BarTop