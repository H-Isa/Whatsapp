import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import classes from './SignInModal.module.scss'
import {getAuth, signInWithEmailAndPassword} from "firebase/auth"


const SignInModal = ({user, setUser}) => {

  const [enteredEmail, setEnteredEmail] = useState('');
  const [enteredPassword, setEnteredPassword] = useState('');
  const [showError, setShowError] = useState(false);
  const [isloading, setIsLoading] = useState(false);
  const auth = getAuth();
  const navigate = useNavigate()

const onSignIn = (e) => {
    e.preventDefault(); 
    
    setIsLoading(true)

    signInWithEmailAndPassword(auth, enteredEmail, enteredPassword)
      .then((cred)=> {
          setUser(cred.user) 
          setIsLoading(false)
      })
      .catch(()=> {
        setShowError(true)
        setIsLoading(false)
      })
      setEnteredPassword('')
      setShowError(false)
  }

    return ( 
            <div>
                <div className={classes.backdrop}/>
                <div className={classes.container}>
                    <div className={classes.container_title}>
                        Sign In
                    </div>

                    <form className={classes.form}>
                        <input type="text" 
                               placeholder="Email" 
                               className={classes.form_username} 
                               value={enteredEmail} 
                               onChange={(e)=>setEnteredEmail(e.target.value)}/>

                        <input type="password" 
                               placeholder="Password" 
                               className={classes.form_password}
                               value={enteredPassword}
                               onChange={(e)=>setEnteredPassword(e.target.value)}/>

                        {showError && <p className={classes.error}>Invalid username or password</p>}
                        {isloading && <p className={classes.loading}>Signing in ...</p>}

                        <div className={classes.signIn}>

                            <button className={classes.signInBtn} onClick={onSignIn}>Sign In</button>
                                                
                            <Link to="/signup">
                                <div className={classes.signUpMessage}>Click here to create a new user</div>
                            </Link>
                        </div>
                    </form>

                </div>
            </div>
         );
}
 
export default SignInModal;











// import { Link } from 'react-router-dom';
// import classes from './SignInModal.module.scss'

// const SignInModal = ({enteredEmail, 
//                       setEnteredEmail, 
//                       enteredPassword, 
//                       setEnteredPassword,
//                       onSignIn, 
//                       showError,
//                       isloading,}) => {

//     return ( 
//             <div>
//                 <div className={classes.backdrop}/>
//                 <div className={classes.container}>
//                     <div className={classes.container_title}>
//                         Sign In
//                     </div>

//                     <form className={classes.form}>
//                         <input type="text" 
//                                placeholder="Email" 
//                                className={classes.form_username} 
//                                value={enteredEmail} 
//                                onChange={(e)=>setEnteredEmail(e.target.value)}/>

//                         <input type="password" 
//                                placeholder="Password" 
//                                className={classes.form_password}
//                                value={enteredPassword}
//                                onChange={(e)=>setEnteredPassword(e.target.value)}/>

//                         {showError && <p className={classes.error}>*Invalid username or password*</p>}
//                         {isloading && <p>Signing in ...</p>}
//                         <div className={classes.signIn}>

//                             {/* <Link to="/chat"> */}
//                             <button className={classes.signInBtn} onClick={onSignIn}>Sign In</button>
//                             {/* </Link> */}
                                                
//                             <Link to="/signup">
//                                 <div className={classes.signUpMessage}>Click here to create a new user</div>
//                             </Link>
//                         </div>
//                     </form>

//                 </div>
//             </div>
//          );
// }
 
// export default SignInModal;
