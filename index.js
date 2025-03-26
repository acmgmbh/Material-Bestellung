
import { useState } from "react";
import ReactDOM from "react-dom";

function BestellungApp() {
    const [bestellungen, setBestellungen] = useState([]);
    const [form, setForm] = useState({ material: "", menge: "", baustelle: "", notizen: "" });

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = () => {
        if (!form.material || !form.menge || !form.baustelle) return;
        setBestellungen([...bestellungen, { ...form, status: "offen" }]);
        setForm({ material: "", menge: "", baustelle: "", notizen: "" });
    };

    const updateStatus = (index, status) => {
        const updated = [...bestellungen];
        updated[index].status = status;
        setBestellungen(updated);
    };

    return (
        <div className="p-4 max-w-lg mx-auto">
            <h1 className="text-xl font-bold mb-4">Materialbestellung</h1>
            <div className="card p-4 mb-4">
                <input name="material" placeholder="Material" value={form.material} onChange={handleChange} className="mb-2" />
                <input name="menge" placeholder="Menge" value={form.menge} onChange={handleChange} className="mb-2" />
                <input name="baustelle" placeholder="Baustelle" value={form.baustelle} onChange={handleChange} className="mb-2" />
                <textarea name="notizen" placeholder="Notizen (optional)" value={form.notizen} onChange={handleChange} className="mb-2"></textarea>
                <button onClick={handleSubmit} className="w-full">Bestellen</button>
            </div>
            <h2 className="text-lg font-semibold mb-2">Bestellungen</h2>
            {bestellungen.map((bestellung, index) => (
                <div key={index} className="card mb-2 p-4">
                    <p><strong>Material:</strong> {bestellung.material}</p>
                    <p><strong>Menge:</strong> {bestellung.menge}</p>
                    <p><strong>Baustelle:</strong> {bestellung.baustelle}</p>
                    <p><strong>Status:</strong> {bestellung.status}</p>
                    <div className="mt-2">
                        <button onClick={() => updateStatus(index, "in Bearbeitung")} className="mr-2">In Bearbeitung</button>
                        <button onClick={() => updateStatus(index, "abgeschlossen")} className="destructive">Abschließen</button>
                    </div>
                </div>
            ))}
        </div>
    );
}

ReactDOM.render(<BestellungApp />, document.getElementById('root'));
