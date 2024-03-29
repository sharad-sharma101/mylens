import Image from 'next/image'
import { AiFillPlayCircle , AiOutlineHeart , AiFillHeart } from 'react-icons/ai'
import { IoLogoTwitter } from 'react-icons/io'
import { FaFacebook } from 'react-icons/fa'
import { GrLinkedin } from 'react-icons/gr'
import { HiOutlineLink } from 'react-icons/hi'
import { BiBookmarks } from 'react-icons/bi'
import { FiMoreHorizontal } from 'react-icons/fi'
import { useState , useEffect , useContext } from 'react'
import  CommentsSection from './CommentsSection'

const styles = {
  wrapper: `flex items-center justify-center flex-[4] border-l border-r bg-[#f7ebf6] `,
  content: `h-screen w-full  justify-center overflow-scroll p-[2rem]`,
  referencesContainer: `flex justify-between items-center mt-[2.2rem] mb-[1.2rem]`,
  postHeaderContainer: `flex`,
  authorContainer: `flex gap-[1rem]`,
  authorProfileImageContainer: `h-[3rem] w-[3rem] grid center rounded-full overflow-hidden`,
  image: `object-cover w-screen h-screen `,
  column: `flex-1 flex flex-col justify-center`,
  postDetails: `flex gap-[.2rem] text-[#787878]`,
  listenButton: `flex items-center gap-[.2rem] text-[#1A8917]`,
  socials: `flex gap-[1rem] text-[#787878] cursor-pointer`,
  space: `w-[.5rem]`,
  articleMainContainer: `flex flex-col gap-[1rem]`,
  bannerContainer: `h-[18rem] w-full grid center overflow-hidden mb-[2rem]`,
  title: `font-bold text-3xl`,
  subtitle: `font-mediumSerifItalic text-[1.2rem] text-[#808080]`,
  articleText: `font-mediumSerif text-[1.4rem] text-[#292929]`,
}


const ArticleMain = ({ post, author  }) =>{
  
   const [Like, setLike] = useState(false)
   useEffect(() => {
     setLike(false);
   }, [post])
   
  return(
    <div className={styles.wrapper}>
    <div className={styles.content}>
      {post.length > 0 && author.length > 0 ? (
        <>
          <div className={styles.referencesContainer}>
            <div className={styles.authorContainer}>
              <div className={styles.authorProfileImageContainer}>
                <Image
                  src={`https://res.cloudinary.com/demo/image/fetch/${author[0].data.imageUrl}`}
                  alt='author'
                  width={100}
                  height={100}
                />
              </div>
              <div className={styles.column}>
                <div>{author[0].data?.name}</div>
                <div className={styles.postDetails}>
                  <span>
                    {new Date(post[0].data?.postedOn).toLocaleString(
                      'en-US',
                      {
                        day: 'numeric',
                        month: 'short',
                      },
                    )}{' '}
                    • {post[0].data?.postLength} min read •
                  </span>
                  <span className={styles.listenButton}>
                    <AiFillPlayCircle /> Listen
                  </span>
                </div>
              </div>
            </div>
            <div className={styles.socials}>
              <IoLogoTwitter />
              <FaFacebook />
              <GrLinkedin />
              <HiOutlineLink />
              <div className={styles.space} />
              <BiBookmarks />
              <FiMoreHorizontal />
            </div>
          </div>
          <div className={styles.articleMainContainer}>
            <div className={styles.bannerContainer}>
              <Image
                className={styles.image}
                src={`https://res.cloudinary.com/demo/image/fetch/${post[0].data.bannerImage}`}
                alt='banner'
                height={100}
                width={100}
              />
            </div>
            <div className='flex justify-between' >
            <h1 className={styles.title}>{post[0].data?.title}</h1>
            <span onClick={()=>{setLike(!Like)}} className='p-2  border border-black rounded-full mx-3 cursor-pointer group-hover:opacity-100' >
            { Like 
                ?
            <AiFillHeart size={50} />
                :
            <AiOutlineHeart size={50}  />
            }
            </span>
            </div>
            <h4 className={styles.subtitle}>
              <div>
                {author[0].data?.name},{' '}
                {new Date(post[0].data?.postedOn).toLocaleString('en-US', {
                  day: 'numeric',
                  month: 'short',
                  year: 'numeric',
                })}
              </div>
              <div>{post[0].data?.brief}</div>
            </h4>
            <div className={styles.articleText}>{post[0].data?.body}</div>
          </div>
        </>
      ) : (
        <div>Loading...</div>
      )}

      <CommentsSection post={post} />

    </div>
  </div>
  )
}

export default ArticleMain