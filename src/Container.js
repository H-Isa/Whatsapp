import Form from "./Form";
import { useEffect, useRef, useState } from 'react';
import classes from './container.module.scss'

const Container = (props) => {

    const [timeline, setTimeline] = useState([
        {
            username: 'Salim',
            message: 'Eden Hazard is the best player of all time'
        },
        {
            username: 'Hamza',
            message: 'Marcus Rashford is the new face of the premier league'
        },
        {
            username: 'Umar',
            message: 'Im unable to debug my application. Angular.js is too difficult'
        }
    ]);

    const [currentChat, setCurrentChat] = useState(null);
    const background = useRef();
    const itemsRef = useRef(null);


    const addChat = (enterednewChat) => {
        setTimeline((prev)=>([...prev, 
            enterednewChat,
            props.enteredUsername
        ])) 

        setCurrentChat(enterednewChat)
    }

    function getMap() {
        if (!itemsRef.current) {
          // Initialize the Map on first usage.
          itemsRef.current = new Map();
        }
        return itemsRef.current;
      }

    function scrollToId(itemId) {
        console.log(itemId)
        const map = getMap();
        const node = map.get(itemId);
        node.scrollIntoView({
          behavior: 'smooth',
          block: 'nearest',
          inline: 'center'
        });
      }

    useEffect(()=>{
        if(currentChat)
        scrollToId(currentChat.id)
    }, [timeline])

    const changeBackground = (color) => {
        background.current.style.backgroundColor = color;
    }

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
            <div className={classes.body_title}>Mini Message Board</div>

            <div className={classes.display}>
                
            {/* {DUMMY_DATA.map((chat)=>(
                    <div className={classes.oldChat}>
                        <div className={classes.oldChat_body}>
                            <div className={classes.oldChat_body_username}>{chat.username}</div>
                            <div className={classes.oldChat_body_message}><p className={classes.oldChat_body_messageparagraph}>{chat.message}</p></div>
                        </div>
                        <div>{chat.oldDate}</div>
                    </div>
                    
                ))} */}

                {timeline.map((chat)=>(
                    <div className={classes.newChat} ref={(node) => {
                        const map = getMap();
                        console.log(map)
                        console.log(node)

                        if (node) {
                          map.set(chat.id, node);
                        } else {
                          map.delete(chat.id);
                        }
                      }}>
                        <div className={classes.newChat_body}>
                            <div className={classes.newChat_body_username}>{chat.username}</div>
                            <div className={classes.newChat_body_message}><p className={classes.newChat_body_messageparagraph}>{chat.message}</p></div>
                        </div>
                        {/* <div>{chat.newDate}</div> */}
                    </div>
                    
                ))}
            </div>


            <Form onAddChat={addChat} timeline={timeline} enteredUsername={props.enteredUsername} setEnteredUsername={props.setEnteredUsername}/>
            
            </div>
        </div>
     );
}
 
export default Container;