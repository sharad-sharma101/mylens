import React , {useEffect , useState , useContext} from 'react'
import {MediumContext} from '../context/MediumContext'


const CommentsSection = ({post}) =>{
    const [Comment, setComment] = useState('')
    const [Comments, setComments] = useState([])
    const {user} = useContext(MediumContext);
    useEffect(() => {
      async function getComment() {
        const res = await fetch('https://my-lens-ae741-default-rtdb.firebaseio.com/userDataRecords.json',
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            }
          })
          const commentData = await res.json();
          setComments([])
          if(commentData){
          const allComment = Object.values(commentData)
          let arr = []
           allComment.map(ele => {
            if (ele.post === (post[0] === undefined ? '' : post[0].id) ) {
              // setComments([ ele , ...Comments])
              arr.push(ele);
            }
          })
          setComments(arr)
        }
      }
      getComment();
    }, [post])
    
    async function handlecomment() {
  
      if(user){
        const LastComment = {
          "comment": Comment,
          "post": post[0].id,
          "user": user.displayName ,
        };
      const res = await fetch('https://my-lens-ae741-default-rtdb.firebaseio.com/userDataRecords.json',
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(LastComment),
        }
      )
      
      setComments([LastComment , ...Comments]);
      setComment("")
      if (res) {
        alert("Your comment is post")
      }
    }else {
      alert("First you have to login to post comments.")
    }
  }
    return(
      <div className='w-full px-2 my-4 border-t-2 border-black' >
      <div className=' ' >
        <p className="block mb-2 mt-2 text-2xl font-large text-gray-900 dark:text-white" >COMMENTS</p>
        <div className='flex ' >
          <input type="text" value={Comment} onChange={(e) => setComment(e.target.value)}
            className=" form-control block  w-full  px-3  py-1.5  text-base  font-normal  text-gray-700  bg-white bg-clip-padding  border border-solid border-gray-300  rounded  transition ease-in-out  m-0  focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none" 
            id="exampleFormControlInput1" placeholder="Add to Comment..."/>
          <button type="button"  onClick={() => handlecomment()} className=" mx-4 inline-block px-6 py-2.5 bg-blue-600 text-white font-medium text-xs leading-tight uppercase rounded-full shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out">Post</button>
  
        </div>
        <div className='my-3 ' >
          {
            Comments.length != 0 
            ? 
              Comments.map(ele => 
                ( 
                  <div className=' px-2 my-2 mx-4 ' >
                    <p className='text-slate-500' >@{ele.user}</p>
                    <p>{ele.comment}</p>
                  </div>   
                )) 
              :
              (
                  <p className='text-5xl flex text-slate-400 place-self-center ' >No Comments</p>
              )
          }
        </div>
      </div>
    </div>
    )
  }

export default CommentsSection
