import React from 'react'
import { udom_logo } from '../assets'
import { Row } from 'react-bootstrap'
import { ArrowDown, Fullscreen, Toggle2On } from 'react-bootstrap-icons'

const BarTop = () => {
    return (
        <div>
            <Row className='' style={{
                background: 'var(--bold-ocean)'
            }}>
                <div className="flex_box" style={{
                    "--width": '240px', "--width-two": 'auto', '--height': 'auto', padding:"0px",margin:'0px'
                }}>
                    <div className="" style={{background:'var(--light)'}}></div>
                    <div className="flex_box top-bar snipped_top" style={{
                    "--width": 'auto', "--width-two": 'auto', '--height': 'auto'
                }}>
                        <div className="" style={{
                            marginLeft:"240px"
                        }}>
                            <button className="primary text-larger">
                                <i><Toggle2On /></i>
                            </button>
                        </div>
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
                                <div className="">
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