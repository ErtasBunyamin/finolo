import Navbar from "./Navbar";
import {Outlet} from "react-router-dom";

function Layout() {
    return (
        <div className="flex flex-col min-h-screen bg-gray-100">
            <Navbar />
            <main className="flex-1 px-4 py-6 max-w-7xl mx-auto w-full">
                <Outlet />
            </main>
        </div>
    );
}

export default Layout;
