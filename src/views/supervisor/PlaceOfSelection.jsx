import React, { useEffect, useRef, useState } from 'react'
import { BarTop, Sidebar, Topbar } from '../../components'
import { Container } from 'react-bootstrap'
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Button } from 'primereact/button';
import { Tooltip } from 'primereact/tooltip';
import { ChatDots, ChatDotsFill, FileArrowUp, FilePdfFill, FiletypeXlsx, Filter, Plus, PlusCircle, PlusLg } from 'react-bootstrap-icons';
import { FilterMatchMode, FilterOperator } from 'primereact/api';
import { InputText } from 'primereact/inputtext';
import toast, { Toaster } from 'react-hot-toast';
import jQuery from 'jquery';
import studentRaws from "../../raws/studentprojects.json";
import { Dialog } from 'primereact/dialog';
import { Divider } from 'primereact/divider';
import axios from 'axios';
import { baseURL } from '../../paths/base_url';
import { udom_logo } from '../../assets';

const PlaceView = () => {
    const [project, setProject] = useState([]);
    const [filters, setFilters] = useState(null);
    const [selected, setSelected] = useState(null);
    const [globalFilterValue, setGlobalFilterValue] = useState('');
    const [visible, setVisible] = useState(false);
    const storage = window.localStorage;
    const handleSubmitSelection = async (event, id, name) => {
        try {

            let headersList = {
                "Accept": "*/*",
                "User-Agent": "Thunder Client (https://www.thunderclient.com)",
                "Content-Type": "application/json",
                "Authorization": "Basic Yjc1N2NiYmZmZDgwMWM1MzpNemM0TWpWalpUVXdNalZqWldVeFl6RmpPRGcwTWpsbU5ESTJNbUl4TW1ObFpEQXlPRFV5WTJFeE9XTTNOek0wTURnM1l6TXpaR0ZtWVRRd1kyVTNNZz09"
            }

            let bodyContent = JSON.stringify({
                "source_addr": "INFO",
                "schedule_time": "",
                "encoding": "0",
                "message": `Attention!, We're Reminding you  (${(name).toUpperCase()}) to submit student Assesments at https://geminichild.netlify.app token key 540344. Thank you`,
                "recipients": [
                    {
                        "recipient_id": 1,
                        "dest_addr": id
                    }
                ]
            });

            let reqOptions = {
                url: "https://apisms.beem.africa/v1/send",
                method: "POST",
                headers: headersList,
                data: bodyContent,
            }
            let response = await axios.request(reqOptions);
            console.log(response.data.code);
            if (response.data.code === 100) {
                toast.remove()
                toast.success(response.data.message);
            } else {
                toast.remove()
                toast.error(response.data.message + "\nTry again!, ")
            }
            // const { academic, about, selection } = (await requests).data[0];

            // if (selection.length > 0) {
            //     toast.error("Sorry, we see that your selection board is not empty... You can't add more!");

            // } else {
            //     let newData = (new FormData());
            //     newData.append("student", storage.getItem("std_usr"));
            //     newData.append("selection", event.data.sn);


            //     let bodydata = newData;
            //     try {
            //         const requests = axios.request({
            //             method: "POST",
            //             url: `${baseURL}add_select.php`,
            //             data: bodydata
            //         });
            //         console.log((await requests).data);
            //         if ((await requests).data.status === 200) {
            //             toast.dismiss(id.id);
            //             toast.success("Selection Success");
            //             setTimeout(() => {
            //                 toast.dismiss();
            //             }, 3000);
            //         } else { toast.error("Something went wrong, try again!"); }
            //     } catch (error) {
            //         toast.error(`Something went wrong\n${error}`);
            //     }
            // }
        } catch (error) {
            toast.error(`Something went wrong\n${error}`);
        }
    }
    const onRowSelect = (event) => {
        toast.custom((t) => (
            <div
                className={`${t.visible ? 'animate-enter' : 'animate-leave'
                    } max-w-md w-full bg-white shadow-lg rounded-lg pointer-events-auto flex ring-1 ring-black ring-opacity-5`}
            >
                <div className="flex-1 w-0 p-4">
                    <div className="flex items-start">
                        <div className="flex-shrink-0 pt-0.5">
                            <img
                                className="h-10 w-10 rounded-full"
                                src={udom_logo}
                                alt=""
                            />
                        </div>
                        <div className="ml-3 flex-1">
                            <p className="text-sm font-medium text-gray-900">
                                {storage.getItem("u_name") ? storage.getItem("u_name") : "Paulo Michael"}
                            </p>
                            <p className="mt-1 text-sm text-gray-500">
                                After Click send you will alert
                                <div className="">
                                    Contact: <span className=" text-indigo-500">{event.data.contact}</span> from  <span className=" text-indigo-500">{event.data.name}</span> at
                                    <br />
                                    <span className=" ">{event.data.region}</span>  <span className=" ">[{event.data.supervisor}] to Send student assements</span>

                                </div>
                            </p>
                        </div>
                    </div>
                </div>
                <div className="flex border-l border-gray-200">
                    <button
                        onClick={() => handleSubmitSelection(event, event.data.contact, event.data.name)}
                        className="w-full border border-transparent rounded-none rounded-r-lg p-4 flex items-center justify-center text-sm font-medium text-indigo-600 hover:text-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    >
                        Send It
                    </button>
                </div>
            </div>
        ), { duration: 10000 })
        jQuery("td").css({
            "background-color": 'var(--light)'
        })
        jQuery(event.originalEvent.target).css({
            "background-color": 'var(--alice)'
        })

    };

    const onRowUnselect = (event) => {
        toast.error(`You've Unselect -> ${event.data.name}`);
        jQuery("td").css({
            "background-color": 'var(--light)'
        })
        jQuery(event.originalEvent.target).css({
            "background-color": 'var(--alice)'
        })

    };
    const dt = useRef(null);

    const cols = [
        { field: 'sn', header: '#' },
        { field: 'name', header: 'Place Name' },
        { field: 'description', header: 'Branch' },
        { field: 'supervisor', header: 'Area' },
        { field: 'remarks', header: 'Region' },
        { field: 'contact', header: 'Contact' }
    ];
    const exportColumns = cols.map((col) => ({ title: col.header, dataKey: col.field }));

    const getModulesDetails = async () => {
        try {
            const requests = axios.request({
                method: "GET",
                url: `${baseURL}place_selection.php?supervisor=${window.localStorage.super ? window.localStorage.super : "UNDIFINED"}`
            }); setProject((await requests).data);
        } catch (error) {
            toast.error(`Something went wrong\n${error}`);
        }
    }
    useEffect(() => {
        getModulesDetails();
        initFilters();
    }, []); // eslint-disable-line react-hooks/exhaustive-deps

    const exportCSV = (selectionOnly) => {
        dt.current.exportCSV({ selectionOnly });
    };

    const exportPdf = () => {
        import('jspdf').then((jsPDF) => {
            import('jspdf-autotable').then(() => {
                const doc = new jsPDF.default(0, 0);

                doc.autoTable(exportColumns, project);
                doc.save('project.pdf');
            });
        });
    };

    const exportExcel = () => {
        import('xlsx').then((xlsx) => {
            const worksheet = xlsx.utils.json_to_sheet(project);
            const workbook = { Sheets: { data: worksheet }, SheetNames: ['data'] };
            const excelBuffer = xlsx.write(workbook, {
                bookType: 'xlsx',
                type: 'array'
            });

            saveAsExcelFile(excelBuffer, 'project');
        });
    };

    const saveAsExcelFile = (buffer, fileName) => {
        import('file-saver').then((module) => {
            if (module && module.default) {
                let EXCEL_TYPE = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
                let EXCEL_EXTENSION = '.xlsx';
                const data = new Blob([buffer], {
                    type: EXCEL_TYPE
                });

                module.default.saveAs(data, fileName + '_export_' + new Date().getTime() + EXCEL_EXTENSION);
            }
        });
    };

    const paginatorLeft = <div className="flex align-items-center justify-content-end  me-5" style={{
        width: '100%'
    }}>
        <Button type="button" className='mv_btn_2' rounded onClick={() => exportCSV(false)} data-pr-tooltip="CSV" ><i className="text-large"><FileArrowUp /></i></Button>
        <Button type="button" className='mv_btn_2' icon="pi pi-file-excel" severity="success" rounded onClick={exportExcel} data-pr-tooltip="XLS" >
            <FiletypeXlsx />
        </Button>
        <Button type="button" className='mv_btn_2' icon="pi pi-file-pdf" severity="warning" rounded onClick={exportPdf} data-pr-tooltip="PDF" >
            <FilePdfFill />
        </Button>
    </div>
    const paginatorRight = <Button type="button" className='mv_btn' text >Next</Button>;


    const clearFilter = () => {
        initFilters();
    };

    const onGlobalFilterChange = (e) => {
        const value = e.target.value;
        let _filters = { ...filters };

        _filters['global'].value = value;

        setFilters(_filters);
        setGlobalFilterValue(value);
    };

    const initFilters = () => {
        setFilters({
            global: { value: null, matchMode: FilterMatchMode.CONTAINS },
            category: { operator: FilterOperator.AND, constraints: [{ value: null, matchMode: FilterMatchMode.STARTS_WITH }] }
        });
        setGlobalFilterValue('');
    };
    // const handleTwillio = async () => {
    //     const accountSid = 'AC09e824342c3078987f24c223eb5c7d4f';
    //     const authToken = 'f94ce6e51eb19200d7c04fef4884f434';  // Replace with your actual auth token

    //     const url = `https://api.twilio.com/2010-04-01/Accounts/${accountSid}/Messages.json`;
    //     const headers = {
    //         'Authorization': 'Basic ' + btoa(`${accountSid}:${authToken}`),
    //         'Content-Type': 'application/x-www-form-urlencoded',
    //     };
    //     let arra = new Array();
    //     let obj = new Object();
    //     let array_token = new Array();

    //     for (let i = 0; i < project.length; i++) {
    //         const element = project[i].contact;
    //         let random = Math.floor((Math.random() * 10_000) + 1);
    //         const data = new URLSearchParams({
    //             Body: `Attention!, We're Reminding you to submit student Assesments at https://geminichild.netlify.app token key ${random}. Thank you`,
    //             From: '+17626002978',  // Your Twilio phone number
    //             To: `+${element}`,   // Recipient's phone number
    //         });
    //         console.log(random)
    //         try {
    //             const response = await axios.post(url, data, { headers });
    //             console.log('Message sent:', response.data);
    //         } catch (error) {
    //             console.error('Error sending message:', error);
    //         }
    //         arra.push(obj);

    //     }

    // }
    const handleSentSessions = async () => {
        let arra = new Array();
        let obj = new Object();
        let array_token = new Array();
        for (let i = 0; i < project.length; i++) {
            const element = project[i].contact;
            let random = Math.floor((Math.random() * 10_000) + 1);

            try {

                let headersList = {
                    "Content-Type": "application/json",
                    "Authorization": `Basic ${import.meta.env.VITE_AUTH}`
                }

                let bodyContent = JSON.stringify({
                    "source_addr": "INFO",
                    "schedule_time": "",
                    "encoding": "0",
                    "message": `Attention!, We're Reminding you to submit student Assesments at https://geminichild.netlify.app token key ${random}. Thank you`,
                    "recipients": [{
                        "recipient_id": (i + 1),
                        "dest_addr": element
                    }]
                });

                let reqOptions = {
                    url: "https://apisms.beem.africa/v1/send",
                    method: "POST",
                    headers: headersList,
                    data: bodyContent,
                }
                let response = await axios.request(reqOptions);
                console.log(response.data.code);
                if (response.data.code === 100) {
                    toast.remove()
                    toast.success(response.data.message);
                    let formdata = new FormData();

                    formdata.append("tokeNumber", random);

                    const bodydata = formdata;
                    const send_to_db = await axios.request({
                        method:"POST",
                        url:`${baseURL}token_auth.php`,
                        data: bodydata
                    });
                    console.log(send_to_db.data);
                    console.log(random);
                } else {
                    toast.remove()
                    toast.error(response.data.message + "\nTry again!, ")
                }
            } catch (error) {
                toast.error(`Something went wrong\n${error}`);
            }
        }

    }
    const header = (
        <div className="">
            <div className="flex justify-content-between">

                <Button type="button" className="mv_btn" outlined onClick={clearFilter} style={{ height: '40px' }}><Filter /> Clear</Button>
                <Button type="button" className="mv_btn ms-5 mb-3" outlined onClick={handleSentSessions} style={{
                    backgroundColor: 'var(--ocean)', height: '45px'
                }}><ChatDotsFill /> Sent Submittion Notification</Button>
                <span className="p-input-icon-left text-end mb-4" style={{ color: 'var(--dark)', marginTop: '-10px' }}>

                    <br />
                    Search:
                    <i className="pi pi-search " />
                    <InputText value={globalFilterValue} onChange={onGlobalFilterChange} className='ms-2' placeholder="Any Column" />
                </span>
            </div>

        </div>
    );

    return (
        <div className='view user_board studentprojects'>
            <Toaster ref={toast} position='top-right' color='white' />
            <div className="flex_box" style={{
                '--width': '240px', '--width-two': 'auto', '--height': '100vh'
            }}>
                <div className="left-screen-view" style={{
                    position: 'relative',
                    zIndex: "50"
                }}>
                    <Sidebar />
                </div>
                <div className="right-screen-view">
                    <BarTop />
                    <Topbar
                        headline={"Student Projects Management"}
                        subheadline={"Projects"}
                        note={"2022/2023"}
                    />
                    <div className="" style={{
                        paddingTop: '20px'
                    }}>
                        <div className="border_box" style={{
                            paddingLeft: '10px'
                        }}>
                            <div className="data_table">
                                <Tooltip target=".export-buttons>button" position="bottom" />

                                <DataTable ref={dt} value={project} paginator rows={5} filters={filters} globalFilterFields={['name', 'category', 'sn', 'description', 'domain', 'supervisor', 'remarks', 'students', 'year']} rowsPerPageOptions={[5, 10, 25, 50]} emptyMessage="No Module found."
                                    paginatorTemplate="RowsPerPageDropdown FirstPageLink PrevPageLink CurrentPageReport NextPageLink LastPageLink"
                                    currentPageReportTemplate="{first} to {last} of {totalRecords}" paginatorLeft={paginatorLeft} header={header} tableStyle={{ minWidth: '50rem' }} selectionMode='single' selection={selected} onSelectionChange={(e) => setSelected(e.value)} dataKey="id"
                                    onRowSelect={onRowSelect} onRowUnselect={onRowSelect} metaKeySelection={false}>
                                    {cols.map((col) => (
                                        <Column key={col.field} className="border_box p-4" style={{ borderColor: "var(--dark) !important" }} sortable field={col.field} header={col.header} />
                                    ))}
                                </DataTable>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default PlaceView