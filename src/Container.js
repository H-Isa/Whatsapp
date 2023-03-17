import Form from "./Form";
import { useEffect, useRef, useState } from 'react';
import classes from './container.module.scss'
import NewChat from "./NewChat";
import { useNavigate } from "react-router-dom";
import {getAuth, signOut} from "firebase/auth"


const Container = ({user,setUser}) => {

    const [timeline, setTimeline] = useState([]);
    const [currentChat, setCurrentChat] = useState(null);
    const [isloading, setIsLoading] = useState(false);
    const background = useRef();
    const itemsRef = useRef();
    const navigate = useNavigate();
    const auth = getAuth()

    const changeBackground = (color) => {
        background.current.style.backgroundColor = color;
    }

    const handleSignOut = () => {
        signOut(auth)
        .then(()=>{
            setUser(null)
            navigate("/signin")
          })
          .catch(()=>{
          });

    }

    const fetchChats = async () => {
        const response = await fetch('https://message-board-48bb4-default-rtdb.firebaseio.com/chats.json');
        const data = await response.json();

        const loadedChats = [];

        for (const key in data) {
            loadedChats.push({
                id: key,
                displayName: data[key].displayName,
                message: data[key].message,
            })
        }

        setTimeline(loadedChats);
        setIsLoading(false)
        }

    useEffect(() => {
        setIsLoading(true)
    
        fetchChats();
      
    }, [])


    return ( 
        <div className={classes.container}>
            <header className={classes.header}>
                <div className={classes.header_toggle}>
                    <div className={classes.header_toggle_red} onClick={()=>changeBackground('white')}/>
                    <div className={classes.header_toggle_yellow} onClick={()=>changeBackground('yellow')}/>
                    <div className={classes.header_toggle_green} onClick={()=>changeBackground('green')}/>
                </div>
                <div className={classes.header_title}>Whatsapp</div>
            </header>
            <div className={classes.body} ref={background}>
                <div className={classes.subheading}>
                    <div className={classes.body_title}>Mini Message Board</div>
                    <button onClick={handleSignOut}>Logout</button>
                </div>
            
                <div className={classes.display}>
                    {isloading && <div>Fetching data</div>}

                    {timeline.map((chat)=>(
                        <NewChat key={chat.id}
                                id={chat.id} 
                                displayName={chat.displayName}
                                message={chat.message}
                                timeline={timeline}
                                currentChat={currentChat}
                                itemsRef={itemsRef} />   
                    ))}
                </div>

            <Form  timeline={timeline}
                   fetchChats={fetchChats}  
                   user={user}/>

            </div>
        </div>
     );
}
 
export default Container;













// import Form from "./Form";
// import { useEffect, useRef, useState } from 'react';
// import classes from './container.module.scss'
// import NewChat from "./NewChat";
// import { Link, useNavigate } from "react-router-dom";


// const Container = ({enteredEmail,
//                    displayName,
//                    user,
//                    setUser,
//                    onSignOut}) => {

//     const [timeline, setTimeline] = useState([]);
//     const [currentChat, setCurrentChat] = useState(null);
//     const [isloading, setIsLoading] = useState(false);
//     const background = useRef();
//     const itemsRef = useRef();
//     const navigate = useNavigate();

//     const changeBackground = (color) => {
//         background.current.style.backgroundColor = color;
//     }

//     const handleSignOut = () => {
//         onSignOut()
//         .then(()=>{
//             console.log("log ou successful")
//             setUser(null)
//             // navigate("/signin")
//           })
//           .catch(()=>{
//           });

//     }

//     const fetchChats = async () => {
//         const response = await fetch('https://message-board-48bb4-default-rtdb.firebaseio.com/chats.json');
//         const data = await response.json();

//         const loadedChats = [];

//         for (const key in data) {
//             loadedChats.push({
//                 id: key,
//                 displayName: data[key].displayName,
//                 message: data[key].message,
//             })
//         }

//         setTimeline(loadedChats);
//         setIsLoading(false)
//         }

//     useEffect(() => {
//         setIsLoading(true)
        
            
//         fetchChats();
      
//     }, [])



//     return ( 
//         <div className={classes.container}>
//             <header className={classes.header}>
//                 <div className={classes.header_toggle}>
//                     <div className={classes.header_toggle_red} onClick={()=>changeBackground('white')}/>
//                     <div className={classes.header_toggle_yellow} onClick={()=>changeBackground('yellow')}/>
//                     <div className={classes.header_toggle_green} onClick={()=>changeBackground('green')}/>
//                 </div>
//                 <div className={classes.header_title}>Whatsapp</div>
//             </header>
//             <div className={classes.body} ref={background}>
//             <div className={classes.body_title}>Mini Message Board</div>
            
//             {/* <Link to="/signin"> */}
//                 <button onClick={handleSignOut}>Logout</button>
//             {/* </Link> */}
            
//             <div className={classes.display}>
//                 {isloading && <div>Fetching data</div>}

//                 {timeline.map((chat)=>(
//                     <NewChat key={chat.id}
//                              id={chat.id} 
//                              displayName={chat.displayName}
//                              message={chat.message}
//                              timeline={timeline}
//                              currentChat={currentChat}
//                              itemsRef={itemsRef} />   
//                 ))}
//             </div>

//             <Form  timeline={timeline}
//                     fetchChats={fetchChats} 
//                    enteredEmail={enteredEmail} 
//                    displayName={displayName} 
//                    user={user}/>

//             </div>
//         </div>
//      );
// }
 
// export default Container;