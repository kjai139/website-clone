import { useEffect, useState } from "react"
import homePhoneScreen from "./Assets/images/home-phones.png"
import phone1 from "./Assets/images/phone1.png"
import phone2 from "./Assets/images/phone2.png"
import appleBtn from "./Assets/images/apple-logo.png"
import googleBtn from "./Assets/images/google-logo.png"
import googleLogo from "./Assets/images/google-icon.png" 
import { GoogleAuthProvider, getAuth, signInWithPopup } from "firebase/auth"
import { firebaseAuth } from "../firebase"
import { useNavigate } from "react-router-dom"

const Homepage = () => {

    const [bgImg, setBgImg] = useState(phone1)

    const [isPwDisplayed, setIsPwDisplayed] = useState('password')

    

    const togglePwDisplay = (e) => {
        e.preventDefault()
        if (isPwDisplayed === 'password') {
            setIsPwDisplayed('text')
        } else {
            setIsPwDisplayed('password')
        }
    }

    //firebase
    const navigate = useNavigate()
    const [isUserLoggedIn, setIsUserLoggedIn] = useState(false)
    const [userProfPic, setUserProfPic] = useState()

    const signIn = async () => {
        let provider = new GoogleAuthProvider()
        provider.setCustomParameters({
            prompt:'select_account'
        })
        await signInWithPopup(firebaseAuth, provider)
    }

    firebaseAuth.onAuthStateChanged((user) => {
        if (user) {
            console.log('signed in')
            setUserProfPic(firebaseAuth.currentUser.photoURL)
            setIsUserLoggedIn(true)
            
        } else {
            setIsUserLoggedIn(false)
        }
    })

    useEffect ( () => {
        if (isUserLoggedIn === true) {
            
            navigate('/dashboard', { state: {
                profUrl: userProfPic
            }})
        }
    }, [isUserLoggedIn])


    return (
        <div className="homePage">
            <div className="hLeft" style={{
                backgroundImage:`url(${homePhoneScreen})`
            }}>
                <img className="phoneScreenImg" src={homePhoneScreen} alt="homePhoneScreen"></img>
                <div className="phoneScreen" style={{
                    backgroundImage:`url(${bgImg})`
                }}></div>

            </div>
            <div className="hRight">
                <div className="hRightDiv">
                    <div className="instaTitle">
                        Instagram
                    </div>
                    <form className="homeLoginForm" autoComplete="off">
                        <label>
                        <input type="text" name="userName" placeholder=" " className="formInput"></input>
                        <span className="placeHolderTxt">Phone number, username or email address</span>
                        </label>
                        

                        <label>
                        <input type={isPwDisplayed} name="userPassword" placeholder=" " className="formInput"></input>
                        <span className="placeHolderTxt">
                            Password
                            

                        </span>
                        <button className="pwToggleBtn" onClick={togglePwDisplay}>Show</button>
                        
                        </label>
                        
                        <button className="logInBtn">Log in</button>

                    </form>
                    <div className="orDiv">
                        <div className="orLeft"></div>
                        <div>OR</div>
                        <div className="orRight"></div>
                    </div>
                    <div className="centerT">
                        <button className="googleBtn" onClick={signIn}><div className="googleLogo" style={{
                            backgroundImage: `url(${googleLogo})`
                        }}></div><div>Log in with Google</div></button>
                    </div>
                    <div className="centerT fPwDiv">
                        Forgotten your password?
                    </div>
                </div>
                <div className="hRightDiv">
                    <div className="centerT signUpDiv">
                        <p>Don't have an account?</p><p className="boldT">Sign up</p>
                    </div>
                </div>
                <div className="centerT getAppTxt">
                    Get the app.
                </div>
                <div className="downloadLogo">
                    <button className="dlLogo" style={{
                        backgroundImage: `url(${appleBtn})`
                    }}></button>
                    <button className="dlLogo" style={{
                        backgroundImage: `url(${googleBtn})`
                    }}></button>
                </div>
            </div>
        </div>
    )
}


export { Homepage }