import axios from 'axios'
import React, { useEffect, useState } from 'react'
import toast from 'react-hot-toast';
import { baseURL } from '../../paths/base_url';
import { useNavigate } from 'react-router-dom';
import { DatePicker, Divider } from 'rsuite';

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


    // supervisor
    const [sname, setSname] = useState("");
    const [positions, setPositions] = useState("");
    const [email, setEmail] = useState("");
    const [contact, setContact] = useState("");


    useEffect(() => {
        if (window.localStorage.sv_token !== undefined) {
            console.log(localStorage.sv_token);
        } else {
            nav('/ss_sign_in');
        }
    }, []);
    const students = new Array();
    const handleAnother = async () => {
        const object = [];

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
            tmanage: tmanage
        }

        students.push(construct);

    };
    const handleSubmitStudent = async () => {
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
            tmanage: tmanage
        }

        students.push(construct);
        console.log(students)
    }
    return (
        <div className='main_upload'>
            {
                !show_next ?
                    <div className="flex_card">
                        <div className="">
                            <h1 className='text-center text-lg text-bold pt-5' style={{
                                fontWeight: '900'
                            }}> ASSESMENT FORM FOR FIELD SUPERVISOR/TRAINING OFFICER ( AFSO )</h1>
                            <div className="pt-5">

                                <span>Student Information</span>
                            </div>
                            <div className="grid_50_50">
                                <div className="" style={{
                                    "--template": "auto 50%"
                                }}>
                                    <input type="text" placeholder='Name of Student' value={fname} onChange={(e) => setFname(e.target.value)} />
                                    <input type="text" placeholder='Registration Number' value={tnumber} onChange={(e) => setTnumber(e.target.value)} />
                                </div>
                                <div className="" style={{
                                    "--template": "auto 25%"
                                }}>
                                    <input type="text" placeholder='Degree Programme' value={degree} onChange={(e) => setDegree(e.target.value)} />
                                    <input type="text" placeholder='Year of Study' value={year} onChange={(e) => setYear(e.target.value)} />
                                </div>
                            </div>
                            <div className="pt-2">

                                <span>Address</span>
                            </div>
                            <div className="grid_50_50">
                                <div className="" style={{
                                    "--template": "auto 25%"
                                }}>
                                    <input type="text" placeholder='Name of Origanization/Company' value={address} onChange={(e) => setAddress(e.target.value)} />
                                    <input type="text" placeholder='Branch Name' value={branch} onChange={(e) => setBranch(e.target.value)} />
                                </div>
                                <div className="" style={{
                                    "--template": "auto 40%"
                                }}>
                                    <input type="text" placeholder='Region' value={region} onChange={(e) => setRegion(e.target.value)} />
                                    <input type="text" placeholder='District' value={district} onChange={(e) => setDistrict(e.target.value)} />
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
                                    <input type='date' placeholder="From Date" value={from} onChange={(e) => setFrom(e.target.value)} />
                                    <input type='date' placeholder="To Date" value={todate} onChange={(e) => setTodate(e.target.value)} />
                                    <input type="text" placeholder='Has been working under Mr/Mrs...' value={haswork} onChange={(e) => setHasWork(e.target.value)} />
                                    <input type="text" placeholder='Position' value={position} onChange={(e) => setPosition(e.target.value)} />
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
                                    <input type="number" placeholder='Pactuality' value={panctual} onChange={(e) => setPanctual(e.target.value)} />
                                    <input type="number" placeholder='Regular Attendance' value={regular} onChange={(e) => setRegular(e.target.value)} />
                                    <input type="number" placeholder='Dressing Suitability' value={dressing} onChange={(e) => setDressing(e.target.value)} />
                                </div>
                                <div className="" style={{
                                    "--template": "auto 40%"
                                }}>
                                    <input type="number" placeholder='Confidentiality' value={confidental} onChange={(e) => setConfidential(e.target.value)} />
                                    <input type="number" placeholder='Accountability' value={accountability} onChange={(e) => setAccountability(e.target.value)} />
                                </div>
                                <div className="" style={{
                                    "--template": "auto auto auto"
                                }}>
                                    <input type="number" placeholder='Disciplined' value={descpline} onChange={(e) => setDescpline(e.target.value)} />
                                    <input type="number" placeholder='Cooperation' value={cooperate} onChange={(e) => setCooperate(e.target.value)} />
                                    <input type="number" placeholder='Accepting Guidance' value={aguidance} onChange={(e) => setAguidance(e.target.value)} />
                                </div>
                                <div className="" style={{
                                    "--template": "auto auto auto"
                                }}>
                                    <input type="number" placeholder='Readiness to accept responsibilities' value={readiness} onChange={(e) => setReadiness(e.target.value)} />
                                    <input type="number" placeholder='Time Management Consciousness' value={conscio} onChange={(e) => setConscio(e.target.value)} />
                                    <input type="number" placeholder='Trustfulness' value={trustful} onChange={(e) => setTrustful(e.target.value)} />
                                </div>
                                <div className="" style={{
                                    "--template": "auto"
                                }}>
                                    <input type="number" placeholder='( Max Score (2)) Caring of Organization resources (furniture, computer systems, etc... )' max={2} maxLength={2} value={caring} onChange={(e) => setCaring(e.target.value)} />
                                </div>
                                <div className="" style={{
                                    "--template": "auto auto"
                                }}>
                                    <input type="number" placeholder='Self-initiative' value={selfinit} onChange={(e) => setSelfinit(e.target.value)} />
                                    <input type="number" placeholder='Decision making capability' value={decision} onChange={(e) => setDecision(e.target.value)} />
                                </div>
                            </div>
                            <div className="pt-2">

                                <span>Attending Checkup</span>
                            </div>
                            <div className="grid_50_50">
                                <div className="" style={{
                                    "--template": "auto auto"
                                }}>
                                    <input type="text" placeholder='How many days did not appear for work ?' value={appearwork} onChange={(e) => setAppearwork(e.target.value)} />
                                    <input type="text" placeholder="Where the reason of Student's absence communicated to you?" value={reason} onChange={(e) => setReason(e.target.value)} />
                                </div>
                                <div className="" style={{
                                    "--template": "30% auto"
                                }}>
                                    <input type="number" placeholder='What are they ?' value={whatare} onChange={(e) => setWhatare(e.target.value)} />
                                    <input type="text" placeholder="Was the logbook submitted to you weekly for your comments and signature?" value={waslogbook} onChange={(e) => setWaslogbook(e.target.value)} />
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
                                    <input type="number" placeholder='( 15 MARKS ) Knowledge and skills demostrated by the student' title='( 15 MARKS ) Knowledge and skills demostrated by the student' value={knowledge} onChange={(e) => setKnowledge(e.target.value)} />

                                </div>
                                <div className="" style={{
                                    "--template": "auto 40%"
                                }}>
                                    <input type="number" placeholder='( 10 MARKS ) Willingness to accept challenges' title='( 10 MARKS ) Willingness to accept challenges' value={willingness} onChange={(e) => setWillingness(e.target.value)} />
                                    <input type="number" placeholder='( 5 MARKS ) Readiness to utilize his/her potential for the organisation' title='( 5 MARKS ) Readiness to utilize his/her potential for the organisation' value={utilise} onChange={(e) => setUtilise(e.target.value)} />
                                </div>
                                <div className="" style={{
                                    "--template": "auto auto"
                                }}>
                                    <input type="number" placeholder='( 15 MARKS ) Creativity (any new idea or solution provided by the student )' title='( 15 MARKS ) Creativity (any new idea or solution provided by the student )' value={creativity} onChange={(e) => setCreativity(e.target.value)} />
                                    <input type="number" placeholder='( 5 MARKS ) Confidence' title='( 5 MARKS ) Confidence' value={confidence} onChange={(e) => setConfidence(e.target.value)} />
                                </div>
                                <div className="dp" style={{
                                    "--template": "auto"
                                }}>
                                    <input type="number" placeholder='( 10 MARKS ) Hardworking' title='( 10 MARKS ) Hardworking' style={{
                                        width: '110% !important',
                                    }} value={hardworking} onChange={(e) => setHardworking(e.target.value)} />
                                </div>

                                <div className="dp" style={{
                                    "--template": "auto",
                                    marginRight: '10px'
                                }}>
                                    <span>What were student's achevements ( if any )?</span>
                                    <input type="text" placeholder='Write here' value={achievement} onChange={(e) => setAchievement(e.target.value)} />
                                </div>
                                <div className="dp" style={{
                                    "--template": "auto"
                                }}>
                                    <span style={{ fontSize: '11px' }}>What is your readiness to take more (and how many) students for Industrial Practical
                                        Training in the future, and in which areas? (e.g Networking, Website design and
                                        development, System administration, Computer application training, Software
                                        development, Security, etc.)?</span>
                                    <input type="text" placeholder='Write here' value={whicharea} onChange={(e) => setWhicharea(e.target.value)} />
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
                                <button onClick={handleAnother}>Add Another</button>
                                <button onClick={() => setShow_next(!show_next)}>Complete</button>
                            </div>
                        </div>
                    </div> :
                    <div className="flex_card">

                        <div className="newbey">
                            <h1 className='m-5'>Supervisor/Training Officer's</h1>
                            <div className="grid_50_50">

                                <div className="" style={{
                                    "--template": "auto"
                                }}>
                                    <input type="text" placeholder='Name: ' max={2} maxLength={2} value={caring} onChange={(e) => setCaring(e.target.value)} />
                                </div>
                                <div className="" style={{
                                    "--template": "auto"
                                }}>
                                    <input type="text" placeholder='Position: ' value={selfinit} onChange={(e) => setSelfinit(e.target.value)} />
                                    <input type="email" placeholder='Email' value={decision} onChange={(e) => setDecision(e.target.value)} />
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


