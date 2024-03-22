import React from 'react'
import { udom_logo } from '../assets'
import { Link, useLocation, useParams } from 'react-router-dom'
import { FileEarmarkPdf, GridFill, JournalBookmarkFill, ListTask, Speedometer, Tv, TvFill } from 'react-bootstrap-icons'
const Sidebar = () => {
    const links = [
        {
            "url":"/user_board",
            "icon":<Speedometer/>,
            "title":"Dashboard"
        },
        // {
        //     "url":"/module",
        //     "icon":<GridFill/>,
        //     "title":"Module Selection"
        // },
        {
            "url":"/place_selection",
            "icon":<ListTask/>,
            "title":"Place Selection"
        },
        {
            "url":"/student_projects",
            "icon":<TvFill/>,
            "title":"Student Projects"
        },
        {
            "url":"/",
            "icon":<FileEarmarkPdf/>,
            "title":"Arrival Notes"
        },
        {
            "url":"/logbook",
            "icon":<JournalBookmarkFill/>,
            "title":"Log  Book"
        },
        
        
        
    ]
    // const params = useParams();
    // console.log(params.id)
    const location = useLocation();
    let {pathname} = location;

    return (
        <div className='component' style={{
            position:'relative',
            zIndex:6
        }}>
            <div className="brand">
                <div className="image">
                    <img src={udom_logo} alt="udom logo" />
                </div>
            </div>
            <div className="sidebar-items">
                {
                    links.map((link, key) => <Link className={`link ${link.url === pathname ? 'active-link':''}`} to={`${link.url}`} key={key}><i>{link.icon}</i> <span className={`${link.url === pathname ? 'active-link':''}`} style={{
                        position:'relative',
                        top:'2px'
                    }}>{link.title}</span></Link>)
                }
            </div>
        </div>
    )
}

export default Sidebar