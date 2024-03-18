import React, { useEffect, useState } from 'react'
import { BarTop, Sidebar, Topbar } from '../../components'
import { Button, Col, Container, Row } from 'react-bootstrap'
import raws from "../../raws/user.json"
import { JournalBookmarkFill } from 'react-bootstrap-icons'
import axios from 'axios'
import { baseURL } from '../../paths/base_url'
import toast from 'react-hot-toast'

const UserDashboard = () => {

  // const { user } = raws;
  const [user, setUser] = useState();
  // const { about, academic, selection } = user;
  const [next, setNext] = useState(false);
  const [about, setAbout] = useState();
  const [college, setCollege] = useState();
  const [program, setProgram] = useState();
  const [academic, setAdemic] = useState();
  const [department, setDepartment] = useState();
  const [selection, setSelection] = useState();

  const [student, setStudent] = useState();
  const storage = window.localStorage;
  let forma = (new FormData());
  forma.append("studentId", storage.getItem("std_usr"));
  let bodydata = forma;
  const getStudentDetails = async () => {
    try {
      const requests = axios.request({
        method: "POST",
        url: `${baseURL}student.php`,
        data: bodydata
      });
      setUser((await requests).data);
      const { academic, about, selection } = (await requests).data[0];
      const { college, department, program } = academic;
      setAdemic(academic); setAbout(about); setSelection(selection);
      setCollege(college); setDepartment(department); setProgram(program);
      // console.log((await requests).data[0]);
    } catch (error) {
      toast.error(`Something went wrong\n${error}`);
    }
  }

  useEffect(() => { getStudentDetails(); }, []);


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
          <div className="flex_box" style={{
            '--width': '35%', '--width-two': 'auto', '--height': 'auto', paddingTop: '20px'
          }}>
            <div className="border_box" style={{
              paddingLeft: '10px'
            }}>
              {
                about !== undefined ?
                  <Container className='pt-5 pb-5'>
                    <h4 className='text-center capitalize page-title'>{about.fullname.split(" ")[0]}, {about.fullname.split(" ")[1]} {about.fullname.split(" ")[2]}</h4>
                    <p className="uppercase page-title text-sharp">
                      About Me :
                    </p>
                    <Container className='list_about'>
                      <div className="flex_box ms-2 mt-3" style={{
                        '--width': '35%', '--width-two': 'auto', '--height': 'auto'
                      }}>
                        <div className=""><span className='text-bold'>Full Name :</span></div>
                        <div className=""><span className='text_muted  capitalize'>{about.fullname}</span></div>
                      </div>

                      <div className="flex_box ms-2" style={{
                        '--width': '35%', '--width-two': 'auto', '--height': 'auto'
                      }}>
                        <div className=""><span className='text-bold'>Reg No :</span></div>
                        <div className=""><span className='text_normal  capitalize'>{about.registration}</span></div>
                      </div>
                      <div className="flex_box ms-2" style={{
                        '--width': '35%', '--width-two': 'auto', '--height': 'auto'
                      }}>
                        <div className=""><span className='text-bold'>Gender :</span></div>
                        <div className=""><span className='text_muted  capitalize'>{about.gender}</span></div>
                      </div>
                      <div className="flex_box ms-2" style={{
                        '--width': '35%', '--width-two': 'auto', '--height': 'auto'
                      }}>
                        <div className=""><span className='text-bold'>Mobile :</span></div>
                        <div className=""><span className='text_muted  capitalize'>{about.mobile}</span></div>
                      </div>
                      <div className="flex_box ms-2" style={{
                        '--width': '35%', '--width-two': 'auto', '--height': 'auto'
                      }}>
                        <div className=""><span className='text-bold'>Email :</span></div>
                        <div className=""><span className='text_muted  capitalize'>{about.email}</span></div>
                      </div>
                    </Container>

                  </Container>
                  : "Loading ..."
              }
            </div>
            <div className="border_box" style={{
              padding: '10px',
              paddingTop: '40px'
            }}>
              <div className="button" style={{
                maxWidth: '420px',
                position: 'relative',
                display: "grid",
                gridTemplateColumns: "auto auto"
              }}>
                <Button className={` ${next ? 'not-btn' : 'active-btn'}`} onClick={() => next ? setNext(false) : ""} style={{
                  display: 'flex'
                }}><i><JournalBookmarkFill /></i> <span className='ml-2 -mt-1' style={{
                  marginTop: '-2px'
                }}>Academic Information</span></Button>
                <Button className={`${!next ? 'not-btn' : 'active-btn'}`} onClick={() => !next ? setNext(true) : ""} style={{
                  display: 'flex'
                }}><i><JournalBookmarkFill /></i> <span className='ml-2 -mt-1' style={{
                  marginTop: '-2px',
                }}>My  Selection</span></Button>
              </div>
              {
                !next ?
                  <div className="m-4">
                    <Container>

                      {
                        college ?
                          <div className="jornal_list">
                            <div className="jt-title">
                              <span>College</span>
                            </div>
                            <div className="jt-line">
                              <div className="ball"></div>
                            </div>
                            <div className="jt-content">
                              <h4 className="page-title uppercase">{college.title}</h4>
                              <span className='capitalize'>{college.description}</span>
                            </div>

                          </div> : "Loading ..."
                      }
                      {
                        department ?
                          <div className="jornal_list">
                            <div className="jt-title">
                              <span>Department</span>
                            </div>
                            <div className="jt-line">
                              <div className="ball"></div>
                            </div>
                            <div className="jt-content">
                              <h4 className="page-title uppercase">{department.title}</h4>
                              <span className='capitalize'>{department.description}</span>
                            </div>

                          </div> : "Loading ..."
                      }
                      {
                        program ?
                          <div className="jornal_list">
                            <div className="jt-title">
                              <span>Program</span>
                            </div>
                            <div className="jt-line">
                              <div className="ball"></div>
                            </div>
                            <div className="jt-content">
                              <h4 className="page-title capitalize">{program.title}</h4>
                              <span className='capitalize'>{program.description}</span>
                            </div>

                          </div> : "Loading ..."
                      }
                    </Container>
                  </div>
                  : <div className='' style={{
                    marginTop: '20px'
                  }}>
                    <div className="acm five-grid m-4 text-bold text-muted" style={{
                      "--w1": "30px",
                      "--w2": "auto",
                      "--w3": "100px",
                      "--w4": "100px",
                      "--w5": "150px",
                      width: "95%",
                      backgroundColor: 'var(--alice)'
                    }}>
                      <div className="">#</div>
                      <div className="">Module Name</div>
                      <div className="">Session</div>
                      <div className="">Venue</div>
                      <div className="">LAB</div>

                    </div>
                    {
                      selection && selection?.length > 0 ? selection.map((selected, key) =>
                        <div className="acm five-grid m-4 text-muted" style={{
                          "--w1": "30px",
                          "--w2": "auto",
                          "--w3": "100px",
                          "--w4": "100px",
                          "--w5": "150px",
                          width: "95%"
                        }}>
                          <div className="">{key + 1}</div>
                          <div className="">{selected.module}</div>
                          <div className="">{selected.session}</div>
                          <div className="">{selected.venue}</div>
                          <div className="">{selected.lab}</div>

                        </div>
                      ) : "Loading ..."
                    }
                  </div>
              }
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default UserDashboard