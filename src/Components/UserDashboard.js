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
import { fireStore, firebaseAuth } from "../firebase"
import { Firestore, addDoc, collection, doc, serverTimestamp, setDoc } from "firebase/firestore"


const UserDashboard = () => {

    const getUserName = () => {
        console.log(getAuth().currentUser)
        console.log(getAuth().currentUser.displayName)
        return getAuth().currentUser.displayName
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
        
        if (v.btnTitle === 'Create'){
            setIsCreateOn(true)
            setIsOverlayOn(true)
            setUploadedImg(dragIcon)
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
                <div className="createHeader">Create new post</div>
                <form id="img-form">
                    <div className="formCont">
                    <div className="uploadImg" style={{
                        backgroundImage:`url(${uploadedImg})`
                    }}>

                    </div>
                    <label className="file-upload">
                    <input type="file" accept="image/png, image/gif, image/jpeg" name="fileName" onChange={onMediaFileSelect}>
                    </input>
                    Select from computer
                    </label>
                    </div>
                </form>

            </div>

        )
    }

    const [txtAreaCont, setTxtAreaCont] = useState()
    const [txtAreaWC, setTxtAreaWC] = useState(0)

    const handleTxtChange = (e) => {
        setTxtAreaCont(e.target.value)
        setTxtAreaWC(e.target.value.length)
    }

    const createNewPost = async () => {
        try {
            const postRef = await addDoc(collection(fireStore, "blogPosts"), {
                name:getUserName(),
                imageUrl: '',
                profilePicUrl: profUrl,
                timeStamp: serverTimestamp()
    
            })


            //upload

            const filePath = `${getAuth().currentUser.uid}/${postRef.id}/${uploadedFileName}`
        } catch(error) {
            console.error('Error writing to serv', error)
        }
        
    }

    const renderCreateShare = () => {
        return (
            <div className="createFormDiv">
                <div className="createHeader"> Create new Post

                </div>
                <button className="shareBtn">Share</button>
                <div className="createBox">
                    <div className="createBoxLeft" style={{
                        backgroundImage:`url(${uploadedImg})`
                    }}>

                    </div>
                    <div className="createBoxRight">
                        <div className="boxRightProfileDiv">
                            <div className="boxProfIcon" style={{
                                backgroundImage:`url(${profUrl})`
                            }}>

                            </div>
                            <div className="boxProfName">
                                {getUserName()}
                            </div>
                            
                        </div>
                        <div className="txtAreaDiv">
                            <textarea className="captionTxtArea" placeholder="Write a caption..." maxLength="2200" rows="6" onChange={handleTxtChange}></textarea>
                        </div>
                        <div className="WcDiv">
                            <div className="wordCounter">{txtAreaWC}/2200</div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }

    const closeOverlay = () => {
        setIsCreateOn(false)
        setIsOverlayOn(false)
        setIsImgUploaded(false)
        setTxtAreaWC(0)
    }

    const [uploadedImg, setUploadedImg] = useState(dragIcon)
    const [isImgUploaded, setIsImgUploaded] = useState(false)
    const [uploadedFileName, setupLoadedFileName] = useState()

    const onMediaFileSelect = (e) => {
        e.preventDefault()
        let file = e.target.files[0]
        let reader = new FileReader()
        let fileUrl = reader.readAsDataURL(file)
        // console.log(fileUrl, [reader.result])
        reader.onloadend = () => {
            setUploadedImg([reader.result])
            setIsImgUploaded(true)
            setupLoadedFileName(file.name)
            console.log(file.name)
        }
        
    }

    return (
        <div className="dashboardDiv">
            {isCreateOn && isImgUploaded === false ? renderCreate() : null}
            {isImgUploaded ? renderCreateShare() : null}
        <div className={`overlay ${isOverlayOn ? undefined : 'hidden'}`} onClick={closeOverlay}></div>
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