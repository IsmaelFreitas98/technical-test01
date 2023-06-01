import "./Header.css"

function Header(props) {
    return(
        <header className="header">
            <h1 className="concealed-title">CONCEALED <span className="red">FILMS</span></h1>

            <nav>
                <h3>Vai ter cenas</h3>
            </nav>
        </header>
    )
}

export default Header;