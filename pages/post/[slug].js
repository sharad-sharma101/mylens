import ArticleMain from "../../components/ArticleMain"
import ReaderNav from "../../components/ReaderNav"
import Recommendation from "../../components/Recommendation"

const Post = () =>{
    return(
        <div className='flex' >
            <ReaderNav/>
            <ArticleMain/>
            <Recommendation/>
        </div>
    )
}
export default Post
