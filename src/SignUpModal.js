import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import classes from './SignUpModal.module.scss'
import {getAuth, createUserWithEmailAndPassword, updateProfile} from "firebase/auth"

const SignUpModal = () => {

  const [signUpEmail, setSignUpEmail] = useState('')
  const [signUpPassword, setSignUpPassword] = useState('')
  const [signUpDisplayName, setSignUpDisplayName] = useState('')
  const [showError, setShowError] = useState(false);
  const [isloading, setIsLoading] = useState(false);
  const [user, setUser] = useState(null)
  const auth = getAuth();
  const navigate = useNavigate()


const onSignUp = (e) => {
    e.preventDefault()
    
    if (signUpEmail.trim().length === 0 ||
        !signUpEmail.includes('@') ||
        signUpPassword.trim().length < 6
        ) {
      setShowError(true)
      setSignUpEmail('');
      setSignUpDisplayName('')
      setSignUpPassword('')
      return
    }

    setIsLoading(true)

    createUserWithEmailAndPassword(auth, signUpEmail, signUpPassword)
      .then(async (cred)=> {
          await  updateProfile(auth.currentUser, {displayName: signUpDisplayName})
          setUser(cred.user)
          setIsLoading(false)
          setSignUpPassword("")
          navigate("/chat")
      })
      .catch(()=> {
        setIsLoading(false)
        setShowError(true)
      })
      setSignUpPassword('')
      setShowError(false)
  }

    return ( 
            <div>
                <div className={classes.backdrop}/>
                <div className={classes.container}>
                    <div className={classes.container_title}>
                        Sign Up
                    </div>

                    <form className={classes.form}>
                        <input type="text" 
                               placeholder="Email" 
                               className={classes.form_email} 
                               value={signUpEmail} 
                               onChange={(e)=>setSignUpEmail(e.target.value)}/>

                        <input type="text" 
                               placeholder="Username" 
                               className={classes.form_displayName} 
                               value={signUpDisplayName} 
                               onChange={(e)=>setSignUpDisplayName(e.target.value)}/>

                        <input type="password" 
                               placeholder="Password" 
                               className={classes.form_password}
                               value={signUpPassword}
                               onChange={(e)=>setSignUpPassword(e.target.value)}/>

                        {showError && <p className={classes.error}>Invalid email address or password is less than 6 characters</p>}
                        {isloading && <p className={classes.loading}>Creating a new user...</p>}
                        
                        <div className={classes.signIn}>
    
                           <button className={classes.signUpBtn} onClick={onSignUp}>Sign up </button>
                    
                            <Link to="/signin">
                                <div className={classes.signInMessage}>Already have an account? Click here to sign in</div>
                            </Link>
                        
                        </div>
                    </form>

                </div>
            </div>
         );
}
 
export default SignUpModal;









// import { Link } from 'react-router-dom';
// import classes from './SignUpModal.module.scss'

// const SignUpModal = ({signUpEmail, 
//                       setSignUpEmail, 
//                       signUpDisplayName,
//                       setSignUpDisplayName,
//                       signUpPassword, 
//                       setSignUpPassword, 
//                       onSignUp,
//                       showError,
//                       isloading,}) => {

//     return ( 
//             <div>
//                 <div className={classes.backdrop}/>
//                 <div className={classes.container}>
//                     <div className={classes.container_title}>
//                         Sign Up
//                     </div>

//                     <form className={classes.form}>
//                         <input type="text" 
//                                placeholder="Email" 
//                                className={classes.form_email} 
//                                value={signUpEmail} 
//                                onChange={(e)=>setSignUpEmail(e.target.value)}/>

//                         <input type="text" 
//                                placeholder="Username" 
//                                className={classes.form_displayName} 
//                                value={signUpDisplayName} 
//                                onChange={(e)=>setSignUpDisplayName(e.target.value)}/>

//                         <input type="password" 
//                                placeholder="Password" 
//                                className={classes.form_password}
//                                value={signUpPassword}
//                                onChange={(e)=>setSignUpPassword(e.target.value)}/>

//                         {showError && <p className={classes.error}>*Invalid email address or password is less than 6 characters*</p>}
//                         {isloading && <p>Creating a new user...</p>}
//                         <div className={classes.signIn}>
    
//                            <button className={classes.signUpBtn} onClick={onSignUp}>Sign up </button>
                    
//                             <Link to="/signin">
//                                 <div className={classes.signInMessage}>Already have an account? Click here to sign in</div>
//                             </Link>
                        
//                         </div>
//                     </form>

//                 </div>
//             </div>
//          );
// }
 
// export default SignUpModal;
