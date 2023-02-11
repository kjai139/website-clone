import { useState } from "react"
import homePhoneScreen from "./Assets/images/home-phones.png"
import phone1 from "./Assets/images/phone1.png"
import phone2 from "./Assets/images/phone2.png"


const Homepage = () => {

    const [bgImg, setBgImg] = useState(phone1)



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
                        <input type="text" name="userName"></input>
                        <input type="text" name="userPw"></input>
                        <button>Log in</button>

                    </form>
                    <div className="orDiv">
                        <div className="orLeft"></div>
                        <div>OR</div>
                        <div className="orRight"></div>
                    </div>
                    <div className="centerT">
                        Log in with Google
                    </div>
                    <div className="centerT">
                        Forgotten your password?
                    </div>
                </div>
                <div className="hRightDiv">
                    <div className="centerT signUpDiv">
                        <p>Don't have an account?</p><p className="boldT">Sign up</p>
                    </div>
                </div>
                <div className="centerT">
                    Get the app.
                </div>
                <div className="downloadLogo">
                    
                </div>
            </div>
        </div>
    )
}


export { Homepage }