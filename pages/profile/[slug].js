import { useContext  } from "react"
import Header from "../../components/Header"
import ProfileNav from "../../components/ProfileNav"
import { MediumContext } from '../../context/MediumContext'
import PostProfile from "../../components/PostProfile"
import { useRouter } from "next/router"
const styles = {
  wrapper: `mx-auto bg-[#faccea] `,
  main: `flex justify-center bg-[#fadef6]  `,
  container: `max-w-7xl flex-1 sm:{w-[30rem]}`,
  postsList: `flex flex-col gap-1 p-2 sm:grid-cols-2 md:gap-6 md:p-6 lg:grid-cols-3 sm:{w-[30rem]}  `,
}

const profile = () => {
  const { allPosts , user } = useContext(MediumContext)
  const router = useRouter()
  const email = router.query.slug
  
    
  
  return (
    <div>
      <Header/>
      {/* <ProfileNav user={user} /> */}
        <div className={styles.main}>
        <br /><br />
        <h1 className="font-bold text-2xl">Blog written by you:</h1>
        <br /> <br />
          <div className={styles.container}>
            <div className={styles.postsList}>
              {allPosts.map(post => 
                ( post.data.author === email
                ?
                <>
                <PostProfile  post={post} key={post.id} />
                </>
                :
                <div></div>
                )
              )}
            </div>
          </div>
        </div>  
    </div>
  )
}

export default profile