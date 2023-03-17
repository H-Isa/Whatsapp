import { useEffect } from 'react';
import classes from './container.module.scss'

const NewChat = ({id, displayName, message, timeline, currentChat, itemsRef,}) => {

    useEffect(()=>{
        if(currentChat)
        scrollToId(currentChat.id)
    }, [timeline])

    function getMap() {
        if (!itemsRef.current) {
          itemsRef.current = new Map();
        }
        return itemsRef.current;
      }

    function scrollToId(itemId) {
        const map = getMap();
        const node = map.get(itemId);
        node.scrollIntoView({
          behavior: 'smooth',
          block: 'nearest',
          inline: 'center'
        });
      }

    return ( 
        <div className={classes.newChat} key={id} ref={(node) => {
            const map = getMap();

            if (node) {
              map.set(id, node);
            } else {
              map.delete(id);
            }
          }}>

            <div className={classes.newChat_body}>
                <div className={classes.newChat_body_username}>{displayName}</div>
                <div className={classes.newChat_body_message}>{message}</div>
            </div>
           
        </div>
     );
}
 
export default NewChat;












// import { useEffect } from 'react';
// import classes from './container.module.scss'

// const NewChat = ({id, displayName, message, timeline, currentChat, itemsRef,}) => {

//     useEffect(()=>{
//         if(currentChat)
//         scrollToId(currentChat.id)
//     }, [timeline])

//     function getMap() {
//         if (!itemsRef.current) {
//           itemsRef.current = new Map();
//         }
//         return itemsRef.current;
//       }

//     function scrollToId(itemId) {
//         const map = getMap();
//         const node = map.get(itemId);
//         node.scrollIntoView({
//           behavior: 'smooth',
//           block: 'nearest',
//           inline: 'center'
//         });
//       }

//     return ( 
//         <div className={classes.newChat} key={id} ref={(node) => {
//             const map = getMap();

//             if (node) {
//               map.set(id, node);
//             } else {
//               map.delete(id);
//             }
//           }}>

//             <div className={classes.newChat_body}>
//                 <div className={classes.newChat_body_username}>{displayName}</div>
//                 <div className={classes.newChat_body_message}>{message}</div>
//             </div>
           
//         </div>
//      );
// }
 
// export default NewChat;