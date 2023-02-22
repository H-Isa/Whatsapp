import { useState } from 'react';
import classes from './Form.module.scss'

const Form = (props) => {

    // const [enteredUsername, setEnteredUsername] = useState('');
    const [enteredMessage, setEnteredMessage] = useState('');
    const [showError, setShowError] = useState(false);
    
    const handleSubmit = (e) => {
        e.preventDefault();

        const newChat = {
            id: props.timeline.length + 1,
            username: props.enteredUsername,
            message: enteredMessage,
        }

        if(props.enteredUsername.trim().length === 0 || enteredMessage.trim().length === 0) {
            setShowError(true)
        }else {
            setShowError(false)
            props.onAddChat(newChat)
            setEnteredMessage("");
        }
    }

    return ( 
        <form className={classes.form}>
            <div className={classes.inputs}>
                {/* <input type="text" placeholder="Username" className={classes.inputs_username} required value={props.enteredUsername} onChange={(e)=>props.setEnteredUsername(e.target.value)} /> */}
                <input type="text" placeholder="Message" required value={enteredMessage} onChange={(e)=>setEnteredMessage(e.target.value)}/>
                <div>{showError && <p className={classes.error}>*Username or message is empty*</p>}</div>
            </div>

            <button type="submit" className={classes.sendBtn} onClick={handleSubmit}>
                +
            </button>    
        </form>
     );
}
 
export default Form;