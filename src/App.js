import { Fragment, useState, useLayoutEffect } from "react";
import Container from "./Container";
import SignUpModal from "./SignUpModal";
import { initializeApp } from "@firebase/app";
import {
  getAuth,
  setPersistence,
  browserSessionPersistence,
  onAuthStateChanged,
} from "firebase/auth";
import {
  createBrowserRouter,
  Navigate,
  RouterProvider,
  useNavigate,
} from "react-router-dom";
import SignInModal from "./SignInModal";
import { getDatabase } from "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyDwoREE8VWwI28LQEgAAh1Tj3eFhv9M1vQ",
  authDomain: "message-board-48bb4.firebaseapp.com",
  databaseURL: "https://message-board-48bb4-default-rtdb.firebaseio.com",
  projectId: "message-board-48bb4",
  storageBucket: "message-board-48bb4.appspot.com",
  messagingSenderId: "47754545125",
  appId: "1:47754545125:web:c058dbd4a4dd463630110c",
  measurementId: "G-7DJLZ7CZGS",
};

const app = initializeApp(firebaseConfig);
const db = getDatabase(app);

function App() {
  const [user, setUser] = useState(null);
  const [currentUser, setCurrentUser] = useState(localStorage.getItem("user"));
  const auth = getAuth();

  useLayoutEffect(() => {
    const subs = onAuthStateChanged(auth, function (user) {
      if (user) {
        localStorage.setItem("user", user);
        return setCurrentUser(user);
      }
      setCurrentUser(null);
      localStorage.clear();
    });
    return subs;
  }, [auth]);

  const router = createBrowserRouter([
    { path: "/signup", element: <SignUpModal /> },

    {
      path: "/signin",
      element: !currentUser ? (
        <SignInModal user={user} setUser={setUser} />
      ) : (
        <Navigate replace to={"/"} />
      ),
    },
    {
      path: "/",
      element: currentUser ? (
        <Container user={user} setUser={setUser} db={db} />
      ) : (
        <Navigate replace to={"/signin"} />
      ),
    },
  ]);

  return <RouterProvider router={router} />;
}

export default App;

// import { Fragment, useState } from 'react';
// import Container from './Container';
// import SignUpModal from './SignUpModal';
// import { initializeApp } from '@firebase/app';
// import {getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, updateProfile, signOut} from "firebase/auth"
// import { createBrowserRouter, Navigate, RouterProvider, useNavigate } from "react-router-dom";
// import SignInModal from './SignInModal';

// const firebaseConfig = {
//   apiKey: "AIzaSyDwoREE8VWwI28LQEgAAh1Tj3eFhv9M1vQ",
//   authDomain: "message-board-48bb4.firebaseapp.com",
//   databaseURL: "https://message-board-48bb4-default-rtdb.firebaseio.com",
//   projectId: "message-board-48bb4",
//   storageBucket: "message-board-48bb4.appspot.com",
//   messagingSenderId: "47754545125",
//   appId: "1:47754545125:web:c058dbd4a4dd463630110c",
//   measurementId: "G-7DJLZ7CZGS"
// };

// initializeApp(firebaseConfig)

// function App() {

//   const [signUpEmail, setSignUpEmail] = useState('')
//   const [signUpPassword, setSignUpPassword] = useState('')
//   const [enteredEmail, setEnteredEmail] = useState('');
//   const [signUpDisplayName, setSignUpDisplayName] = useState('')
//   const [displayName, setDisplayName] = useState('');
//   const [enteredPassword, setEnteredPassword] = useState('');
//   const [showError, setShowError] = useState(false);
//   const [isloading, setIsLoading] = useState(false);
//   const [user, setUser] = useState(null)
//   const auth = getAuth();
//   // const navigate = useNavigate()

//   const onSignUp = (e) => {
//     e.preventDefault()

//     if (signUpEmail.trim().length === 0 ||
//         !signUpEmail.includes('@') ||
//         signUpPassword.trim().length < 6
//         ) {
//       setShowError(true)
//       return
//     }

//     setIsLoading(true)

//     createUserWithEmailAndPassword(auth, signUpEmail, signUpPassword)
//       .then(async (cred)=> {
//           await  updateProfile(auth.currentUser, {displayName: signUpDisplayName})
//           setUser(cred.user)
//           setIsLoading(false)
//           setSignUpPassword("")
//           // navigate("/chat")
//       })
//       .catch(()=> {
//         setIsLoading(false)
//         setShowError(true)
//       })

//   }

//   const onSignIn = (e) => {
//     e.preventDefault();
//     setIsLoading(true)
//     signInWithEmailAndPassword(auth, enteredEmail, enteredPassword)
//       .then((cred)=> {
//           setUser(cred.user)
//           setIsLoading(false)
//       })
//       .catch(()=> {
//         setShowError(true)
//         setIsLoading(false)
//       })
//       setEnteredPassword('')
//   }

//   const onSignOut = () => {

//     return signOut(auth)
//         // .then(()=>{
//         //   setUser(null)
//         // })
//         // .catch(()=>{
//         // })
//   }

//   const router = createBrowserRouter([
//     {path: '/signup', element: <SignUpModal onSignUp={onSignUp}
//                                             signUpEmail={signUpEmail}
//                                             setSignUpEmail={setSignUpEmail}
//                                             signUpDisplayName={signUpDisplayName}
//                                             setSignUpDisplayName={setSignUpDisplayName}
//                                             signUpPassword={signUpPassword}
//                                             setSignUpPassword={setSignUpPassword}
//                                             showError={showError}
//                                             isloading={isloading}/>
//     },

//     {path: '/signin', element: !user ? <SignInModal onSignIn={onSignIn}
//                                                     enteredEmail={enteredEmail}
//                                                     setEnteredEmail={setEnteredEmail}
//                                                     enteredPassword={enteredPassword}
//                                                     setEnteredPassword={setEnteredPassword}
//                                                     showError={showError}
//                                                     isloading={isloading}/> : <Navigate replace to={"/chat"} />},

//     {path: '/chat', element: user ?  <Container enteredEmail={enteredEmail}
//                                         user={user}
//                                         setUser={setUser}
//                                         displayName={displayName}
//                                         onSignOut={onSignOut}/> : <Navigate replace to={"/signin"} />},

//   ])

//   return <RouterProvider router={router} />

// }

// export default App;
