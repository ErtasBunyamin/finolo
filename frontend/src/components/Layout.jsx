import Navbar from "./Navbar";
import {Outlet} from "react-router-dom";
import {useEffect, useState} from "react";
import TutorialOverlay from "./TutorialOverlay";

function Layout() {
    const [showTutorial, setShowTutorial] = useState(false);

    useEffect(() => {
        if (!localStorage.getItem("tutorialShown")) {
            setShowTutorial(true);
        }
    }, []);

    const closeTutorial = () => {
        localStorage.setItem("tutorialShown", "true");
        setShowTutorial(false);
    };

    return (
        <div className="flex flex-col min-h-screen bg-gray-100">
            {showTutorial && <TutorialOverlay onClose={closeTutorial} />}
            <Navbar />
            <main className="flex-1 px-4 py-6 max-w-7xl mx-auto w-full">
                <Outlet />
            </main>
        </div>
    );
}

export default Layout;
