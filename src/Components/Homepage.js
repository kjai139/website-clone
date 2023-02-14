import { useState } from "react"
import homePhoneScreen from "./Assets/images/home-phones.png"
import phone1 from "./Assets/images/phone1.png"
import phone2 from "./Assets/images/phone2.png"
import appleBtn from "./Assets/images/apple-logo.png"
import googleBtn from "./Assets/images/google-logo.png"
import googleLogo from "./Assets/images/google-icon.png" 

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
                    <form className="homeLoginForm">
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
                        <button className="googleBtn"><div className="googleLogo" style={{
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