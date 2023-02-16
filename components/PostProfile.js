import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useState, useEffect } from 'react'
import { doc, getDoc } from 'firebase/firestore'
import { db } from '../firebase'
import Modal from 'react-modal'
import UpdateModal from './UpdateModal';

const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    transform: 'translate(-50%, -50%)',
    backgroundColor: '#fff',
    padding: 0,
    border: 'none',
  },
  overlay: {
    backgroundColor: 'rgba(10, 11, 13, 0.75)',
  },
}
const styles = {
    wrapper: `max-w-[56rem] h-[10rem] flex items-center gap-[1rem] shadow-lg cursor-pointer my-1 px-5 sm:{w-[30rem]}`,
    postDetails: `flex-[2.5] flex flex-col`,
    authorContainer: `flex gap-[.4rem]`,
    authorName: `font-semibold`,
    authorImageContainer: `grid place-items-center rounded-full overflow-hidden h-[1.4rem] w-[1.4rem]`,
    authorImage: `object-cover`,
    title: `font-bold text-2xl`,
    briefing: `text-[#787878]`,
    detailsContainer: `flex items-center justify-between text-[#787878]`,
    articleDetails: `my-2 text-[.8rem]`,
    bookmarkContainer: `cursor-pointer`,
    category: `bg-[#F2F3F2] p-1 rounded-full`,
    thumbnailContainer: `flex-1 `,
  }

const PostProfile = ({post}) => {

  const [authorData, setAuthorData] = useState(null)
  
  useEffect(() => {
    const getAuthorData = async () => {
      setAuthorData(
        await (await getDoc(doc(db, 'users', post.data.author))).data(),
      )
    }

    getAuthorData()
    console.log(post.id + " " + post.data.title);
  }, [post])
  const router = useRouter();
  const Show = () =>{
    console.log("ho gaya kya");
    console.log(post.data.title)
  }
  return(
   
    <div className={styles.wrapper}>
      <div className={styles.postDetails}>
      <Link href={`/post/${post.id}`}>
        <h1 className={styles.title}>{post.data.title.substr(0,40)}...</h1>
        </Link>
        <div className={styles.briefing}>{post.data.brief}</div>
        <div className={styles.detailsContainer}>
          <span className={styles.articleDetails}>
            {new Date(post.data.postedOn).toLocaleString('en-US', {
              day: 'numeric',
              month: 'short',
            })}
            • {post.data.postLength} min read •{' '}
            <span className={styles.category}>{post.data.category}</span>
          </span>
        </div>
      </div>
      <div className={styles.thumbnailContainer}>
        <Image
          src={`https://res.cloudinary.com/demo/image/fetch/${post.data.bannerImage}`}
          alt='thumbnail'
          height={150}
          width={250}
        />
      </div>
    
    {/* <Link href={`/profile/${post.data.author}/?update=1`} ></Link> */}
        <button className="relative inline-flex items-center justify-center p-0.5 mb-2 mr-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-purple-500 to-pink-500 group-hover:from-purple-500 group-hover:to-pink-500 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-purple-200 dark:focus:ring-purple-800"
                           onClick={Show}  >
            <span className="relative px-5 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-opacity-0">
              UPDATE
            </span>
        </button>
    
    <button className="relative inline-flex items-center justify-center p-0.5 mb-2 mr-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-pink-500 to-orange-400 group-hover:from-pink-500 group-hover:to-orange-400 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-pink-200 dark:focus:ring-pink-800">
        <span className="relative px-5 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-opacity-0">
            DELETE
        </span>
    </button>
    {
       <Modal 
        isOpen={!!router.query.update}
        onRequestClose={() => router.push(`/profile/${post.data.author}`)}
        style={customStyles} >
        <UpdateModal info={post.id} />
      </Modal>}
    </div>
  )
}

export default PostProfile
