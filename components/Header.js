import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useContext, useState } from 'react'
import { MediumContext } from '../context/MediumContext'
import UploadModal from './UploadModal'
import Logo from '../static/logo.png'
import Modal from 'react-modal'
import Member from './Member'

Modal.setAppElement('#__next')

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
  wrapper: `flex justify-center gap-10 p-5 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 ... `,
  content: `w-full flex justify-between gap-3`,
  logoContainer: `flex items-center flex-start`,
  logo: `cursor-pointer object-contain`,
  bannerNav: `flex cursor-pointer items-center space-x-5`,
  accentedButton: `bg-black text-white py-2 px-4 rounded-full`,
  profileImageContainer: `w-[2.4rem] h-[2.4rem] rounded-full overflow-hidden grid place-items-center `,
  image: `object-cover`,
  searchContainer: `mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white`,
  serachButton: "text-white absolute right-2.5 bottom-2.5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800",
  serachinput: "flex w-[30rem] p-4 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500",
}

const Header = (props) => {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const router = useRouter()
  const { user, handleUserAuth } = useContext(MediumContext)

  return (
    <div className={styles.wrapper} >
      <div className={styles.content}>
        <Link href={'/'} >
          <div className={styles.logoContainer}>
            <Image
              className={styles.logo}
              src={Logo}
              alt='logo'
              height={40}
              width={200}
            />
          </div>
        </Link>
        <div className="flex justify-center ">
           <div className="xl:w-96">
           <div className="input-group relative flex grow items-stretch w-full mb-4">
              <input type="search" onChange={(e)=>{props.setSearchText(e.target.value)}} value={props.SearchText} className="form-control relative flex-auto min-w-0 block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none " placeholder="Search" aria-label="Search" aria-describedby="button-addon2"/>     
              <button onClick={props.SearchFunction} className="btn inline-block px-6 py-2.5 text-white font-medium text-xs leading-tight uppercase rounded shadow-md  ease-in-out flex items-center group-hover:from-purple-500 group-hover:to-pink-500 hover:text-white dark:text-white focus:outline-none " type="button" id="button-addon2">
                <svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="search" className="w-4" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                  <path fill="currentColor" d="M505 442.7L405.3 343c-4.5-4.5-10.6-7-17-7H372c27.6-35.3 44-79.7 44-128C416 93.1 322.9 0 208 0S0 93.1 0 208s93.1 208 208 208c48.3 0 92.7-16.4 128-44v16.3c0 6.4 2.5 12.5 7 17l99.7 99.7c9.4 9.4 24.6 9.4 33.9 0l28.3-28.3c9.4-9.4 9.4-24.6.1-34zM208 336c-70.7 0-128-57.2-128-128 0-70.7 57.2-128 128-128 70.7 0 128 57.2 128 128 0 70.7-57.2 128-128 128z"></path>
                </svg>
              </button>
           </div>
           </div>
        </div>

        <div className={styles.bannerNav}>
          
          {/* USER */}
          {user ? (
            <>
              <div className={styles.profileImageContainer} >
                 <img src={user.photoURL} alt="image" className={styles.image}  />
              </div>
              <Link href={'/?member=1'} >
              <div>Membership</div></Link>
              <Link href={'/?addNew=1'}>
                <div className={styles.accentedButton}>Write</div>
              </Link>
              <div className={styles.accentedButton}>
               <Link href={`/profile/${user.email}`} > <div>My Profile</div> </Link>
              </div>
            </>
          ) : (
            <>
              <div onClick={handleUserAuth} >Our Story</div>
              <div onClick={handleUserAuth} >Membership</div>
              <div onClick={handleUserAuth}>Sign In</div>
              <div onClick={handleUserAuth} className={styles.accentedButton}>
                <div>Get Started</div>
              </div>
            </>
          )}
        </div>
      </div>{
       <Modal 
        isOpen={!!router.query.member}
        onRequestClose={() => router.push('/')}
        style={customStyles} >
        <Member/>
      </Modal>}
      <Modal
        isOpen={!!router.query.addNew}
        onRequestClose={() => router.push('/')}
        style={customStyles}
      >
        <UploadModal />
      </Modal>
    </div>
  )
}

export default Header