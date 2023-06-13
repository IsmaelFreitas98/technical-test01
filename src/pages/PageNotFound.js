import { Link } from "react-router-dom";
import Header from "../components/Header";

function PageNotFound() {
    return (
        <>
            <Header />

            <div style={{margin: "150px auto 0 auto"}}>
                <h1>Page Not Found</h1>
                <Link to={"/"}><h2>Return To Homepage</h2></Link>
            </div>
        </>
    );
}

export default PageNotFound;