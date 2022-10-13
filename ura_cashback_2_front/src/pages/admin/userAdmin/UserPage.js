

const UserPage = ({postPrePost, totalPosts, paginate}) =>{
    console.log(postPrePost)
    const pageNumbers = [];
            pageNumbers.push(postPrePost)
    return(
        <nav>
            <ul className="pagination">
                {pageNumbers.map((number,i)=>
                    <li key={i} className="page-item">
                        <a className="page-link">{number}</a>
                    </li>
                )}
            </ul>
        </nav>
    );
};
export default UserPage;