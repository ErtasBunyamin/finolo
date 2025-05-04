import React from "react";

function PopupModal({ isOpen, title, message, onConfirm, onCancel }) {

    if (!isOpen) return null; // 👈 bu satır sayesinde DOM'a bile girmez

    return (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50">
            <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-md">
                <h3 className="text-lg font-semibold mb-2">{title}</h3>
                <p className="text-gray-700 mb-4">{message}</p>
                <div className="flex justify-end gap-4">
                    <button
                        onClick={onCancel}
                        className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300"
                    >
                        Hayır
                    </button>
                    <button
                        onClick={onConfirm}
                        className="px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700"
                    >
                        Evet
                    </button>
                </div>
            </div>
        </div>
    );
}

export default PopupModal;
