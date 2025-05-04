import {Outlet} from "react-router-dom";
import Navbar from "../components/Navbar";

function Layout() {
    return (
        <>
            <Navbar />
            <main className="p-4">
                <Outlet />
            </main>
        </>
    );
}

export default Layout;
