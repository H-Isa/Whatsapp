import classes from './Modal.module.scss'

const Modal = (props) => {
    // props
    // const username = props.enteredUsername
    return ( 
            <div>
                <div className={classes.backdrop}/>
                <div className={classes.container}>
                    <div className={classes.container_title}>
                        Sign up or login
                    </div>

                    <form className={classes.form}>
                        <input type="text" placeholder="Username" className={classes.form_username} value={props.enteredUsername} onChange={(e)=>props.setEnteredUsername(e.target.value)}/>
                        <input type="password" placeholder="Password"  className={classes.form_password}/>
                        <button type="submit" className={classes.btn} onClick={props.onHandleModal}>Login</button>
                    </form>

                </div>
            </div>
         );
}
 
export default Modal;
