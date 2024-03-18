import React, { useEffect, useRef, useState } from 'react'
import { BarTop, Sidebar, Topbar } from '../../components'
import { Container } from 'react-bootstrap'
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Button } from 'primereact/button';
import { Tooltip } from 'primereact/tooltip';
import { ModuleModal } from '../../raws/ModuleSelection';
import { FileArrowUp, FilePdfFill, FiletypeXlsx, Filter } from 'react-bootstrap-icons';
import { FilterMatchMode, FilterOperator } from 'primereact/api';
import { InputText } from 'primereact/inputtext';
import toast, { Toaster } from 'react-hot-toast';
import jQuery from 'jquery';
import axios from 'axios';
import { baseURL } from '../../paths/base_url';


const Module = () => {
    const [student, setStudent] = useState([]);
    const [filters, setFilters] = useState(null);
    const [selected, setSelected] = useState(null);
    const [globalFilterValue, setGlobalFilterValue] = useState('');
    const [rowClick, setRowClick] = useState(true);

    // const toast = useRef(null);

    const onRowSelect = (event) => {
        toast.success(`You've Select -> ${event.data.name}`);
        jQuery("td").css({
            "background-color": 'var(--light)'
        });
        jQuery(event.originalEvent.target).css({
            "background-color": 'var(--alice)'
        });

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
        { field: 'seId', header: '#' },
        { field: 'module_name', header: 'Module Name' },
        { field: 'category', header: 'Category' },
        { field: 'session_time', header: 'Session' },
        { field: 'venue', header: 'Venue' },
        { field: 'lab', header: 'LAB' },
        { field: 'capacity', header: 'Capacity' },
        { field: 'who_takes', header: 'Choosed' },
        { field: 'act2', header: '' },
    ];
    const exportColumns = cols.map((col) => ({ title: col.header, dataKey: col.field }));
    const getModulesDetails = async () => {
        try {
            const requests = axios.request({
                method: "POST",
                url: `${baseURL}modules.php`
            });
            console.log((await requests).data);
            setStudent((await requests).data)
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

                doc.autoTable(exportColumns, student);
                doc.save('student.pdf');
            });
        });
    };

    const exportExcel = () => {
        import('xlsx').then((xlsx) => {
            const worksheet = xlsx.utils.json_to_sheet(student);
            const workbook = { Sheets: { data: worksheet }, SheetNames: ['data'] };
            const excelBuffer = xlsx.write(workbook, {
                bookType: 'xlsx',
                type: 'array'
            });

            saveAsExcelFile(excelBuffer, 'student');
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

                <Button type="button" className="mv_btn" outlined onClick={clearFilter} ><Filter /> Clear</Button>
                <span className="p-input-icon-left" style={{ color: 'var(--dark)' }}>
                    Search:
                    <i className="pi pi-search " />
                    <InputText value={globalFilterValue} onChange={onGlobalFilterChange} className='ms-2' placeholder="Any Column" />
                </span>
            </div>

        </div>
    );
    return (
        <div className='view user_board'>
            <Toaster ref={toast} position='top-right' color='white' />
            <div className="flex_box" style={{
                '--width': '240px', '--width-two': 'auto', '--height': '100vh'
            }}>
                <div className="left-screen-view">
                    <Sidebar />
                </div>
                <div className="right-screen-view">
                    <BarTop />
                    <Topbar
                        headline={"Welcome to module selection"}
                        subheadline={"Modules"}
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

                                <DataTable ref={dt} value={student} paginator rows={5} filters={filters} globalFilterFields={['module_name', 'category', 'seId', 'session_time', 'venue', 'lab', 'who_takes']} rowsPerPageOptions={[5, 10, 25, 50]} emptyMessage="No Module found."
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

export default Module