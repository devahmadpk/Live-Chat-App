
import '../stylesheets/signin.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEnvelope } from '@fortawesome/free-solid-svg-icons'
import { faLock } from '@fortawesome/free-solid-svg-icons'


const SignIn = () => {
    return (
        <div className='signin-div'>
            <div className="greet-div">
                <h2>Welcome Back</h2>
                <p>Enter your credentials for login</p>
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
                
                <button>Login Now</button>
            </div>

            <div className="bottom-div">
                <p>Don't have an account? <span><a>Sign Up</a></span></p>
            </div>
            
        </div>
    )
}

export default SignIn;