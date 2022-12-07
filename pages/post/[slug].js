import ArticleMain from "../../components/ArticleMain"
import ReaderNav from "../../components/ReaderNav"
import Recommendation from "../../components/Recommendation"
import { useRouter } from 'next/router'
import { useState, useContext, useEffect } from 'react'
import { MediumContext } from '../../context/MediumContext'


const Post = () =>{
  const router = useRouter()
  const { allPosts, allUsers } = useContext(MediumContext)
  const [author, setAuthor] = useState([])
  const [post, setPost] = useState([])
 
  useEffect(() => {
    if (!(allPosts.length === 0)) {
      setPost(allPosts.filter(post => post.id === router.query.slug))
    }
  }, [allPosts, router.query.slug])
  
  useEffect(() => {
    if (!(post.length === 0 || allUsers.length === 0)) {
      setAuthor(allUsers.filter(user => user.id === post[0].data.author))
    }
  }, [allUsers, post, allUsers.length])
  console.log(author);
    return(
        <div className='flex bg-[#fadef6] ' >
            <ReaderNav/>
            <ArticleMain post={post} author={author}/>
            <Recommendation author={author}/>
        </div>
    )
}
export default Post
