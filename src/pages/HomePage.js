import { useState } from "react";
import Header from "../components/Header";
import SearchMovie from "../components/SearchMovie";

function HomePage() {


    return(
        <>
            <Header isHomePage/>

            <SearchMovie/>
        </>
    )

}

export default HomePage;