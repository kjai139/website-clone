import { getAuth } from "firebase/auth"
import homeIcon from "./Assets/images/dashboard-icons/home-icon.svg"
import searchIcon from "./Assets/images/dashboard-icons/search-icon.svg"
import exploreIcon from "./Assets/images/dashboard-icons/explore-icon.svg"
import reelsIcon from "./Assets/images/dashboard-icons/reels-icon.svg"
import msgIcon from "./Assets/images/dashboard-icons/messages-icon.svg"
import notiIcon from "./Assets/images/dashboard-icons/noti-icon.svg"
import createIcon from "./Assets/images/dashboard-icons/create-icon.svg"
import burgerIcon from "./Assets/images/dashboard-icons/menu-burger.svg"
import defaultProfIcon from "./Assets/images/dashboard-icons/default-prof.png"
import dragIcon from "./Assets/images/drag-icon.svg"

import { Link, useLocation } from "react-router-dom"
import { useEffect, useState } from "react"
import { firebaseAuth } from "../firebase"


const UserDashboard = () => {

    const getUserName = () => {
        console.log(getAuth().currentUser)
        console.log(getAuth().currentUser.displayName)
    }

    const [profilePic, setProfilePic] = useState(defaultProfIcon)



   const {state} = useLocation()
   const {profUrl} = state

   

    const sidebarObj = [
        {
            svgImg: homeIcon,
            btnTitle: 'Home',
            id:'2fsdf83'
        },
        {
            svgImg: searchIcon,
            btnTitle: 'Search',
            id:'4324f3d',
        },
        {
            svgImg: exploreIcon,
            btnTitle: 'Explore',
            id:'4dsaf34'
        },
        {
            svgImg: reelsIcon,
            btnTitle: 'Reels',
            id:'fi4h35'
        },
        {
            svgImg: msgIcon,
            btnTitle: 'Messages',
            id:'kfsdhu34s'
        },
        {
            svgImg: notiIcon,
            btnTitle: 'Notifications',
            id:'dsuh35f'
            
        },
        {
            svgImg: createIcon,
            btnTitle: 'Create',
            id:'34fdsf3'
        },


    ]

    const btnFunction = (v) => {
        console.log(v.btnTitle)
        if (v.btnTitle == 'Create'){
            setIsCreateOn(true)
        } 
    }

    const renderSideBar = () => {
        return sidebarObj.map( value => 
        <li key={`li-${value.id}`}>
            <button className="dashBtns" key={`btn-${value.id}`} onClick={() => btnFunction(value)}>
                <div className="dashBtnImg" key={`btnImg-${value.id}`} style={{
                    backgroundImage:`url(${value.svgImg})`
                }}>

                </div>
                <div className="dashBtnTxt" key={`btnTitle-${value.id}`}>
                    {value.btnTitle}
                </div>
            </button>
        </li>
        )
    }

    const renderProfileSideBar = () => {
        return (
            <li>
            <button className="dashBtns">
                <div className="dashBtnImg" style={{
                    backgroundImage: `url(${profUrl})`
                }}>

                </div>
                <div className="dashBtnTxt">
                    Profile
                </div>
            </button>
        </li>
        )
    }

    const [isOverlayOn, setIsOverlayOn] = useState(false)
    const [isCreateOn, setIsCreateOn] = useState(false)


    const renderCreate = () => {
        return (
            <div className="createFormDiv">
                <form id="img-form">
                    <div className="formCont">
                    <div className="uploadImg" style={{
                        backgroundImage:`url(${dragIcon})`
                    }}>

                    </div>
                    <label className="file-upload">
                    <input type="file" name="fileName">
                    </input>
                    Select from computer
                    </label>
                    </div>
                </form>

            </div>

        )
    }

    return (
        <div className="dashboardDiv">
            {isCreateOn ? renderCreate() : null}
        <div className={`overlay ${isOverlayOn ? undefined : 'hidden'}`}></div>
           <div className="dashboardLeft">
                
                <ul className="dashList">
                    <li>
                    <div className="dashLogo">Instagram</div>
                    </li>
                   {renderSideBar()}
                   {renderProfileSideBar()}
                    
                </ul>
                <div>
                <button className="dashBtns dashMenuBtn">
                <div className="dashBtnImg" style={{
                    backgroundImage:`url(${burgerIcon})`
                }}>

                </div>
                <div className="dashBtnTxt">
                    More
                </div>
            </button>
            </div>
           </div>
           <div className="dashboardRight">
                <div className="dashContentLeft">
                    hi
                </div>
           </div>

        </div>
    )
}





export { UserDashboard }