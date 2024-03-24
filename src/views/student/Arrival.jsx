import React, { useEffect, useRef, useState } from 'react'
import { BarTop, Sidebar, Topbar } from '../../components'
import { Container } from 'react-bootstrap'
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Button } from 'primereact/button';
import { Tooltip } from 'primereact/tooltip';
import { CloudArrowDownFill, CloudArrowUpFill, FileArrowUp, FilePdfFill, FiletypeXlsx, Filter, Plus, PlusCircle, PlusLg } from 'react-bootstrap-icons';
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

const ArrivalNote = () => {
    const [project, setProject] = useState([]);
    const [filters, setFilters] = useState(null);
    const [selected, setSelected] = useState(null);
    const [globalFilterValue, setGlobalFilterValue] = useState('');
    const [visible, setVisible] = useState(false);
    const storage = window.localStorage;
    const handleSubmitSelection = async (event, id) => {
        let forma = (new FormData());
        forma.append("studentId", storage.getItem("std_usr"));
        let bodydata = forma;
        try {
            const requests = axios.request({
                method: "POST",
                url: `${baseURL}con_std.php`,
                data: bodydata
            });
            const { academic, about, selection } = (await requests).data[0];

            if (selection.length > 0) {
                toast.error("Sorry, we see that your selection board is not empty... You can't add more!");

            } else {
                let newData = (new FormData());
                newData.append("student", storage.getItem("std_usr"));
                newData.append("selection", event.data.sn);


                let bodydata = newData;
                try {
                    const requests = axios.request({
                        method: "POST",
                        url: `${baseURL}add_select.php`,
                        data: bodydata
                    });
                    console.log((await requests).data);
                    if ((await requests).data.status === 200) {
                        toast.dismiss(id.id);
                        toast.success("Selection Success");
                        setTimeout(() => {
                            toast.dismiss();
                        }, 3000);
                    } else { toast.error("Something went wrong, try again!"); }
                } catch (error) {
                    toast.error(`Something went wrong\n${error}`);
                }
            }
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
                                Are you Sure! Do you  wan't to select
                                <div className="">
                                    Name: <span className=" text-indigo-500">{event.data.name}</span>, Category: <span className=" text-indigo-500">{event.data.category}</span> at
                                    <br />
                                    <span className=" ">{event.data.region}</span>  <span className=" ">[{event.data.supervisor}]</span>

                                </div>
                            </p>
                        </div>
                    </div>
                </div>
                <div className="flex border-l border-gray-200">
                    <button
                        onClick={() => handleSubmitSelection(event, t)}
                        className="w-full border border-transparent rounded-none rounded-r-lg p-4 flex items-center justify-center text-sm font-medium text-indigo-600 hover:text-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    >
                        Accept
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
        { field: 'student', header: 'Student Name' },
        { field: 't_number', header: 'Registration' },
        { field: 'programme', header: 'Programme' },
        { field: 'place', header: 'Place' },
        { field: 'area', header: 'Area' },
        { field: 'region', header: 'Region' },
        { field: 'district', header: 'District' },
        { field: 'phone', header: 'Phone' }
    ];
    const exportColumns = cols.map((col) => ({ title: col.header, dataKey: col.field }));

    const getModulesDetails = async () => {
        let formadata = new FormData();
        formadata.append("studentId", window.localStorage.getItem("std_usr") ? window.localStorage.getItem("std_usr") : "");
        const bodydata = formadata;
        try {
            const requests = axios.request({
                method: "POST",
                url: `${baseURL}arrival_data.php`,
                data: bodydata
            }); setProject((await requests).data.arrival);
            console.log((await requests).data.arrival);
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
    const [datatook, setDatatook] = useState();
    const handleClickOpen = () => {
        let filedata = document.querySelector("input[type='file']");
        filedata.click();
    }
    const getClickedData = async () => {
        if (datatook !== undefined) {
            try {
                const storage = window.localStorage.getItem("std_usr");
                let fields = new FormData();
                fields.append("studentId", storage ? storage :"");
                fields.append("uploads", datatook);

                const bodydata = fields;

                const requests = axios.request({
                    method:"POST",
                    url:`${baseURL}arrival_note.php`,
                    data: bodydata
                });
                let status = (await requests).data.status;
                status === 200  ? toast.success("Your Upload Success!") : status === 303 ? toast.error("You  have already Submitted. You're not allowed to do twice!"): toast.error("Something went Wrong, Make sure your  file is a pdf");
            } catch (error) {
                toast.error(error);
            }
        } else {
            toast.error("you didn't Upload anything, Please Insert file first");
        }
    }
    return (
        <div className='view user_board studentprojects'>
            <Toaster ref={toast} position='top-right' color='white' />
            <div className="dark_overlay" style={{
                display: `${!visible ? 'none' : 'block'}`
            }}>
                <Dialog header="" className='white_box modal_box' visible={visible} style={{ width: '30vw' }} onHide={() => setVisible(false)}>
                    <input type="file" name="" id="" onChange={(e) => setDatatook(e.target.files[0])} hidden />
                    <h2 className="page-title text-bold pb-2 divider">
                        Upload Arrival Note
                    </h2>

                    <div className="flex center text-center justify-center align-center">
                        <div className="image" style={{
                            height: "150px",
                            width: "120px"
                        }} onClick={handleClickOpen}>
                            <img src="https://cdn-icons-png.flaticon.com/512/2956/2956800.png" alt="" />
                        </div>

                    </div>
                    <div className="flex center text-center justify-center align-center mb-2">
                        <Button className={'active-btn'} style={{
                            display: 'flex'
                        }} onClick={() => setVisible(!false)}><i><CloudArrowUpFill /></i> <span className='ml-2 -mt-1' style={{
                            marginTop: '-2px'
                        }} onClick={getClickedData}>Upload Arrival</span></Button>
                    </div>
                </Dialog>
            </div>
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

                                <div className="button p-4" style={{
                                    display: "grid",
                                    gridTemplateColumns: "auto 150px"
                                }}>
                                    <div className=""></div>
                                    <Button className={'active-btn'} style={{
                                        display: 'flex'
                                    }} onClick={() => setVisible(!false)}><i><CloudArrowUpFill /></i> <span className='ml-2 -mt-1' style={{
                                        marginTop: '-2px'
                                    }}>Upload Arrival</span></Button>
                                </div>

                                <DataTable ref={dt} value={project} paginator rows={5} rowsPerPageOptions={[5, 10, 25, 50]} emptyMessage="No Module found."
                                    paginatorTemplate="FirstPageLink PrevPageLink CurrentPageReport NextPageLink LastPageLink"
                                    currentPageReportTemplate="{first} to {last} of {totalRecords}" paginatorLeft={paginatorLeft} tableStyle={{ minWidth: '50rem' }} selectionMode='single' selection={selected} onSelectionChange={(e) => setSelected(e.value)} dataKey="id"
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

export default ArrivalNote