import React from "react";

function AdminPanel() {
    return (
        <div className="p-4">
            <h2 className="text-2xl font-bold text-indigo-600">Admin Panel</h2>
            <p>Yalnızca yöneticiler için erişilebilir.</p>
        </div>
    );
}

export default AdminPanel;
