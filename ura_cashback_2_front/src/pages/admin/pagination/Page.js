import axios from "axios";
import {useEffect, useState} from "react";
import Posts from "./Posts";
import Pagination from "./Pagination";


const Page = () =>{
    const [posts, setPosts] = useState([]);
    const [loading,setLoading] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [postsPerPage, setPostsPerPage] = useState(5);

    useEffect(()=>{
        const fetchPosts = async () =>{
            setLoading(true);
            const res = await axios.get("http://localhost/api/auth");
            setPosts(res.data.object);
            setLoading(false);
        }
        fetchPosts().then(r => {

        });
    },[])
    console.log(posts)

    const indexOfLasPost = currentPage * postsPerPage;
    const indexOfFirstPosts = indexOfLasPost - postsPerPage;
    const currentPosts = posts.slice(indexOfFirstPosts,indexOfLasPost);


    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    return(
        <div className="container mt-5">
            <h1 className="text-primary mb-3">My Blog</h1>
            <Posts posts={currentPosts} loading={loading}/>
            <Pagination postPrePost={postsPerPage} totalPosts={posts.length} paginate={paginate} />
        </div>
    );
};

export default Page;