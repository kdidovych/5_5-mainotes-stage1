import Header from "../components/Header";
import Footer from "../components/Footer.jsx";
import {Outlet} from "react-router";
import "./layout.css";

function RootLayout() {
    return (
        <>
            <Header/>
            <main>
                <Outlet/>
            </main>
            <Footer/>
        </>
    )
}

export default RootLayout;