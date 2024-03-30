import React, { useEffect, useRef, useState } from 'react'
import { BarTop, Sidebar, Topbar } from '../../components'
import { Container } from 'react-bootstrap'
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Button } from 'primereact/button';
import { Tooltip } from 'primereact/tooltip';
import { FileArrowUp, FilePdfFill, FiletypeXlsx, Filter, Plus, PlusCircle, PlusLg } from 'react-bootstrap-icons';
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
import { useNavigate } from 'react-router';

const PlaceSelection = () => {
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
                    if((await requests).data.status === 200) {
                      toast.dismiss(id.id);
                      toast.success("Selection Success");
                      setTimeout(() => {
                        toast.dismiss();
                      }, 3000);
                    }else{toast.error("Something went wrong, try again!");}
                } catch (error) {
                    toast.error(`Something went wrong\n${error}`);
                }
            }
        } catch (error) {
            toast.error(`Something went wrong\n${error}`);
        }
    }
    const navigate  = useNavigate();
    const onRowSelect = (event) => {
        jQuery("td").css({
            "background-color": 'var(--light)'
        })
        jQuery(event.originalEvent.target).css({
            "background-color": 'var(--alice)'
        })
        navigate(`/selection_place/${event.data.remarks}_13_${event.data.students}_13_${event.data.supervisor}_13_${event.data.name}_13_${event.data.description}`);

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
        { field: 'category', header: 'Category' },
        { field: 'domain', header: 'Capacity' },
        { field: 'description', header: 'Branch' },
        { field: 'supervisor', header: 'Area' },
        { field: 'remarks', header: 'Region' },
        { field: 'students', header: 'District' }
    ];
    const exportColumns = cols.map((col) => ({ title: col.header, dataKey: col.field }));

    const getModulesDetails = async () => {
        try {
            const requests = axios.request({
                method: "POST",
                url: `${baseURL}place_selection.php`
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

    const header = (
        <div className="">
            <div className="flex justify-content-between">

                <Button type="button" className="mv_btn" outlined onClick={clearFilter} style={{ height: '40px' }}><Filter /> Clear</Button>
                {/* <Button type="button" className="mv_btn ms-5 mb-3" outlined onClick={() => setVisible(true)} style={{
                    backgroundColor: 'var(--ocean)', height: '45px'
                }}><Plus /> Add Student Project</Button> */}
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
                        headline={"Place of Selection"}
                        subheadline={"selections"}
                        note={""}
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

export default PlaceSelection