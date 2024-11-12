

import '../stylesheets/banner.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faRightFromBracket } from '@fortawesome/free-solid-svg-icons'
import {faPlus} from '@fortawesome/free-solid-svg-icons'

const Banner = () => {

    const signOutIcon = <FontAwesomeIcon icon={faRightFromBracket} />
    const createNewIcon = <FontAwesomeIcon icon= {faPlus} />
    return (
        <div className='banner'>
            <h3>Your Name</h3>
            <div className='button-div'>
                <button className="create">{createNewIcon}</button>
                <button className="signout">{signOutIcon}</button>
            </div>
            

        </div>
    )

}

export default Banner;