import Image from 'next/image'
import { useContext , useState} from 'react'
import { MediumContext } from '../context/MediumContext'
import { AiOutlineSearch } from 'react-icons/ai'
import { MdMarkEmailUnread } from 'react-icons/md'
import Link from 'next/link'
import { collection, query, where, getDocs, updateDoc , doc } from 'firebase/firestore'
import { db } from '../firebase'


const styles = {
  wrapper: `h-screen min-w-[10rem] max-w-[30rem] flex-[1.2] p-[2rem] overflow-scroll`,
  cont: ``,
  accentedButton: `flex items-center justify-center text-sm bg-black text-white my-[2rem] py-[.6rem] rounded-full`,
  searchBar: `flex items-center gap-[.6rem] h-[2.6rem] border px-[1rem] rounded-full bg-white`,
  searchInput: `border-none outline-none bg-none w-full`,
  authorContainer: `my-[2rem]`,
  authorProfileImageContainer: `h-[5rem] w-[5rem] rounded-full overflow-hidden`,
  authorName: `font-semibold mb-[.2rem] mt-[1rem]`,
  authorFollowing: `text-[#787878]`,
  cat: `flex items-center justify-center text-sm bg-black rounded-full text-white w-[5rem] mx-[0.6rem] my-[1rem] `,
  authorActions: `flex gap-[.6rem] my-[1rem]`,
  actionButton: `bg-[#1A8917] text-white rounded-full px-[.6rem] py-[.4rem] text-sm`,
  recommendationContainer: ``,
  title: `my-[1rem]`,
  articlesContainer: ``,
  articleContentWrapper: `flex items-center justify-between cursor-pointer min-h-[6rem] shadow-lg my-2  p-1 hover:scale-110 `,
  articleContent: `flex-[3] my-2 `,
  recommendationAuthorContainer: `flex items-center gap-[.6rem]`,
  recommendationAuthorProfileImageContainer: `rounded-full overflow-hidden h-[1.4rem] w-[1.4rem]`,
  recommendationAuthorName: `text-sm`,
  recommendationTitle: `font-bold`,
  recommendationThumbnailContainer: `flex flex-1 items-center justify-center h-[4rem] w-[4rem]`,
  recommendationThumbnail: `object-cover`,
}

const Recommendations = ({ author }) => {
  const { allPosts } = useContext(MediumContext)

  // const recommendedPosts = []
    const recommendedPosts = allPosts.filter(ele =>  ele.data.author === ( (author[0] === undefined) ? '' : author[0].id ))
    const { user , handleUserAuth } = useContext(MediumContext) 
    const [flag, setflag] = useState(true)
    const fans = async () => {
          if(user){
            if(flag){
           let fc = author[0].data.followerCount;
          const userRef = query(collection(db, "users"), where("email", "==", author[0].data.email));
          const findUsers = await getDocs(userRef);
          findUsers.forEach( async (user) => {
           const getUser = doc(db, 'users', user.id);
           await updateDoc(getUser, {
            followerCount:  fc+1
           });
          });
          setflag(false)}
          else{
            let fc = author[0].data.followerCount;
          const userRef = query(collection(db, "users"), where("email", "==", author[0].data.email));
          const findUsers = await getDocs(userRef);
          findUsers.forEach( async (user) => {
           const getUser = doc(db, 'users', user.id);
           await updateDoc(getUser, {
            followerCount:  fc-1
           });
          });
          setflag(true)
          }
         } else{
            alert("You have to sign in before follow anyone")
          }
    }

  return (
    <div className={styles.wrapper}>
      <div className={styles.cont}>
        <div className={styles.accentedButton} onClick={handleUserAuth}>{ user ? "Get unlimited access" : "Login"}</div>
        <div className={styles.searchBar}>
          <AiOutlineSearch />
          <input
            className={styles.searchInput}
            placeholder='Search'
            type='text'
          />
        </div>

        {author.length > 0 ? (
          <div className={styles.authorContainer}>
            <div className={styles.authorProfileImageContainer}>
              <Image
                src={`https://res.cloudinary.com/demo/image/fetch/${author[0].data.imageUrl}`}
                alt='author'
                width={100}
                height={100}
              />
            </div>
            <div className={styles.authorName}>{author[0].data.name}</div>
            <div className={styles.authorFollowing}>
              {flag ? author[0].data.followerCount : author[0].data.followerCount+1} followers
            </div>
            <div className={styles.authorActions}>
              <button className={styles.actionButton} onClick={fans} >{ flag ? 'Follow' : 'unfolow'}</button>
              <button className={styles.actionButton}>
                <MdMarkEmailUnread />
              </button>
            </div>
          </div>
        ) : (
          <div>Loading...</div>
        )}

        <div className={styles.recommendationContainer}>
          <div className={styles.title}>More from {author[0] === undefined ? 'User123' : author[0].data.name}</div>
          <div className={styles.articlesContainer}>
            {recommendedPosts.map(post => (
            <Link href={`/post/${post.id}`}>
              <div key={post.id} className={styles.articleContentWrapper}>
                <div className={styles.articleContent}>
                  <div className={styles.recommendationTitle}>{post.data.title}</div>
                  <div className={styles.cat}>{post.data.category}</div>
                </div>
                <div className={styles.recommendationThumbnailContainer}>
                  <Image
                    className={styles.recommendationThumbnail}
                    src={`https://res.cloudinary.com/demo/image/fetch/${post.data.bannerImage}`}
                    alt='thumbnail'
                    height={100}
                    width={100}
                  />
                </div>
              </div>
            </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Recommendations
