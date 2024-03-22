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
        forma.append("week", data? data:"week 1");
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
                        headline={"Log Books"}
                        subheadline={"Students"}
                        note={""}
                    />
                    <div className="border_box">
                        <div className="">
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
                                            // console.log()
                                            // logbooks.logbook !== undefined && logbooks.logbook?.length > 0 ? console.log(logbooks.logbook):<Loading/>

                                        }
                                    </ULogBook>)
                                }

                            </Box>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
