import React from "react";

function DashboardCard({ icon: Icon, label, value }) {
    return (
        <div className="bg-white p-4 rounded-lg shadow-sm hover:shadow-md transition flex items-center gap-3">
            {Icon && <Icon className="text-indigo-500 text-xl" />}
            <div>
                <p className="text-xs text-gray-500">{label}</p>
                <p className="text-lg font-bold text-gray-800">{value}</p>
            </div>
        </div>
    );
}

export default DashboardCard;
