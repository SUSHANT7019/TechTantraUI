import React, { useState } from 'react';
import { api } from '../api';

const ApiExample = () => {
    const [loading, setLoading] = useState(false);
    const [result, setResult] = useState(null);

    // 1. Handing a Simple GET
    const fetchParticipants = async () => {
        setLoading(true);
        try {
            const data = await api.get('/participants/');
            setResult(data);
        } catch (err) {
            alert(err.message);
        } finally {
            setLoading(false);
        }
    };

    // 2. Handling a POST with JSON body
    const createRegistration = async () => {
        try {
            const body = { leader_name: 'John Doe', email: 'john@example.com' };
            const data = await api.post('/participants/', body);
            alert('Created!');
        } catch (err) {
            console.error(err.data); // Accessing Django validation errors
        }
    };

    // 3. Handling File Upload (FormData)
    const handleFileUpload = async (e) => {
        const file = e.target.files[0];
        if (!file) return;

        const formData = new FormData();
        formData.append('proof_screenshot', file);
        formData.append('transaction_id', 'TXN12345');

        try {
            setLoading(true);
            await api.upload('/payments/', formData);
            alert('File Uploaded!');
        } catch (err) {
            alert('Upload failed: ' + err.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="p-10 bg-slate-900 border border-white/10 rounded-xl">
            <h2 className="text-xl font-bold mb-4">API Integration Demo</h2>

            <div className="flex gap-4 mb-6">
                <button
                    onClick={fetchParticipants}
                    disabled={loading}
                    className="px-4 py-2 bg-blue-600 rounded hover:bg-blue-700 disabled:opacity-50"
                >
                    {loading ? 'Fetching...' : 'Get Data'}
                </button>

                <button
                    onClick={createRegistration}
                    className="px-4 py-2 bg-green-600 rounded hover:bg-green-700"
                >
                    Post JSON
                </button>
            </div>

            <div className="mb-6">
                <label className="block text-sm mb-2">Upload File Example:</label>
                <input
                    type="file"
                    onChange={handleFileUpload}
                    className="block w-full text-sm text-slate-500 file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                />
            </div>

            {result && (
                <pre className="bg-black p-4 rounded text-xs overflow-auto max-h-40">
                    {JSON.stringify(result, null, 2)}
                </pre>
            )}
        </div>
    );
};

export default ApiExample;
