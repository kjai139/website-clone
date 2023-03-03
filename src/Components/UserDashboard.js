import { getAuth, onAuthStateChanged, signOut } from "firebase/auth"
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
import spinGif from "./Assets/images/gifs/spin.gif"
import checkGif from "./Assets/images/gifs/check-mark-once.gif"



import { Link, useLocation, useNavigate } from "react-router-dom"
import { useEffect, useState } from "react"
import { fireStore, firebaseAuth, storage } from "../firebase"
import { addDoc, arrayUnion, collection, doc, getDoc, getDocs, limit, orderBy, query, serverTimestamp, setDoc, updateDoc } from "firebase/firestore"
import {getDownloadURL, ref, uploadBytesResumable} from "firebase/storage"

const UserDashboard = () => {

    const getUserName = () => {
        console.log(getAuth().currentUser)
        console.log(getAuth().currentUser.displayName)
        return getAuth().currentUser.displayName
    }

    const [profilePic, setProfilePic] = useState(defaultProfIcon)
    const navigate = useNavigate()

    const [userName, setUserName] = useState()

   const auth = getAuth()
   
    
    useEffect( () => {

        onAuthStateChanged(auth, (user) => {
            if (user) {
                setUserName(user.displayName)
            } else {
                console.log('user is signed out')
                navigate('/')
            }
        })

        const loadPostInitial = async () => {
            setUserData([])
            const recentPostQuery = query(collection(fireStore, 'blogPosts'), orderBy('timeStamp', 'desc'), limit(5))

            let list = []

            const querySnap = await getDocs(recentPostQuery)
            querySnap.forEach( (doc) => {
                console.log(doc.id, '->' , doc.data())

                let obj = {
                    id: doc.id,
                    data: doc.data()
                }

                console.log(obj)

                list.push(obj)

                

              
            })
            console.log('list', list)
            setUserData(list)
        } 

        
        loadPostInitial()
        .catch(console.error)
    }, [])

    


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

    const [isHighlighted, setIsHighlighted] = useState()

    const btnFunction = (v) => {
        
        setIsHighlighted(v.btnTitle)
        
        if (v.btnTitle === 'Create'){
            setIsCreateOn(true)
            setIsOverlayOn(true)
            setUploadedImg(dragIcon)
        } 
    }

    const renderSideBar = () => {
        return sidebarObj.map( value => 
        <li key={`li-${value.id}`}>
            <button className={`dashBtns ${value.btnTitle === isHighlighted? 'highlighted' : null}`} key={`btn-${value.id}`} onClick={() => btnFunction(value)}>
                <img className="dashBtnImg" key={`btnImg-${value.id}`} src={value.svgImg} alt="">

                </img>
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

    const renderPostDetails = () => {

        console.log(postDetails)

        const renderPostCmts = () => {
            
            let max = postDetails.data.comments.length
            if (max > 10) {
                max = 10
            }

            return postDetails.data.comments.slice(0, max).map( (cmts, i) => 
                <div className="post-d-CmtsDiv" key={`${postDetails.id}-${i}-post-d`}>
                    <img className="post-d-img" key={`${postDetails.id}-${i}-post-prof`} src={cmts.profPic ? cmts.profPic : ''} alt=""></img>
                    <div key={`${postDetails.id}-${i}-post-d-op`} className="post-d-opName"> 
                        {cmts.op}  
                    </div>
                    <div key={`${postDetails.id}-${i}-post-d-cmt`} className="post-d-Comments">
                        {cmts.comment}
                    </div>
                </div>
            )
        }

        return (
            <div className="postDetailDiv">
                <div className="postDetailInner">
                    <div className="postDLeft">
                        <img className="pd-img" src={postDetails.data.imageUrl} alt="postImage">
                        </img>

                    </div>
                    <div className="postDRight">
                        <div className="postDetails-header">
                            <img className="op-img" src={postDetails.data.profilePicUrl} alt=""></img>
                            <div>
                                {postDetails.data.name}
                            </div>
                        </div>
                        {renderPostCmts()}

                        <div className="post-d-div">
                        <form>
                        <label className="cmtLabel">
                        <textarea rows={1} name="comment" className="commentInp" placeholder="Add a comment..."></textarea>
                        <button className="postBtn" value={postDetails.id}>Post</button>
                        </label>
                        </form>
                        </div>

                    </div>

                </div>





            </div>
        )
    }

    const [txtAreaCont, setTxtAreaCont] = useState()
    const [txtAreaWC, setTxtAreaWC] = useState(0)

    const [loadingStatus, setloadingStatus] = useState(spinGif)
    const [isLoading, setIsLoading] = useState(false)

    const [isPostCreated, setIsPostCreated] = useState(false)

    const handleTxtChange = (e) => {
        setTxtAreaCont(e.target.value)
        setTxtAreaWC(e.target.value.length)
    }

    const createNewPost = async () => {
        try {
            
            const postRef = await addDoc(collection(fireStore, "blogPosts"), {
                name:getUserName(),
                imageUrl: spinGif,
                profilePicUrl: profUrl,
                timeStamp: serverTimestamp(),
                caption: txtAreaCont,
                comments:[{
                    op:getUserName(),
                    comment: txtAreaCont,
                    profPic: profUrl
                    
                }]
    
            })


            //upload

            const filePath = `${getAuth().currentUser.uid}/${postRef.id}/${uploadedFileName}`

            const newImgRef = ref(storage, filePath)
            const uploadTask = uploadBytesResumable(newImgRef, imgfile)
            uploadTask.on('state_changed', (snapshot) => {
                const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100
                console.log('Upload:' + progress + '% done');

                switch (snapshot.state) {
                    case 'paused':
                        console.log('upload paused')
                        break;
                    case 'running':
                        console.log('running upload')
                        setIsLoading(true)
                        break;
                    default:
                        console.log('doin nothing')
                }
            }, (error) => {
                console.log('error uploading', error)
            }, async () => {
                let publicImgUrl = await getDownloadURL(uploadTask.snapshot.ref)

                //update

                await updateDoc(postRef, {
                    imageUrl: publicImgUrl,
                    
                })

                setIsLoading(false)
                setloadingStatus(checkGif)
                setIsPostCreated(true)

            })


        } catch(error) {
            console.error('Error writing to serv', error)
        }
        
    }

    const renderCreateShare = () => {
        return (
            <div className="createFormDiv">
                <div className="createHeader"> Create new Post

                </div>
                <button className="shareBtn" onClick={createNewPost}>Share</button>
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
                                {userName}
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

    const renderLoading = () => {
        return (
            <div className="createFormDiv">
            <div className="createHeader">Create new post</div>
            <div id="loading-div">
                <div className="formCont">
                <div className="uploadImg" style={{
                    backgroundImage:`url(${loadingStatus})`
                }}>

                </div>
                
                </div>
            </div>

            </div>
        )
    }

    const renderFinishPost = () => {
        return (
            <div className="createFormDiv">
            <div className="createHeader">Create new post</div>
            <div id="loading-div">
                <div className="formCont">
                <div className="checkTxt">Post Shared</div>
                <div className="uploadImg" style={{
                    backgroundImage:`url(${loadingStatus})`
                }}>

                </div>
                
                </div>
            </div>

            </div>
        )
    }

    const closeOverlay = () => {
        setIsCreateOn(false)
        setIsOverlayOn(false)
        setisPostDetailsOpen(false)
        setIsImgUploaded(false)
        setTxtAreaWC(0)
        
        setIsLoading(false)
        setIsPostCreated(false)
        setloadingStatus(spinGif)
        setIsHighlighted('')

        loadPosts()
    }

    const [uploadedImg, setUploadedImg] = useState(dragIcon)
    const [isImgUploaded, setIsImgUploaded] = useState(false)
    const [uploadedFileName, setupLoadedFileName] = useState()
    const [imgfile, setImgFile] = useState() 
    



    const onMediaFileSelect = (e) => {
        e.preventDefault()
        let file = e.target.files[0]
        let reader = new FileReader()
        let fileUrl = reader.readAsDataURL(file)
        // console.log(fileUrl, [reader.result])
        reader.onloadend = () => {
            setUploadedImg([reader.result])
            setIsImgUploaded(true)
            setImgFile(file)
            setupLoadedFileName(file.name)
            console.log(file, [reader.result])
        }
        
    }

    const [userData, setUserData] = useState([])

    const loadPosts = async () => {
        
        const recentPostQuery = query(collection(fireStore, 'blogPosts'), orderBy('timeStamp', 'desc'), limit(5))
        let list = []
        const querySnap = await getDocs(recentPostQuery)
        querySnap.forEach( (doc) => {
            console.log(doc.id, '->' , doc.data())

            let obj = {
                id: doc.id,
                data: doc.data()
            }

            console.log(obj)
            list.push(obj)

            // setUserData( (prevState) => {
            //     return [
            //         ...prevState,
            //         obj
            //     ]
            // })
        })
        setUserData(list)
        console.log(userData)

       
    }

    const detailedPostNewComment = async (e) => {
        e.preventDefault()

        let form = e.target.parentNode.parentNode

        const formData = new FormData(form)

        let docRef = postDetails.id
        console.log('docref', docRef)

        const newComment = formData.get('comment')

        const postRef = doc(fireStore, "blogPosts", docRef)

        
    }

    const postNewComments = async (e) => {
        e.preventDefault()
        
        console.log(e.target.value)
        let form = e.target.parentNode.parentNode
        const formData = new FormData(form)
        let docRef = e.target.value

        console.log(formData)
        const postComment = formData.get('comment')

        console.log(postComment)
        // form.reset()

        const postRef = doc(fireStore, "blogPosts", docRef)

        try {
            setIsCommentPosting(true)
            await updateDoc(postRef, {
                comments:arrayUnion({
                    comment:postComment,
                    op:getUserName(),
                    profPic: getAuth().currentUser.photoURL
                })
            })
            
            setIsCommentPosting(false)
            form.reset()
            loadPosts()
        } catch(error) {
            console.log('error updating doc', error)
        }
        

        

    }

    const [isCommentPosting, setIsCommentPosting] = useState(false)

    const [cmtLoadingStatus, setCmtLoadingStatus] = useState(spinGif)

    const [postDetails, setPostDetails] = useState()

    const renderPosts = () => {
        const renderCmts = (value) => {
            console.log(value)
            let max = value.data.comments.length
            if (max > 3) {
                max = 3
            }

            return value.data.comments.slice(0, max).map( (cmts, i) => 
                <div className="postCmtsDiv" key={`${value.id}-${i}-post`}>
                    
                    <div key={`${value.id}-${i}-op`} className="opName"> 
                        {cmts.op}  
                    </div>
                    <div key={`${value.id}-${i}-cmt`} className="postComments">
                        {cmts.comment}
                    </div>
                </div>
            )
        }

        const loadPostDetails = (v) => {
            setisPostDetailsOpen(true)
            setPostDetails(v)
        }

        return userData.map( value => 
            <div className="contentDiv" key={`post-${value.id}`}>
                <div className="postHeaderDiv">
                <div className="postHeaderProf" style={{
                    backgroundImage:`url(${value.data.profilePicUrl})`
                }}>

                </div>
                
                <div className="postHeader">
                    {value.data.name}
                </div>
                </div>
                <img className="post-img" alt="" src={value.data.imageUrl}>
                    
                </img>
                <div className="captionsDiv">
                    {renderCmts(value)}
                </div>
                <div className="addCommentOuterDiv">
                    <div className={`commentOverlay ${isCommentPosting ? null : `hidden`}`} style={{
                        backgroundImage: `url(${cmtLoadingStatus})`
                    }}>
                       

                    </div>
                    <div className="addCommentDiv">
                        <button className="viewMoreBtn" onClick={() => loadPostDetails(value)}>
                            <p>{value.data.comments.length > 3 ? `View all ${value.data.comments.length} comments` : 'View post'}</p>
                        </button>
                        <form>
                        <label className="cmtLabel">
                        <textarea name="comment" className="commentInp" placeholder="Add a comment..."></textarea>
                        <button className="postBtn" onClick={postNewComments} value={value.id}>Post</button>
                        </label>
                        </form>
                    </div>

                </div>
            </div>
        )
    }

    const signOutUser = () => {
        signOut(auth)
    }

    const renderProfileRight = () => {
        return (
            <div className="dashRightTopDiv">
                <div className="dashRightProf">
                    <div className="dashRightProfPic" style={{
                        backgroundImage:`url(${profUrl})`
                    }}>

                    </div>
                    <div className="dashRightProfName">
                        {userName}
                    </div>
                    <button className="switchAccBtn" onClick={signOutUser}>
                        Switch
                    </button>
                </div>

            </div>
        )
    }

    const [isOverlayCOn, setIsOverlayCOn] = useState(false)

    const renderConfirmCancel = () => {



        return (
            <div className="cancelC-div">
                <div className="dpost-header">
                    <p>Discard post?</p>
                    <p>If you leave, your edits won't be saved.</p>
                </div>
                <button className="dpost-discard" onClick={discardPost}>
                    Discard
                </button>
                <button className="dpost-cancel" onClick={() => setIsOverlayCOn(false)}>
                    Cancel
                </button>

            </div>
        )
    }

    const checkIfConfirm = () => {

        if (isImgUploaded && !isLoading && isPostCreated === false) {
            console.log('confirm cancel')
            setIsOverlayCOn(true)
        } else {
            closeOverlay()
        }
    }

    const discardPost = () => {
        setIsOverlayCOn(false)
        closeOverlay()
    }

    const [isPostDetailsOpen, setisPostDetailsOpen] = useState(false)

    return (
        <div className="dashboardDiv">
            {isCreateOn && isImgUploaded === false ? renderCreate() : null}
            {isImgUploaded && !isLoading && isPostCreated === false ? renderCreateShare() : null}
            {isImgUploaded && isLoading && !isPostCreated ? renderLoading() : null}
            {!isLoading && isPostCreated ? renderFinishPost() : null}
            {isOverlayCOn ? renderConfirmCancel() : null}
            {isPostDetailsOpen ? renderPostDetails() : null}
        <div className={`overlay ${isOverlayOn || isPostDetailsOpen ? undefined : 'hidden'}`} onClick={checkIfConfirm}></div>
        <div className={`overlay-cancel ${isOverlayCOn ? undefined : 'hidden'}`} onClick={ () => setIsOverlayCOn(false)}></div>
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
                    {renderPosts()}
                    
                </div>
                <div className="dashContentRight">
                    {renderProfileRight()}
                </div>
           </div>

        </div>
    )
}





export { UserDashboard }