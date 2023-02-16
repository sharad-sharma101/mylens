import Head from "next/head";
import { useContext, useEffect, useState } from "react";
import { MediumContext } from "../context/MediumContext";
import Header from "../components/Header";
import Banner from "../components/Banner";
import PostCard from "../components/PostCard";

const styles = {
  wrapper: `mx-auto bg-[#faccea] `,
  main: `flex justify-center`,
  container: `max-w-7xl flex-1 sm:{w-[30rem]}`,
  postsList: `flex flex-col gap-3 p-2 sm:grid-cols-2 md:gap-6 md:p-6 lg:grid-cols-3 sm:{w-[30rem]}  `,
};

export default function Home() {
  const { allPosts } = useContext(MediumContext);
  const [SearchText, setSearchText] = useState("");
  const [filterPosts, setfilterPosts] = useState(allPosts);

  const hundleSearchFilter = () => {
    console.log(SearchText);
    if (SearchText.replace(" ", "").length > 1) {
      let arr = [];
      allPosts.forEach((ele) => {
        if (ele.data.title.toLowerCase().includes(SearchText.toLowerCase())) {
          arr.push(ele);
        }
      });
      setfilterPosts(arr);
    } else {
      setfilterPosts(allPosts);
    }
    setSearchText("");
  };
  
  return (
    <div className={styles.wrapper}>
      <Head>
        <title>My Lens</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header
        id="navbar"
        setSearchText={setSearchText}
        SearchText={SearchText}
        SearchFunction={hundleSearchFilter}
      />
      <main>
        <Banner />
        <div className={styles.main}>
          <div className={styles.container}>
            <div className={styles.postsList}>
              { filterPosts.length > 0 ?
                filterPosts.map((post) => (
                <PostCard post={post} key={post.id} />
              )) :
              allPosts.map((post) => (
                <PostCard post={post} key={post.id} />
              ))}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
