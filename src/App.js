import { Fragment, useState } from 'react';
import Container from './Container';
import Modal from './Modal';

function App() {

  const [showModal, setShowModal] = useState(true);
  const [enteredUsername, setEnteredUsername] = useState('');

  const handleModal = (e) => {
    e.preventDefault();
    setShowModal(false)
  } 

  return (
    <Fragment>
      {showModal ? <Modal onHandleModal={handleModal} 
                          enteredUsername={enteredUsername} 
                          setEnteredUsername={setEnteredUsername}/> : <Container enteredUsername={enteredUsername} 
                                                                                 setEnteredUsername={setEnteredUsername} />}
    </Fragment>
  );
}

export default App;
