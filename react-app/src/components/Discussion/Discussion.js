import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from "react-redux"
import './discussion.css';



const Discussion = ({ lovedTasting }) => {


  // const comments = useSelector((state) => (state?.discussion?.comment))
  const user = useSelector(state => state?.session?.user);
  const [users, setUsers] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const response = await fetch('/api/users/');
      const responseData = await response.json();
      setUsers(responseData.users);
    };
    fetchData();
}, []);


  return (
    null
//     <div className='commentsOuterContainer'>
//       <div className='commentsInnerContainer'>
//         {comments?.map((comment) => {  
//           return (
//             <div className="commentcontainer">
//               <div className="comment">
//                 {comment?.tasting_id === lovedTasting.id ?
//                 <div>
//                   {users?.filter(user => user?.id === comment?.user_id )?.map(filteredUser => (
//                   <div>
                    
//                   </div>
//                 ))}
//                 </div> : null}
//                 {comment?.tasting_id === id ?
//                 <div className="description">
//                     {comment?.description}
//                 </div> : null}
//               </div>     
//               {comment?.tasting_id === lovedTasting.id && lovedTasting.user_id === comment.user_id ?
//                 <div className="description">
//                   <h1>original poster</h1>
//                   {comment?.description}
//                 </div>  : null}
//               <div className="deleteEditBtn">
//               {comment?.user_id === user_id && comment?.post_id === id ?
//                 <button className="delete" onClick={removeComment(comment?.id)}><i className="fa-solid fa-trash deletePenIcon"></i></button>  : null}
//                 {comment?.user_id === user_id && comment?.post_id === id ?
//                 <div className="editnote" >
//                   {<button className={'note'} onClick={() => setShowModal(true)}><i className="fa-solid fa-pen-to-square notepenIcon" > </i></button>}
//                     {/* {showModal && (
//                       <Modal className={'editmodal'} onClose={() => setShowModal(false)}>
//                         <EditComment comment={comment} id={comment.id} setShowModal={setShowModal} />
//                       </Modal>
//                     )} */}
//                 </div> : null}
//               </div>
//             </div>
//           )
//         })}
//       </div>
//     </div>
  );
};


export default Discussion;