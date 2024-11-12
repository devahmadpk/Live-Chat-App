
import '../stylesheets/signup.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEnvelope } from '@fortawesome/free-solid-svg-icons'
import { faLock } from '@fortawesome/free-solid-svg-icons'


const SignUp = () => {
    return (
        <div className='signup-div'>
            <div className="greet-div">
                <h2>Sign Up</h2>
                <p>Create Your Account</p>
            </div>

            <div className="form-div">
                <div className='form-element'>
                    
                     <FontAwesomeIcon icon={faEnvelope} className='icon'/>
                    <input placeholder="Email"></input>
                </div>

                <div className='form-element'>
                    <FontAwesomeIcon icon={faLock} className='icon'/>
                    <input placeholder="Password"></input>
                </div>

                <div className='form-element'>
                    <FontAwesomeIcon icon={faLock} className='icon'/>
                    <input placeholder="Confirm Password"></input>
                </div>
                
                <button>Login Now</button>
            </div>

            <div className="bottom-div">
                <p>Already have an account? <span><a>Sign Up</a></span></p>
            </div>
            
        </div>
    )
}

export default SignUp;