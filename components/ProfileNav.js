import React, { useEffect, useState } from 'react'
const styles = {
    wrapper: `h-max-[10rem] flex items-center justify-center border-y p-5 border-black bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 ... `,
    content: `max-w-8xl flex-1 flex items-center justify-between`,
    accentedButton: `bg-black text-white py-2 px-4 rounded-full`,
  }

const ProfileNav = (user) => {
  
  const [name, setname] = useState( 'Loading')
  const [email, setemail] = useState('Loading')
 const [image, setimage] = useState('Loading')
  const [ fans, setfans] = useState('Loading')
  
useEffect(() => {
  if(user){
  setname(user.user?.displayName )
  setemail(user.user.email)
  setfans(user.user.followerCount)
  setimage(user.user.photoURL)
}
}, [user])

  return (
    <div className={styles.wrapper}>
      <div className={styles.content} >
             <div>
                <img
                    className='hidden h-52 md:inline-flex object-contain flex-1'
                    src={`https://res.cloudinary.com/demo/image/fetch/${image}`}
                    height={300}
                    width={400}
                    alt='logo'
                />
             </div>
             <div className='text-xl'>
                <h1>{name}</h1>
                <h3>Follower: {fans}</h3>
                <h3>{email}</h3>
             </div>
             <div>
             <h1 >ADD NEW BLOG</h1>
             <img
                    className='hidden h-52 md:inline-flex object-contain flex-1'
                    src="https://www.freepnglogos.com/uploads/plus-icon/add-big-new-plus-icon-3.png"
                    height={300}
                    width={300}
                    alt='logo'
                />
             </div>
      </div> 
    </div>
  )
}

export default ProfileNav
