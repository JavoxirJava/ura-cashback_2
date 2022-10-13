

const Pagination = ({postPrePost, totalPosts, paginate}) =>{
    console.log("postPrePost",postPrePost, " totalPost",totalPosts, " paginate", paginate)
    const pageNumbers = [];
    for (let i = 1; i <= Math.ceil(totalPosts / postPrePost); i++) {
        pageNumbers.push(i);
    }
    return(
        <nav>
            <ul className="pagination">
                {pageNumbers.map((number,i)=>
                    <li key={i} className="page-item">
                       <a onClick={()=> paginate(number)} className="page-link">{number}</a>
                    </li>
                )}
            </ul>
        </nav>
    );
};
export default Pagination;