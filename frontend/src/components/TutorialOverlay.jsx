import {useState} from "react";

function TutorialOverlay({ onClose }) {
    const steps = [
        { title: "Hoş Geldiniz", text: "Dashboard'da özet finans verilerini inceleyebilirsiniz." },
        { title: "Müşteriler", text: "Müşteri kayıtlarınızı ve bilgilerini yönetin." },
        { title: "Faturalar", text: "Yeni faturalar oluşturup geçmiş işlemleri takip edin." }
    ];
    const [index, setIndex] = useState(0);

    const next = () => {
        if (index < steps.length - 1) {
            setIndex(index + 1);
        } else {
            onClose();
        }
    };

    return (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
            <div className="bg-white p-6 rounded shadow max-w-md w-full text-center">
                <h2 className="text-xl font-bold mb-2">{steps[index].title}</h2>
                <p className="mb-4">{steps[index].text}</p>
                <button
                    onClick={next}
                    className="bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700"
                >
                    {index < steps.length - 1 ? "Devam" : "Kapat"}
                </button>
            </div>
        </div>
    );
}

export default TutorialOverlay;
