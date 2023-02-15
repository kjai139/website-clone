import { getAuth } from "firebase/auth"




const UserDashboard = () => {

    const getUserName = () => {
        console.log(getAuth().currentUser)
        console.log(getAuth().currentUser.displayName)
    }

    return (
        <div className="dashboardDiv">
           <div className="dashboardLeft">
                <div className="dashLogo"></div>
                <li className="dashList">
                    <ul>
                        
                    </ul>
                </li> 
           </div>

        </div>
    )
}





export { UserDashboard }