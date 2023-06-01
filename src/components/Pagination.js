import "./Pagination.css";

function Pagination(props) {

    const {page, totalPages, setPage} = props;

    const renderPageOptions = () => {
        let min;
        let max;

        if(page - 2 < 1) {
            min = 1;
            max = 5;
        } else if(page + 2 > totalPages){
            min = totalPages - 4;
            max = totalPages;
        } else {
            min = page - 2;
            max = page + 2;
        }

        const pagesArr = [];

        for(let i = min; i <= max; i++) {
            pagesArr.push(i);
        }

        return pagesArr.map(num => {
            return <span key={num} className={num === page ? "active-page page-selector" : "page-selector"} onClick={() => {setPage(num)}}>{num}</span>
        })
    }

    return (
        <nav className="pagination-nav">
            <span className="page-selector" onClick={() => {page - 1 > 0 && setPage(page - 1)}}>«</span> {renderPageOptions()} <span className="page-selector" onClick={() => {page + 1 <= totalPages && setPage(page + 1)}}>»</span>
        </nav>
    );
}

export default Pagination;