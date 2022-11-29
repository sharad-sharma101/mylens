import Image from 'next/image'
import { AiFillPlayCircle } from 'react-icons/ai'
import { IoLogoTwitter } from 'react-icons/io'
import { FaFacebook } from 'react-icons/fa'
import { GrLinkedin } from 'react-icons/gr'
import { HiOutlineLink } from 'react-icons/hi'
import { BiBookmarks } from 'react-icons/bi'
import { FiMoreHorizontal } from 'react-icons/fi'

import Author from '../static/author.jpg'
import Thumbnail from '../static/thumbnail.webp'

const styles = {
  wrapper: `flex items-center justify-center flex-[3] border-l border-r `,
  content: `h-screen overflow-scroll p-[2rem]`,
  referencesContainer: `flex justify-between items-center mt-[2.2rem] mb-[1.2rem]`,
  authorContainer: `flex gap-[1rem]`,
  authorProfileImageContainer: `h-[3rem] w-[3rem] grid center rounded-full overflow-hidden`,
  image: `object-cover`,
  column: `flex-1 flex flex-col justify-center`,
  postDetails: `flex gap-[.2rem] text-[#787878]`,
  listenButton: `flex items-center gap-[.2rem] text-[#1A8917]`,
  socials: `flex gap-[1rem] text-[#787878] cursor-pointer`,
  space: `w-[.5rem]`,
  articleMainContainer: `flex flex-col gap-[1rem]`,
  bannerContainer: `h-[18rem] w-full grid center overflow-hidden mb-[2rem]`,
  title: `font-bold text-3xl`,
  subtitle: `font-mediumSerifItalic text-[1.4rem] text-[#292929]`,
  articleText: `font-mediumSerif text-[1.4rem] text-[#292929]`,
}

const ArticleMain = () =>{
  return(
    <div className={styles.wrapper} >
     <div className={styles.content} >
      <div className={styles.postHeaderContainer} >
       <div className={styles.authorContainer} >
          <div className={styles.authorProfileImageContainer} >
            <Image
                className={styles.image}
                src={Author}
                width={100}
                height={100}
            />
          </div>
          <div className={styles.column} >
            <div>sharad sharma</div>
            <div className={styles.postDetails} >
                <span>Nov 22 . 7 min read<span className={styles.listenButton} >
                    <AiFillPlayCircle/> Listen
                </span></span>
            </div>
          </div>
       </div>
      </div>
     </div>
    </div>
  )
}

export default ArticleMain