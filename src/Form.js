import { useState } from 'react';
import classes from './Form.module.scss'

const Form = ({timeline, user, fetchChats}) => {

    const [enteredMessage, setEnteredMessage] = useState('');
    const [showError, setShowError] = useState(false);
    
    const handleSubmit = (e) => {
        e.preventDefault();

        if(enteredMessage.trim().length === 0) {
            setShowError(true)
            return
        }else {
            setShowError(false)
            setEnteredMessage("");
        }

        fetch('https://message-board-48bb4-default-rtdb.firebaseio.com/chats.json', {
        method: "POST",
        body: JSON.stringify({
        id: timeline.length + 1,
        email: user.email,
        displayName: user.displayName,
        message: enteredMessage })     
        })
        .then(()=>fetchChats())  
    }

    return ( 
        <form className={classes.form}>
            <div className={classes.inputs}>
                <input type="text" placeholder="Message" required value={enteredMessage} onChange={(e)=>setEnteredMessage(e.target.value)}/>
                <div>{showError && <p className={classes.error}>*Message input is empty*</p>}</div>
            </div>

            <button type="submit" className={classes.sendBtn} onClick={handleSubmit}>
                +
            </button>    
        </form>
     );
}
 
export default Form;











// import { useState } from 'react';
// import classes from './Form.module.scss'

// const Form = ({timeline, 
//               enteredEmail, 
//               user,
//               fetchChats,
//               }) => {

//     const [enteredMessage, setEnteredMessage] = useState('');
//     const [showError, setShowError] = useState(false);
    
//     const handleSubmit = (e) => {
//         e.preventDefault();

//         if(enteredMessage.trim().length === 0) {
//             setShowError(true)
//             return
//         }else {
//             setShowError(false)
//             setEnteredMessage("");
//         }

//         fetch('https://message-board-48bb4-default-rtdb.firebaseio.com/chats.json', {
//         method: "POST",
//         body: JSON.stringify({
//         id: timeline.length + 1,
//         email: enteredEmail,
//         displayName: user.displayName,
//         message: enteredMessage,
//         })     
//     }).then(()=>fetchChats())  
//     }

//     return ( 
//         <form className={classes.form}>
//             <div className={classes.inputs}>
//                 <input type="text" placeholder="Message" required value={enteredMessage} onChange={(e)=>setEnteredMessage(e.target.value)}/>
//                 <div>{showError && <p className={classes.error}>*Message input is empty*</p>}</div>
//             </div>

//             <button type="submit" className={classes.sendBtn} onClick={handleSubmit}>
//                 +
//             </button>    
//         </form>
//      );
// }
 
// export default Form;