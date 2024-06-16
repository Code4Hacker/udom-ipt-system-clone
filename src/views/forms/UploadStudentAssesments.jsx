import axios from 'axios'
import React, { useEffect, useState } from 'react'
import toast from 'react-hot-toast';
import { baseURL } from '../../paths/base_url';
import { useNavigate } from 'react-router-dom';
import { DatePicker, Divider } from 'rsuite';
import { AutoComplete } from 'primereact/autocomplete';

const USAssesments = () => {
    // console.log(((new Date()).toISOString()).split("T")[0])
    const nav = useNavigate();

    // all fields
    const [fname, setFname] = useState("");
    const [tnumber, setTnumber] = useState("");
    const [degree, setDegree] = useState("");
    const [year, setYear] = useState("");
    const [address, setAddress] = useState("");
    const [branch, setBranch] = useState("");
    const [region, setRegion] = useState("");
    const [district, setDistrict] = useState("");
    const [from, setFrom] = useState(new Date());
    const [todate, setTodate] = useState(new Date());
    const [haswork, setHasWork] = useState("");
    const [position, setPosition] = useState("");
    const [duties, setDuties] = useState("");
    const [panctual, setPanctual] = useState("");
    const [regular, setRegular] = useState("");
    const [dressing, setDressing] = useState("");
    const [confidental, setConfidential] = useState("");
    const [accountability, setAccountability] = useState("");
    const [descpline, setDescpline] = useState("");
    const [cooperate, setCooperate] = useState("");
    const [aguidance, setAguidance] = useState("");
    const [readiness, setReadiness] = useState("");
    const [conscio, setConscio] = useState("");
    const [trustful, setTrustful] = useState("");
    const [caring, setCaring] = useState("");
    const [selfinit, setSelfinit] = useState("");
    const [decision, setDecision] = useState("");
    const [appearwork, setAppearwork] = useState("");
    const [reason, setReason] = useState("");
    const [whatare, setWhatare] = useState("");
    const [waslogbook, setWaslogbook] = useState("");
    const [knowledge, setKnowledge] = useState("");
    const [willingness, setWillingness] = useState("");
    const [utilise, setUtilise] = useState("");
    const [creativity, setCreativity] = useState("");
    const [confidence, setConfidence] = useState("");
    const [hardworking, setHardworking] = useState("");
    const [achievement, setAchievement] = useState("");
    const [whicharea, setWhicharea] = useState("");
    const [suggestion, setSuggestion] = useState("");

    const [show_next, setShow_next] = useState(false);
    const [Supervisors, setSupervisors] = useState([]);
    const [selectedSupervisor, setSelectedSupervisor] = useState(null);
    const [filteredSupervisors, setFilteredSupervisors] = useState(null);

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
    useEffect(() => {
        if (window.localStorage.sv_token !== undefined) {
            console.log(localStorage.sv_token);
        } else {
            nav('/ss_sign_in');
        }
        getModulesSuper();
    }, []);
    const handleAnother = async () => {
        window.localStorage.clear();
        nav('/ss_sign_in');

    };
    const handleSubmitStudent = async () => {
        const students = new Array();
        if(panctual > 3){
        } else if(regular > 3){} else if(dressing > 3){} else if(confidental > 3){} else if(accountability > 3){} else if(descpline > 3){} else if(cooperate > 3){} else if(readiness > 3){} else if(aguidance > 3){} else if(conscio > 3){} else if(trustful > 3){} else if(caring > 2){} else if(decision > 3){} else if(whatare > 80){} else if(knowledge > 15){} else if(willingness > 15){} else if(utilise > 5){} else if(creativity > 15){} else if(confidence > 5){} else if(hardworking > 10){}else if(selfinit > 3){
            
        } else if (fname && tnumber !== "" && degree !== "" && year !== "" && address !== "" && branch !== "" && region !== "" && district !== "" && from !== "" && todate !== "" && haswork !== "" && position !== "" && duties !== "" && panctual !== "" && regular !== "" && dressing !== "" && confidental !== "" && accountability !== "" && descpline !== "" && cooperate !== "" && aguidance !== "" && readiness !== "" && conscio !== "" && trustful !== "" && caring !== "" && selfinit !== "" && decision !== "" && appearwork !== "" && reason !== "" && whatare !== "" && waslogbook !== "" && knowledge !== "" && willingness !== "" && utilise !== "" && creativity !== "" && confidence !== "" && hardworking !== "" && achievement !== "" && whicharea !== "" && suggestion !== "" && selectedSupervisor !== null) {
            const construct = {
                fullname: fname,
                tnumber: tnumber,
                degree: degree,
                year: year,
                organization: address,
                branch: branch,
                region: region,
                district: district,
                from: from,
                todate: todate,
                haswork: haswork,
                position: position,
                duties: duties,
                panctual: panctual,
                regular: regular,
                dressing: dressing,
                confidental: confidental,
                accountability: accountability,
                descpline: descpline,
                cooperate: cooperate,
                aguidance: aguidance,
                readiness: readiness,
                conscio: conscio,
                trustful: trustful,
                caring: caring,
                selfinit: selfinit,
                decision: decision,
                appearwork: appearwork,
                reason: reason,
                whatare: whatare,
                waslogbook: waslogbook,
                knowledge: knowledge,
                willingness: willingness,
                utilise: utilise,
                creativity: creativity,
                confidence: confidence,
                hardworking: hardworking,
                achievement: achievement,
                whicharea: whicharea,
                suggestion: suggestion,
                super_id: localStorage.suid,
                supervisorId: selectedSupervisor.super
            }

            students.push(construct);

            const request = axios.request({
                url: `${baseURL}upload_student_assesments.php`,
                method: 'POST',
                data: JSON.stringify(students)
            });

            if ((await request).data.status === 200) {
                toast.success((await request).data.message);
            } else {
                toast.error((await request).data.message);
            }
        } else {
            toast.error("all fields required");
        }

    }
    return (
        <div className='main_upload'>
            {
                !show_next ?
                    <form method='dialog' className="flex_card">
                        <div className="">
                            <h1 className='text-center text-lg text-bold pt-5' style={{
                                fontWeight: '900'
                            }}> ASSESMENT FORM FOR FIELD SUPERVISOR/TRAINING OFFICER ( AFSO )</h1>
                            <div className="pt-5">

                                <span>Student Supervisor</span>
                            </div>
                            <div className="grid_50_50">
                                <div className="" style={{
                                    "--template": "auto"
                                }}>

                                    <div className="input m-1">
                                        <div className="span">
                                        </div>
                                        <AutoComplete className='auto_cp' field="name" value={selectedSupervisor} suggestions={filteredSupervisors} completeMethod={search3} onChange={superchange} style={{
                                            border: "none !important"

                                        }} dropdown />
                                    </div>
                                </div>
                                <div className="" style={{
                                    "--template": "auto"
                                }}>

                                </div>
                            </div>
                            <div className="pt-2">

                                <span>Student Information</span>
                            </div>

                            <div className="grid_50_50">
                                <div className="" style={{
                                    "--template": "auto 50%"
                                }}>
                                    <div className="">
                                        <input type="text" placeholder='Name of Student' value={fname} onChange={(e) => setFname(e.target.value)} required />
                                        <div className=""></div>
                                    </div>
                                    <div className="">
                                        <input type="text" placeholder='Registration Number' value={tnumber} onChange={(e) => setTnumber(e.target.value)} required />
                                        <div className=""></div>
                                    </div>
                                </div>
                                <div className="" style={{
                                    "--template": "auto 25%"
                                }}>
                                    <input type="text" placeholder='Degree Programme' value={degree} onChange={(e) => setDegree(e.target.value)} required />
                                    <input type="text" placeholder='Year of Study' value={year} onChange={(e) => setYear(e.target.value)} required />
                                </div>
                            </div>
                            <div className="pt-2">

                                <span>Address</span>
                            </div>
                            <div className="grid_50_50">
                                <div className="" style={{
                                    "--template": "auto 25%"
                                }}>
                                    <input type="text" placeholder='Name of Origanization/Company' value={address} onChange={(e) => setAddress(e.target.value)} required />
                                    <input type="text" placeholder='Branch Name' value={branch} onChange={(e) => setBranch(e.target.value)} required />
                                </div>
                                <div className="" style={{
                                    "--template": "auto 40%"
                                }}>
                                    <input type="text" placeholder='Region' value={region} onChange={(e) => setRegion(e.target.value)} required />
                                    <input type="text" placeholder='District' value={district} onChange={(e) => setDistrict(e.target.value)} required />
                                </div>
                            </div>
                            <div className="pl-24 pr-24">
                                <Divider />
                            </div>
                            <div className="pt-2">

                                <span>Student Complete period of IPT</span>
                            </div>
                            <div className="grid_50_50">
                                <div className="" style={{
                                    "--template": "100%"
                                }}>
                                    <input type='date' placeholder="From Date" value={from} onChange={(e) => setFrom(e.target.value)} required />
                                    <input type='date' placeholder="To Date" value={todate} onChange={(e) => setTodate(e.target.value)} required />
                                    <input type="text" placeholder='Has been working under Mr/Mrs...' value={haswork} onChange={(e) => setHasWork(e.target.value)} required />
                                    <input type="text" placeholder='Position' value={position} onChange={(e) => setPosition(e.target.value)} required />
                                </div>
                                <div className="" style={{
                                    "--template": "auto"
                                }}>
                                    <textarea name="" id="" style={{
                                        resize: 'none'
                                    }} placeholder='The duties assigned to him/her were: ' value={duties} onChange={(e) => setDuties(e.target.value)}></textarea>
                                </div>
                            </div>
                            <div className="pl-24 pr-24">
                                <Divider />
                            </div>
                            <div className="pt-2">

                                <span>Attitude Assesment ( Max Score Each (3)) </span>
                            </div>
                            <div className="grid_50_50">
                                <div className="" style={{
                                    "--template": "auto 25% auto"
                                }}>
                                    <div className="">
                                        <input type="number" placeholder='Pactuality' value={panctual} onChange={(e) => setPanctual(e.target.value)} required />
                                        <div className="" style={{ fontSize: 'x-small', textAlign: 'center', color: 'red' }}>{panctual > 3 ? "Only less than 3" : ""}</div>
                                    </div>
                                    <div className="">
                                        <input type="number" placeholder='Regular Attendance' value={regular} onChange={(e) => setRegular(e.target.value)} required />
                                        <div className="" style={{ fontSize: 'x-small', textAlign: 'center', color: 'red' }}>{regular > 3 ? "Only less than 3" : ""}</div>
                                    </div>
                                    <div className="">
                                        <input type="number" placeholder='Dressing Suitability' value={dressing} onChange={(e) => setDressing(e.target.value)} required />
                                        <div className="" style={{ fontSize: 'x-small', textAlign: 'center', color: 'red' }}>{dressing > 3 ? "Only less than 3" : ""}</div>
                                    </div>

                                </div>
                                <div className="" style={{
                                    "--template": "auto 40%"
                                }}>
                                    <div className="">
                                        <input type="number" placeholder='Confidentiality' value={confidental} onChange={(e) => setConfidential(e.target.value)} required />
                                        <div className="" style={{ fontSize: 'x-small', textAlign: 'center', color: 'red' }}>{confidental > 3 ? "Only less than 3" : ""}</div>
                                    </div>
                                    <div className="">
                                        <input type="number" placeholder='Accountability' value={accountability} onChange={(e) => setAccountability(e.target.value)} required />
                                        <div className="" style={{ fontSize: 'x-small', textAlign: 'center', color: 'red' }}>{accountability > 3 ? "Only less than 3" : ""}</div>
                                    </div>
                                </div>
                                <div className="" style={{
                                    "--template": "auto auto auto"
                                }}>
                                    <div className="">
                                        <input type="number" placeholder='Disciplined' value={descpline} onChange={(e) => setDescpline(e.target.value)} required />
                                        <div className="" style={{ fontSize: 'x-small', textAlign: 'center', color: 'red' }}>{descpline > 3 ? "Only less than 3" : ""}</div>
                                    </div>
                                    <div className="">
                                        <input type="number" placeholder='Cooperation' value={cooperate} onChange={(e) => setCooperate(e.target.value)} required />
                                        <div className="" style={{ fontSize: 'x-small', textAlign: 'center', color: 'red' }}>{cooperate > 3 ? "Only less than 3" : ""}</div>
                                    </div>
                                    <div className="">
                                        <input type="number" placeholder='Accepting Guidance' value={aguidance} onChange={(e) => setAguidance(e.target.value)} required />
                                        <div className="" style={{ fontSize: 'x-small', textAlign: 'center', color: 'red' }}>{aguidance > 3 ? "Only less than 3" : ""}</div>
                                    </div>
                                </div>
                                <div className="" style={{
                                    "--template": "auto auto auto"
                                }}>
                                    <div className="">
                                        <input type="number" placeholder='Readiness to accept responsibilities' value={readiness} onChange={(e) => setReadiness(e.target.value)} required />
                                        <div className="" style={{ fontSize: 'x-small', textAlign: 'center', color: 'red' }}>{readiness > 3 ? "Only less than 3" : ""}</div>
                                    </div>
                                    <div className="">
                                        <input type="number" placeholder='Time Management Consciousness' value={conscio} onChange={(e) => setConscio(e.target.value)} required />
                                        <div className="" style={{ fontSize: 'x-small', textAlign: 'center', color: 'red' }}>{conscio > 3 ? "Only less than 3" : ""}</div>
                                    </div>
                                    <div className="">
                                        <input type="number" placeholder='Trustfulness' value={trustful} onChange={(e) => setTrustful(e.target.value)} required />
                                        <div className="" style={{ fontSize: 'x-small', textAlign: 'center', color: 'red' }}>{trustful > 3 ? "Only less than 3" : ""}</div>
                                    </div>
                                </div>
                                <div className="" style={{
                                    "--template": "auto"
                                }}>
                                    <div className="">
                                        <input type="number" placeholder='( Max Score (2)) Caring of Organization resources (furniture, computer systems, etc... )' max={2} maxLength={2} value={caring} onChange={(e) => setCaring(e.target.value)} required />
                                        <div className="" style={{ fontSize: 'x-small', textAlign: 'center', color: 'red' }}>{caring > 2 ? "Only less than 2" : ""}</div>
                                    </div>
                                </div>
                                <div className="" style={{
                                    "--template": "auto auto"
                                }}>
                                    <div className="">
                                        <input type="number" placeholder='Self-initiative' value={selfinit} onChange={(e) => setSelfinit(e.target.value)} required />
                                        <div className="" style={{ fontSize: 'x-small', textAlign: 'center', color: 'red' }}>{selfinit > 3 ? "Only less than 3" : ""}</div>
                                    </div>
                                    <div className="">
                                        <input type="number" placeholder='Decision making capability' value={decision} onChange={(e) => setDecision(e.target.value)} required />
                                        <div className="" style={{ fontSize: 'x-small', textAlign: 'center', color: 'red' }}>{decision > 3 ? "Only less than 3" : ""}</div>
                                    </div>
                                </div>
                            </div>
                            <div className="pt-2">

                                <span>Attending Checkup</span>
                            </div>
                            <div className="grid_50_50">
                                <div className="" style={{
                                    "--template": "auto auto"
                                }}>
                                    <input type="text" placeholder='How many days did not appear for work ?' value={appearwork} onChange={(e) => setAppearwork(e.target.value)} required />
                                    <input type="text" placeholder="Where the reason of Student's absence communicated to you?" value={reason} onChange={(e) => setReason(e.target.value)} required />
                                </div>
                                <div className="" style={{
                                    "--template": "30% auto"
                                }}>
                                    <div className="">
                                        <input type="number" placeholder='What are they ?' value={whatare} onChange={(e) => setWhatare(e.target.value)} required />
                                        <div className="" style={{ fontSize: 'x-small', textAlign: 'center', color: 'red' }}>{whatare > 80 ? "Only less than 80" : ""}</div>
                                    </div>
                                    <input type="text" placeholder="Was the logbook submitted to you weekly for your comments and signature?" value={waslogbook} onChange={(e) => setWaslogbook(e.target.value)} required />
                                </div>
                            </div>
                            <Divider />
                            <div className="pt-2">

                                <span>Skills Assesment ( Max Score Each (3)) </span>
                            </div>
                            <div className="grid_50_50">
                                <div className="" style={{
                                    "--template": "auto"
                                }}>
                                    <div className="">
                                        <input type="number" placeholder='( 15 MARKS ) Knowledge and skills demostrated by the student' title='( 15 MARKS ) Knowledge and skills demostrated by the student' value={knowledge} onChange={(e) => setKnowledge(e.target.value)} required />
                                        <div className="" style={{ fontSize: 'x-small', textAlign: 'center', color: 'red' }}>{knowledge > 15 ? "Only less than 15" : ""}</div>
                                    </div>

                                </div>
                                <div className="" style={{
                                    "--template": "auto 40%"
                                }}>
                                    <div className="">
                                        <input type="number" placeholder='( 10 MARKS ) Willingness to accept challenges' title='( 10 MARKS ) Willingness to accept challenges' value={willingness} onChange={(e) => setWillingness(e.target.value)} required />
                                        <div className="" style={{ fontSize: 'x-small', textAlign: 'center', color: 'red' }}>{willingness > 10 ? "Only less than 10" : ""}</div>
                                    </div>
                                    <div className="">
                                        <input type="number" placeholder='( 5 MARKS ) Readiness to utilize his/her potential for the organisation' title='( 5 MARKS ) Readiness to utilize his/her potential for the organisation' value={utilise} onChange={(e) => setUtilise(e.target.value)} required />
                                        <div className="" style={{ fontSize: 'x-small', textAlign: 'center', color: 'red' }}>{utilise > 5 ? "Only less than 5" : ""}</div>
                                    </div>
                                </div>
                                <div className="" style={{
                                    "--template": "auto auto"
                                }}>
                                    <div className="">
                                        <input type="number" placeholder='( 15 MARKS ) Creativity (any new idea or solution provided by the student )' title='( 15 MARKS ) Creativity (any new idea or solution provided by the student )' value={creativity} onChange={(e) => setCreativity(e.target.value)} required />
                                        <div className="" style={{ fontSize: 'x-small', textAlign: 'center', color: 'red' }}>{creativity > 15 ? "Only less than 15" : ""}</div>
                                    </div>
                                    <div className="">
                                        <input type="number" placeholder='( 5 MARKS ) Confidence' title='( 5 MARKS ) Confidence' value={confidence} onChange={(e) => setConfidence(e.target.value)} required />
                                        <div className="" style={{ fontSize: 'x-small', textAlign: 'center', color: 'red' }}>{confidence > 5 ? "Only less than 5" : ""}</div>
                                    </div>
                                </div>
                                <div className="dp" style={{
                                    "--template": "auto"
                                }}>
                                    <div className="">
                                        <input type="number" placeholder='( 10 MARKS ) Hardworking' title='( 10 MARKS ) Hardworking' style={{
                                            width: '110% !important',
                                        }} value={hardworking} onChange={(e) => setHardworking(e.target.value)} required />
                                        <div className="" style={{ fontSize: 'x-small', textAlign: 'center', color: 'red' }}>{hardworking > 10 ? "Only less than 10" : ""}</div>
                                    </div>
                                </div>

                                <div className="dp" style={{
                                    "--template": "auto",
                                    marginRight: '10px'
                                }}>
                                    <span>What were student's achevements ( if any )?</span>
                                    <input type="text" placeholder='Write here' value={achievement} onChange={(e) => setAchievement(e.target.value)} required />
                                </div>
                                <div className="dp" style={{
                                    "--template": "auto"
                                }}>
                                    <span style={{ fontSize: '11px' }}>What is your readiness to take more (and how many) students for Industrial Practical
                                        Training in the future, and in which areas? (e.g Networking, Website design and
                                        development, System administration, Computer application training, Software
                                        development, Security, etc.)?</span>
                                    <input type="text" placeholder='Write here' value={whicharea} onChange={(e) => setWhicharea(e.target.value)} required />
                                </div>
                            </div>
                            <div className="dp" style={{
                                "--template": "auto",
                                marginRight: '10px'
                            }}>
                                <textarea name="" id="" placeholder="SUGGESTIONS FOR IMPROVEMENT ( eg. Were you satisfied by the student's Performance ? )" style={{
                                    height: '150px !important',
                                    resize: 'none'
                                }} value={suggestion} onChange={(e) => setSuggestion(e.target.value)}></textarea>
                            </div>

                        </div>
                        <div className="">

                            <div className="flex_box flex">
                                <button onClick={handleAnother}>Log Out</button>
                                <button onClick={handleSubmitStudent}>Complete</button>
                            </div>
                        </div>
                    </form> :
                    <div className="flex_card">

                        <div className="newbey">
                            <h1 className='m-5'>Supervisor/Training Officer's</h1>
                            <div className="grid_50_50">

                                <div className="" style={{
                                    "--template": "auto"
                                }}>
                                    <input type="text" placeholder='Name: ' max={2} maxLength={2} value={caring} onChange={(e) => setCaring(e.target.value)} required />
                                </div>
                                <div className="" style={{
                                    "--template": "auto"
                                }}>
                                    <input type="text" placeholder='Position: ' value={selfinit} onChange={(e) => setSelfinit(e.target.value)} required />
                                    <input type="email" placeholder='Email' value={decision} onChange={(e) => setDecision(e.target.value)} required />
                                </div>
                            </div>
                            <div className="d">
                                <input type="text" placeholder='Contact' width={'95%'} />
                            </div>
                        </div>
                        <div className="">

                            <div className="flex_box flex">
                                <button onClick={handleSubmitStudent}>Submit Now</button>
                            </div>
                        </div>
                    </div>
            }
        </div>
    )
}

export default USAssesments


