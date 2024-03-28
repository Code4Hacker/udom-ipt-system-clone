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
import { AutoComplete } from 'primereact/autocomplete';
import { Chips } from "primereact/chips";
import { useNavigate } from 'react-router-dom';

const SuperDashboard = () => {
  const [project, setProject] = useState([]);
  const [filters, setFilters] = useState(null);
  const [selected, setSelected] = useState(null);
  const [globalFilterValue, setGlobalFilterValue] = useState('');
  const [visible, setVisible] = useState(false);

  const navigate = useNavigate();


  const [Students, setStudents] = useState([]);
  const [selectedStudent, setSelectedStudent] = useState([]);
  const [filteredStudents, setFilteredStudents] = useState(null);

  const [Supervisors, setSupervisors] = useState([]);
  const [selectedSupervisor, setSelectedSupervisor] = useState(null);
  const [filteredSupervisors, setFilteredSupervisors] = useState(null);


  const [Domains, setDomains] = useState([]);
  const [selectedDomain, setselectedDomain] = useState(null);
  const [filteredDomains, setFilteredDomains] = useState(null);
  const [value, setValue] = useState([]);
  const p_categ = ["", "Industrial Practical Training(IPT)", "Final Year Project(FYP)"];



  const [title, setTitle] = useState();
  const [category, setCategory] = useState();
  const [domain, setDomain] = useState();
  const [supe, setSupe] = useState();
  const [descr, setDescr] = useState();
  const [year, setYear] = useState();
  const [remarks, setRemarks] = useState();
  const handleSubmit = async () => {
    let formdata = new FormData();
    let connects = "";
    for (let index = 0; index < selectedStudent.length; index++) {
      const element = selectedStudent[index].name;
      if (index >= selectedStudent.length - 1) {

        connects = connects.concat(element);
      } else {

        connects = connects.concat(element + ", ");
      }
    }
    console.log(connects);
    formdata.append("title", title);
    formdata.append("category", category);
    formdata.append("domain", selectedDomain.name);
    formdata.append("descr", descr);
    formdata.append("supervisor", selectedSupervisor.name);
    formdata.append("remarks", remarks);
    formdata.append("students", connects);
    formdata.append("years", year);

    let bodyContent = formdata;

    let script = {
      method: "POST",
      url: `${baseURL}add_projects.php`,
      data: bodyContent

    }
    console.log("remarks" + remarks + ", domain" + selectedDomain.name)

    try {
      const request = axios.request(
        script
      );
      console.log((await request).data);
      if ((await request).data.status === 200) {
        toast.success("project added Successiful");
        getModulesDetails();
        setVisible(false);
      } else {

        toast.error("Error\n" + (await request).data.message);
      }
    } catch (error) {
      toast.error("something went Wrong\n" + error);
    }

  }
  const search2 = (event) => {

    setTimeout(() => {
      let _filteredDomains;

      if (!event.query.trim().length) {
        _filteredDomains = [...Domains];
      }
      else {
        _filteredDomains = Domains.filter((Supervisor) => {
          // console.log("filtered", _filteredDomains)
          return Supervisor.name.toLowerCase().includes(event.query.toLowerCase());
        });
      }

      setFilteredDomains(_filteredDomains);
    }, 250);
  }

  const search3 = (event) => {

    setTimeout(() => {
      let _filteredSupervisors;

      if (!event.query.trim().length) {
        _filteredSupervisors = [...Supervisors];
      }
      else {
        _filteredSupervisors = Supervisors.filter((Supervisor) => {
          console.log("filtered", _filteredSupervisors)
          return Supervisor.name.toLowerCase().includes(event.query.toLowerCase());
        });
      }

      setFilteredSupervisors(_filteredSupervisors);
    }, 250);
  }
  const search = (event) => {

    setTimeout(() => {
      let _filteredStudents;

      if (!event.query.trim().length) {
        _filteredStudents = [...Students];
      }
      else {
        _filteredStudents = Students.filter((Supervisor) => {
          console.log("filtered", _filteredStudents)
          return Supervisor.name.toLowerCase().includes(event.query.toLowerCase());
        });
      }

      setFilteredStudents(_filteredStudents);
    }, 250);
  }
  document.querySelector(".p-autocomplete-token-label") ? document.querySelector(".p-autocomplete-token-label").innerHTML = document.querySelector(".p-autocomplete-token-label").innerHTML.substring(0, 2) + "..." : "";
  // for supervisor
  const getModulesSuper = async () => {
    try {
      const requests = axios.request({
        method: "POST",
        url: `${baseURL}supervisor.php`
      });
      setSupervisors((await requests).data);
    } catch (error) {
      toast.error(`Something went wrong\n${error}`);
    }
  }
  const superchange = (e) => {
    setSelectedSupervisor(e.value);
  }
  // for domain
  const getModulesDomain = async () => {
    try {
      const requests = axios.request({
        method: "POST",
        url: `${baseURL}domains.php`
      });
      setDomains((await requests).data);
    } catch (error) {
      toast.error(`Something went wrong\n${error}`);
    }
  }
  // for students
  const getModulesStd = async () => {
    try {
      const requests = axios.request({
        method: "POST",
        url: `${baseURL}student_names.php`
      });
      setStudents((await requests).data);
    } catch (error) {
      toast.error(`Something went wrong\n${error}`);
    }
  }
  useEffect(() => {
    getModulesStd();
    getModulesSuper();
    getModulesDomain();
  }, []);



  // const toast = useRef(null);

  const onRowSelect = (event) => {
    toast.success(`You've Select -> ${event.data.name}`);
    navigate(`${event.data.category}`)
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
    { field: 'name', header: 'Student Name' },
    { field: 'category', header: 'Registration Number' },
    { field: 'domain', header: 'Contact' },
    { field: 'description', header: 'Gender' },
    { field: 'supervisor', header: 'Region' },
    { field: 'remarks', header: 'District/City' },
    { field: 'students', header: 'Place Name' },
  ];
  const exportColumns = cols.map((col) => ({ title: col.header, dataKey: col.field }));

  const getModulesDetails = async () => {
    try {
      let formdata = new FormData();
      formdata.append("super", window.localStorage.getItem("super")? window.localStorage.getItem("super"):"");

      let bodydata = formdata;
      const requests = axios.request({
        method: "POST",
        url: `${baseURL}supervisor_std.php`,
        data: bodydata
      });
      console.log((await requests).data);
      let obj = new Object();
      let arr = new Array();
      for (let index = 0; index < (await requests).data.students.length; index++) {
        const element = (await requests).data.students[index];
        obj = {
          sn: index + 1,
          name: element.f_name + " " + element.m_name + " " + element.l_name,
          category: element.t_number,
          domain: element.mobile,
          description: element.gender,
          supervisor: element.region,
          remarks: element.district,
          students: element.place_name
        }
        arr.push(obj);
        setProject(arr);
      }
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

export default SuperDashboard