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

const StudentProjects = () => {
    const [project, setProject] = useState([]);
    const [filters, setFilters] = useState(null);
    const [selected, setSelected] = useState(null);
    const [globalFilterValue, setGlobalFilterValue] = useState('');
    const [visible, setVisible] = useState(!false);
    // const toast = useRef(null);

    const onRowSelect = (event) => {
        // toast.current.show({ severity: 'success', summary: 'Product Selected', detail: `Name: ${event.data.name}`, life: 3000 });
        toast.success(`You've Select -> ${event.data.name}`);
        jQuery("td").css({
            "background-color": 'var(--light)'
        })
        jQuery(event.originalEvent.target).css({
            "background-color": 'var(--alice)'
        })

    };

    const onRowUnselect = (event) => {
        // toast.current.show({ severity: 'warn', summary: 'Product Unselected', detail: `Name: ${event.data.name}`, life: 3000 });
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
        { field: 'name', header: 'Project Title' },
        { field: 'category', header: 'Project Category' },
        { field: 'domain', header: 'Project Domain' },
        { field: 'description', header: 'Project Description' },
        { field: 'supervisor', header: 'Project Supervisor' },
        { field: 'remarks', header: 'Project Remarks' },
        { field: 'students', header: 'Participating Students' },
        { field: 'year', header: 'Year' },
    ];
    const exportColumns = cols.map((col) => ({ title: col.header, dataKey: col.field }));

    useEffect(() => {
        let fulled = [];
        let obj = new Object();
        let arr = new Array();
        const data = () => {
            for (let index = 0; index < studentRaws.projects.length; index++) {
                const element = studentRaws.projects[index];
                // console.log(element.students)

                for (let std = 0; std < element.students.length; std++) {
                    const el = element.students[std].student;
                    fulled.push(el);

                }
                obj = {
                    sn: element.sn,
                    name: element.name,
                    category: element.category,
                    domain: element.domain,
                    description: element.description,
                    supervisor: element.supervisor,
                    students: fulled.join(", \n"),
                    year: element.year
                }
                // fulled = fulled.concat(" \n\n\n\n\n")
                arr.push(obj);
            }
            console.log(arr);
        }
        data();
        setProject(arr);
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
                <Button type="button" className="mv_btn ms-5 mb-3" outlined onClick={() => setVisible(true)} style={{
                    backgroundColor: 'var(--ocean)', height: '45px'
                }}><Plus /> Add Student Project</Button>
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
            {/* <Button label="Show" icon="pi pi-external-link" onClick={() => setVisible(true)} /> */}
            <div className="dark_overlay" style={{
                display: `${!visible ? 'none' : 'block'}`
            }}>
                <Dialog header="" className='white_box modal_box' visible={visible} style={{ width: '50vw' }} onHide={() => setVisible(false)}>
                    <h3 className="page-title text-bold" style={{
                        borderBottom: '1.5px solid var(--shadow_color)',
                        paddingBottom: '10px'
                    }}>
                        Add Student Project
                    </h3>


                    <div className="input m-1">
                        <div className="span">
                            <h4 className="text-muted page-title">Project Title <span>*</span></h4>
                        </div>
                        <input type="text" className='primary' />
                    </div>
                    <div className="flex_2">

                        <div className="input m-1">
                            <div className="span">
                                <h4 className="text-muted page-title">Project Domain <span>*</span></h4>
                            </div>
                            <input type="text" className='primary' />
                        </div>

                        <div className="input m-1">
                            <div className="span">
                                <h4 className="text-muted page-title">Supervisor <span>*</span></h4>
                            </div>
                            <input type="text" className='primary' />
                        </div>
                    </div>

                    <div className="flex_2">

                        <div className="input m-1">
                            <div className="span">
                                <h4 className="text-muted page-title">Project Category <span>*</span></h4>
                            </div>
                            <input type="text" className='primary' />
                        </div>

                        <div className="input m-1">
                            <div className="span">
                                <h4 className="text-muted page-title">Project Remarks <span>*</span></h4>
                            </div>
                            <input type="text" className='primary' />
                        </div>
                    </div>
                    <div className="input m-1">
                        <div className="span">
                            <h4 className="text-muted page-title">Select Student(s) <span>*</span></h4>
                        </div>
                        <input type="text" className='primary' />
                    </div>
                    <div className="input m-1">
                        <div className="span">
                            <h4 className="text-muted page-title">Project Description/Functionality <span>*</span></h4>
                        </div>
                        <textarea name="" id="" cols="30" rows="10" className='primary'></textarea>
                    </div>
                    <div className="button text-center">
                        <Button type="button" className="mv_btn btn_btn ms-5 mb-3 pt-0 pb-0 text-center text-sharp" outlined onClick={() => setVisible(false)} style={{
                            backgroundColor: 'var(--ocean)', height: '45px', fontWeight: 300, width: '100px', textAlign: 'center'
                        }}> <PlusCircle />Save</Button>
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

                                <DataTable ref={dt} value={project} paginator rows={5} filters={filters} globalFilterFields={['name', 'category', 'sn', 'balance', 'domain']} rowsPerPageOptions={[5, 10, 25, 50]} emptyMessage="No Module found."
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

export default StudentProjects