

const Posts = ({posts, loading}) =>{

    if(loading){
        return <h2>Loading...</h2>;
    }

    return ( <ul className="list-group-item">
            {posts.map((post,i)=>
                <li key={i} className="list-group-item">{post.firstName}</li>
            )}
    </ul>
    );
};
export default Posts;