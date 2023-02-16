import { getAuth } from "firebase/auth"
import homeIcon from "./Assets/images/dashboard-icons/home-icon.svg"
import searchIcon from "./Assets/images/dashboard-icons/search-icon.svg"
import exploreIcon from "./Assets/images/dashboard-icons/explore-icon.svg"
import reelsIcon from "./Assets/images/dashboard-icons/reels-icon.svg"
import msgIcon from "./Assets/images/dashboard-icons/messages-icon.svg"
import notiIcon from "./Assets/images/dashboard-icons/noti-icon.svg"
import createIcon from "./Assets/images/dashboard-icons/create-icon.svg"
import burgerIcon from "./Assets/images/dashboard-icons/menu-burger.svg"


const UserDashboard = () => {

    const getUserName = () => {
        console.log(getAuth().currentUser)
        console.log(getAuth().currentUser.displayName)
    }

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

    const renderSideBar = () => {
        return sidebarObj.map( value => 
        <li>
            <button className="dashBtns" key={`btn-${value.id}`}>
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

    return (
        <div className="dashboardDiv">
           <div className="dashboardLeft">
                
                <ul className="dashList">
                    <li>
                    <div className="dashLogo">Instagram</div>
                    </li>
                   {renderSideBar()}
                    
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