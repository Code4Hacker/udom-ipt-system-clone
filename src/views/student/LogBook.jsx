import * as React from 'react';
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { BarTop, Sidebar, Topbar } from '../../components';
import weeks from "./../../raws/weeks.json";
import { baseURL } from '../../paths/base_url';
import toast from 'react-hot-toast';
import Loading from '../../components/Loading';
import axios from 'axios';
import { CloudDownloadFill, Download, PatchPlusFill, PlusCircle } from 'react-bootstrap-icons'
import { Button } from 'react-bootstrap';
import { Dialog } from 'primereact/dialog';
import week from "../../raws/weeks.json";

function ULogBook(props) {
    const { children, value, index, ...other } = props;


    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            {...other}
        >
            {value === index && (
                <Box sx={{ p: 3 }}>
                    <Typography>{children}</Typography>
                </Box>
            )}
        </div>
    );
}

ULogBook.propTypes = {
    children: PropTypes.node,
    index: PropTypes.number.isRequired,
    value: PropTypes.number.isRequired,
};

function a11yProps(index) {
    return {
        id: `simple-tab-${index}`,
        'aria-controls': `simple-tabpanel-${index}`,
    };
}

export default function BasicTabs() {
    const [value, setValue] = React.useState(0);
    const [logbooks, setLogbooks] = React.useState([]);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    const getStudentDetails = async (data) => {

        const storage = window.localStorage;
        let forma = (new FormData());
        forma.append("studentId", storage.getItem("std_usr"));
        forma.append("week", data ? data : "week 1");
        let bodydata = forma;
        try {
            const requests = axios.request({
                method: "POST",
                url: `${baseURL}get_logs.php`,
                data: bodydata
            });
            setLogbooks((await requests).data);
            // console.log((await requests).data)
        } catch (error) {
            toast.error(`Something went wrong\n${error}`);
        }
    }

    React.useEffect(() => { getStudentDetails(); }, []);

    const [visible, setVisible] = React.useState(false);
    const the_weeks = week.weeks;
    // inputs
    const [weeks_no, setWeeks_no] = React.useState();
    const [week_hours, setWeek_hours] = React.useState();
    const [descr, setDescr] = React.useState();

    const handleSubmit = async () => {
        let formdata = new FormData();
        formdata.append("work_hours", week_hours);
        formdata.append("week_no", weeks_no !== undefined ? weeks_no: "week 1");
        formdata.append("descr", descr);
        formdata.append("task_for", window.localStorage.getItem("std_usr") ? window.localStorage.getItem("std_usr"):"");

        let bodyContent = formdata;

        let script = {
            method: "POST",
            url: `${baseURL}post_logbook.php`,
            data: bodyContent

        }

        try {
            const request = axios.request(
                script
            );
            console.log((await request).data);
            if((await request).data.status === 200){
                toast.success("project added Successiful");
                getStudentDetails();
                setVisible(false);
            }else{

                toast.error("Error\n"+(await request).data.message);
            }
        } catch (error) {
            toast.error("something went Wrong\n"+ error);
        }

    }
    const changeTime = (data) => {
        const changes = (new Date(data)).toDateString().split(" ")[0].toLocaleUpperCase();
        // console.log(changes)
        let returning = "";
        switch (changes) {
            case "MON":
                returning = "Monday";
                break;
            case "TUE":
                returning = "Tuesday";
                break;
            case "WED":
                returning = "Wednesday";
                break;
            case "THU":
                returning = "Thursday";
                break;
            case "FRI":
                returning = "Friday";
                break;
            case "SAT":
                returning = "Saturday";
                break;
            case "SUN":
                returning = "Sunday";
                break;
            default:
                returning = changes;
                break;
        }
        return returning.toLowerCase();
    }
    const currentDate = () => {
        return (new Date()).toDateString();
    }
    const [seelog, setSeelog] = React.useState(false);
    const check_for_arrival = async() => {
        let formdata = new FormData();
        formdata.append("student", window.localStorage.getItem("std_usr") ? window.localStorage.getItem("std_usr"):"");

        const bodydata = formdata;

        try {
            const requests = axios.request({
                url:`${baseURL}check_exist_note.php`,
                method:"POST",
                data: bodydata
            });
            (await requests).data.status === 200? setSeelog(true):""
        } catch (error) {
            toast.error(error);
        }
    }
    React.useEffect(() => {check_for_arrival()},[]);
    return (
        <div className='view user_board'>
            <div className="flex_box" style={{
                '--width': '240px', '--width-two': 'auto', '--height': '100vh'
            }}>
                <div className="dark_overlay" style={{
                    display: `${!visible ? 'none' : 'block'}`
                }}>
                    <Dialog header="" className='white_box modal_box' visible={visible} style={{ width: '50vw' }} onHide={() => setVisible(false)}>
                        <div className="page-title text-bold" style={{
                            borderBottom: '1.5px solid var(--shadow_color)',
                            paddingBottom: '10px'
                        }}>
                            Fill Log Book For <span className="" style={{
                                color: "green"
                            }}>( {currentDate()} )</span>
                        </div>


                        <div className="input m-1">

                            <div className="flex_2">
                                <div className="input m-1">
                                    <div className="span">
                                        <h4 className="text-muted page-title text-bold">Work Hours <span>*</span></h4>
                                    </div>
                                    <input type="number" className='primary' value={week_hours} onChange={(e) => setWeek_hours(e.target.value)} />
                                </div>
                                <div className="input m-1">
                                    <div className="span">
                                        <h4 className="text-muted page-title text-bold">Week No <span>*</span></h4>
                                    </div>
                                    <select style={{
                                        marginTop: "10px",
                                        padding: "11px",
                                        fontSize: "small"
                                    }} name="" id=""  value={weeks_no} onChange={(e) => setWeeks_no(e.target.value)} >
                                        {
                                            the_weeks.map((data, key) => <option key={key} value={data}>{data}</option>)
                                        }
                                    </select>
                                </div>
                            </div>
                            <div className="input m-1">
                                    <div className="span">
                                        <h4 className="text-muted page-title text-bold">Activity Performed / Task <span>*</span></h4>
                                    </div>
                                    <textarea name="" id=""rows="5" value={descr} onChange={(e) => setDescr(e.target.value)} ></textarea>
                                </div>
                        </div>

                        <div className="button text-center justify-center m-2">
                            <button type="butto" className="flex text-sharp text-center text-white" outlined style={{
                                backgroundColor: 'var(--ocean)', height: '45px', fontWeight: 300, width: '120px',
                                 textAlign: 'center', position:'relative', left:'50%',transform:"translateX(-50%)"
                            }}  onClick={handleSubmit}> <PlusCircle className='ms-2 mt-1 me-1'/> Save</button>
                        </div>
                    </Dialog>
                </div>
                <div className="left-screen-view">
                    <Sidebar />
                </div>
                <div className="right-screen-view">
                    <BarTop />
                    <Topbar
                        headline={"Log Books"}
                        subheadline={"Students"}
                        note={""}
                    />
                    <div className="border_box">
                       {
                        seelog?  <div className="">
                        <div className="button ps-4 pt-4" style={{
                            maxWidth: '420px',
                            position: 'relative',
                            display: "grid",
                            gridTemplateColumns: "auto auto"
                        }}>
                            <Button className={'active-btn'} style={{
                                display: 'flex'
                            }} onClick={() => setVisible(!false)}><i><PatchPlusFill /></i> <span className='ml-2 -mt-1' style={{
                                marginTop: '-2px'
                            }}>Fill LogBook</span></Button>
                            <Button className={'active-btn'} style={{
                                display: 'flex'
                            }}><i><CloudDownloadFill /></i> <span className='ml-2 -mt-1' style={{
                                marginTop: '-2px'
                            }}>Download LogBook</span></Button>
                        </div>
                        <Box sx={{ width: '100%' }}>
                            <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                                <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
                                    {
                                        weeks.weeks.map((data, key) => <Tab label={data} {...a11yProps(0)} key={key} className='text-capitalize' onClick={() => getStudentDetails(data)} />)
                                    }
                                </Tabs>
                            </Box>
                            {
                                weeks.weeks.map((data, key) => <ULogBook value={value} index={key} key={key}>
                                    {
                                        logbooks.logbook !== undefined && logbooks.logbook?.length > 0 ? logbooks.logbook.map((data, key) =>
                                            <div className="jornal_list">
                                                <div className="jt-title">
                                                    <span>{(data.date_created).replace("-", "/").replace("-", "/")}</span>
                                                </div>
                                                <div className="jt-line">
                                                    <div className="ball"></div>
                                                </div>
                                                <div className="jt-content">
                                                    <h4 className="page-title capitalize text-bold">Day: {changeTime(data.date_created)}</h4>
                                                    <h4 className="page-title capitalize  mt-2">Work Hours: {data.work_hours}</h4>
                                                    <br />
                                                    <span className='capitalize mt-2' style={{
                                                        color: "var(--muted)"
                                                    }}>{data.task_description}</span>
                                                </div>

                                            </div>
                                        ) : <Loading />

                                    }
                                </ULogBook>)
                            }

                        </Box>
                    </div>:
                    <div className="center text-center text-ellipsis p-5 m-5 card text-sm">
                        You Need to Upload Arrival Note first !
                    </div>
                       }
                    </div>
                </div>
            </div>
        </div>
    );
}
