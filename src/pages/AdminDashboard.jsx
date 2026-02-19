import React, { useEffect, useState } from 'react';
import api from '../api';
import { LogOut, Check, Mail, Award, Trash2, RefreshCw, Search, Filter, Download, Pencil, AlertCircle } from 'lucide-react';

import { useNavigate } from 'react-router-dom';

// ── Module-level constants (shared by TeamForm + AdminDashboard) ──
const tracks = [
    "FinTech", "AgriTech", "AI & ML", "IOT and Robotics", "Open Innovation"
];

const problemStatements = {
    "FinTech": [
        "FT01 - Financial Exclusion of Gig Economy Workers",
        "FT02 - Subscription and Recurring Payment Fatigue",
        "FT03 - SME Invoice Processing Bottlenecks"
    ],
    "AgriTech": [
        "AT01 - Market Price Volatility for Perishable Goods",
        "AT02 - Misdiagnosis of Crop Diseases",
        "AT03 - Supply Chain Opacity for Consumers"
    ],
    "AI & ML": [
        "AM01 - Complexity of Legal and Medical Documents",
        "AM02 - Bias in Resume Screening",
        "AM03 - Inefficient Customer Support Retrieval"
    ],
    "IOT and Robotics": [
        "IR01 - Unmonitored Cold Chain Spoilage",
        "IR02 - Safety Hazards in Industrial Zones",
        "IR03 - Energy Waste in Commercial Buildings"
    ],
    "Open Innovation": []
};


const educationOptions = [
    "Diploma / Polytechnic / ITI", "B.Tech / B.E / BCA / BSC", "M.Tech / M.E / MCA / MSC", "Other"
];

// ── Reusable form fields component (MUST be outside AdminDashboard to avoid focus loss) ──
const TeamForm = ({ data, setData, onSubmit, submitLabel, isSubmitting, onCancel }) => (
    <form onSubmit={onSubmit} className="space-y-6">
        {/* Team Details */}
        <div className="space-y-4">
            <h3 className="text-lg font-bold text-blue-600 border-b pb-2">Team Details</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Team Name *</label>
                    <input
                        required
                        className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none text-gray-900 bg-white"
                        value={data.team_name}
                        onChange={(e) => setData(prev => ({ ...prev, team_name: e.target.value }))}
                        placeholder="e.g. Binary Bandits"
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Leader Name *</label>
                    <input
                        required
                        className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none text-gray-900 bg-white"
                        value={data.leader_name}
                        onChange={(e) => setData(prev => ({ ...prev, leader_name: e.target.value }))}
                        placeholder="Full Name"
                    />
                </div>
            </div>
        </div>

        {/* Contact */}
        <div className="space-y-4">
            <h3 className="text-lg font-bold text-blue-600 border-b pb-2">Contact</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Email *</label>
                    <input
                        type="email" required
                        className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none text-gray-900 bg-white"
                        value={data.email}
                        onChange={(e) => setData(prev => ({ ...prev, email: e.target.value }))}
                        placeholder="leader@example.com"
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Mobile *</label>
                    <input
                        type="tel" required
                        pattern="[0-9]{10}"
                        minLength={10}
                        maxLength={10}
                        title="Please enter exactly 10 digits"
                        className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none text-gray-900 bg-white"
                        value={data.phone}
                        onChange={(e) => {
                            const val = e.target.value.replace(/\D/g, '').slice(0, 10);
                            setData(prev => ({ ...prev, phone: val }));
                        }}
                        placeholder="10-digit number"
                    />
                </div>
            </div>
        </div>

        {/* Institute */}
        <div className="space-y-4">
            <h3 className="text-lg font-bold text-blue-600 border-b pb-2">Institute & City</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Institute Name *</label>
                    <input
                        required
                        className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none text-gray-900 bg-white"
                        value={data.college}
                        onChange={(e) => setData(prev => ({ ...prev, college: e.target.value }))}
                        placeholder="Institute Name"
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">City *</label>
                    <input
                        required
                        className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none text-gray-900 bg-white"
                        value={data.city}
                        onChange={(e) => setData(prev => ({ ...prev, city: e.target.value }))}
                        placeholder="City"
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Education Year *</label>
                    <select
                        required
                        className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none text-gray-900 bg-white"
                        value={data.education_year}
                        onChange={(e) => setData(prev => ({ ...prev, education_year: e.target.value }))}
                    >
                        <option value="" disabled>Select Year...</option>
                        {educationOptions.map(year => (
                            <option key={year} value={year}>{year}</option>
                        ))}
                    </select>
                </div>
            </div>
        </div>

        {/* Event & Track */}
        <div className="space-y-4">
            <h3 className="text-lg font-bold text-blue-600 border-b pb-2">Event Selection</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Track *</label>
                    <select
                        required
                        className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none text-gray-900 bg-white"
                        value={data.track_selection}
                        onChange={(e) => setData(prev => ({ ...prev, track_selection: e.target.value, problem_statement: '' }))}
                    >
                        <option value="" disabled>Select Track...</option>
                        {tracks.map(track => (
                            <option key={track} value={track}>{track}</option>
                        ))}
                    </select>
                </div>

                {data.track_selection && (
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Problem Statement *</label>
                        {data.track_selection === "Open Innovation" ? (
                            <input
                                required
                                className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none text-gray-900 bg-white"
                                value={data.problem_statement}
                                onChange={(e) => setData(prev => ({ ...prev, problem_statement: e.target.value }))}
                                placeholder="Describe problem..."
                            />
                        ) : (
                            <select
                                required
                                className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none text-gray-900 bg-white"
                                value={data.problem_statement}
                                onChange={(e) => setData(prev => ({ ...prev, problem_statement: e.target.value }))}
                            >
                                <option value="" disabled>Select Problem...</option>
                                {problemStatements[data.track_selection]?.map(ps => (
                                    <option key={ps} value={ps}>{ps}</option>
                                ))}
                            </select>
                        )}
                    </div>
                )}
            </div>
        </div>

        {/* Team Members */}
        <div className="space-y-4">
            <div className="flex justify-between items-center border-b pb-2">
                <h3 className="text-lg font-bold text-blue-600">Team Members</h3>
                {data.team_members.length < 3 && (
                    <button
                        type="button"
                        onClick={() => setData(prev => ({ ...prev, team_members: [...prev.team_members, ""] }))}
                        className="text-sm text-blue-600 hover:underline font-medium"
                    >
                        + Add Member
                    </button>
                )}
            </div>

            {data.team_members.map((member, index) => (
                <div key={index} className="flex gap-2">
                    <input
                        required
                        className="flex-1 p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none text-gray-900 bg-white"
                        value={member}
                        onChange={(e) => {
                            const newMembers = [...data.team_members];
                            newMembers[index] = e.target.value;
                            setData(prev => ({ ...prev, team_members: newMembers }));
                        }}
                        placeholder={`Member ${index + 2} Name`}
                    />
                    <button
                        type="button"
                        onClick={() => {
                            const newMembers = data.team_members.filter((_, i) => i !== index);
                            setData(prev => ({ ...prev, team_members: newMembers }));
                        }}
                        className="p-2 text-red-500 hover:bg-red-50 rounded"
                    >
                        <Trash2 size={16} />
                    </button>
                </div>
            ))}
            {data.team_members.length === 0 && <p className="text-sm text-gray-500 italic">No additional members.</p>}
        </div>

        <div className="flex justify-end gap-3 mt-6 pt-4 border-t">
            <button
                type="button"
                onClick={onCancel}
                className="px-4 py-2 text-gray-600 hover:text-gray-800"
                disabled={isSubmitting}
            >
                Cancel
            </button>
            <button
                type="submit"
                disabled={isSubmitting}
                className="px-6 py-2 bg-blue-600 text-white rounded-lg font-medium shadow hover:bg-blue-700 transition-all flex items-center gap-2"
            >
                {isSubmitting ? 'Saving...' : submitLabel}
            </button>
        </div>
    </form>
);


export default function AdminDashboard() {
    const [participants, setParticipants] = useState([]);
    const [loading, setLoading] = useState(true);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [newParticipant, setNewParticipant] = useState({
        team_name: '', leader_name: '', email: '', phone: '', college: '', city: '',
        education_year: '', event_selection: 'TechTantra Hackthon 2K26',
        track_selection: '', problem_statement: '', team_members: []
    });

    const [selectedParticipant, setSelectedParticipant] = useState(null);
    const [searchQuery, setSearchQuery] = useState('');
    const [filters, setFilters] = useState({
        status: 'all',
        attendance: 'all',
        event: 'all'
    });
    const [processingAction, setProcessingAction] = useState(null);
    const [fetchError, setFetchError] = useState(null);
    const navigate = useNavigate();


    // ── Edit state ──
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [editParticipant, setEditParticipant] = useState(null); // holds the form data while editing
    const [isSavingEdit, setIsSavingEdit] = useState(false);

    // Calculate filtered participants
    const filteredParticipants = participants.filter(p => {
        const matchesSearch =
            (p.leader_name || '').toLowerCase().includes(searchQuery.toLowerCase()) ||
            (p.team_name || '').toLowerCase().includes(searchQuery.toLowerCase()) ||
            (p.email || '').toLowerCase().includes(searchQuery.toLowerCase()) ||
            (p.phone || '').includes(searchQuery) ||
            (p.college || '').toLowerCase().includes(searchQuery.toLowerCase()) ||
            (p.payment_id || '').toLowerCase().includes(searchQuery.toLowerCase()) ||
            (p.ticket_number && p.ticket_number.toLowerCase().includes(searchQuery.toLowerCase()));

        const matchesStatus = filters.status === 'all'
            ? true
            : filters.status === 'approved' ? p.is_approved : !p.is_approved;

        const matchesAttendance = filters.attendance === 'all'
            ? true
            : filters.attendance === 'present' ? p.is_attended : !p.is_attended;

        const matchesEvent = filters.event === 'all'
            ? true
            : p.event_selection === filters.event;

        return matchesSearch && matchesStatus && matchesAttendance && matchesEvent;
    });


    const fetchParticipants = async () => {
        setLoading(true);
        setFetchError(null);
        try {
            console.log("Fetching participants...");
            const data = await api.get('participants/');
            console.log("Raw API Response:", data);
            if (Array.isArray(data)) {
                setParticipants(data);
            } else {
                console.error("API Error: Expected array, got", data);
                setFetchError("Server returned unexpected format.");
                setParticipants([]);
            }
        } catch (err) {
            console.error("Fetch Error:", err);
            if (err.status === 401) {
                handleLogout();
            } else {
                setFetchError(err.message || "Failed to load participants.");
            }
        } finally {
            setLoading(false);
        }
    };


    useEffect(() => {
        console.log("AdminDashboard: Component Mounted");
        fetchParticipants();
    }, []);

    const handleLogout = () => {
        localStorage.removeItem('token');
        navigate('/admin/login');
    };

    const handleAction = async (id, action, data = {}) => {
        if (processingAction) return;
        const actionType = action === 'generate_award' ? data.type : action;
        setProcessingAction({ id, type: actionType });

        try {
            const result = await api.post(`participants/${id}/${action}/`, data);
            if (result.warning) {
                alert(`Success with warning: ${result.status}\n\nWarning: ${result.warning}`);
            }
            await fetchParticipants();
        } catch (err) {
            alert('Action failed: ' + (err.data?.error || err.message));
        } finally {
            setProcessingAction(null);
        }
    };

    const handleDelete = async (id) => {
        if (!window.confirm("Are you sure you want to delete this participant?")) return;
        try {
            await api.delete(`participants/${id}/`);
            setParticipants(participants.filter(p => p.id !== id));
        } catch (err) {
            alert('Delete failed');
        }
    };

    const [isRegistering, setIsRegistering] = useState(false);

    const handleRegister = async (e) => {
        e.preventDefault();
        setIsRegistering(true);
        try {
            await api.post('participants/', {
                ...newParticipant,
                team_members: newParticipant.team_members.filter(m => m.trim() !== ''),
                registration_source: 'admin',
            });

            setIsModalOpen(false);
            setNewParticipant({
                team_name: '', leader_name: '', email: '', phone: '', college: '', city: '',
                education_year: '', event_selection: 'TechTantra Hackthon 2K26',
                track_selection: '', problem_statement: '', team_members: []
            });
            fetchParticipants();
            alert('Team Registered Successfully');
        } catch (err) {
            console.error(err);
            let errorMessage = 'Registration Failed';
            if (err.data) {
                if (typeof err.data === 'object' && !Array.isArray(err.data)) {
                    errorMessage += ':\n' + Object.entries(err.data)
                        .map(([key, val]) => {
                            const errorText = Array.isArray(val) ? val.join(', ') : val;
                            return `${key}: ${errorText}`;
                        })
                        .join('\n');
                } else {
                    errorMessage += ': ' + (err.data.detail || JSON.stringify(err.data));
                }
            } else {
                errorMessage += ': ' + err.message;
            }
            alert(errorMessage);
        } finally {
            setIsRegistering(false);
        }
    };

    const handleExport = async () => {
        try {
            const blob = await api.get('participants/export_excel/', {
                responseType: 'blob',
            });

            const url = window.URL.createObjectURL(blob);
            const link = document.createElement('a');
            link.href = url;
            link.setAttribute('download', 'participants_export.xlsx');
            document.body.appendChild(link);
            link.click();
            link.parentNode.removeChild(link);
        } catch (err) {
            console.error("Export failed:", err);
            alert('Failed to download Excel file.');
        }
    };

    // ── Edit handlers ──
    const openEditModal = (participant) => {
        setEditParticipant({
            id: participant.id,
            team_name: participant.team_name || '',
            leader_name: participant.leader_name || '',
            email: participant.email || '',
            phone: participant.phone || '',
            college: participant.college || '',
            city: participant.city || '',
            education_year: participant.education_year || '',
            event_selection: participant.event_selection || 'TechTantra Hackthon 2K26',
            track_selection: participant.track_selection || '',
            problem_statement: participant.problem_statement || '',
            team_members: participant.team_members ? [...participant.team_members] : [],
        });
        setSelectedParticipant(null); // close details modal if open
        setIsEditModalOpen(true);
    };

    const handleUpdate = async (e) => {
        e.preventDefault();
        setIsSavingEdit(true);
        try {
            const { id, ...payload } = editParticipant;
            payload.team_members = payload.team_members.filter(m => m.trim() !== '');

            await api.patch(`participants/${id}/`, payload);

            setIsEditModalOpen(false);
            setEditParticipant(null);
            fetchParticipants();
            alert('Team Updated Successfully');
        } catch (err) {
            console.error(err);
            let errorMessage = 'Update Failed';
            if (err.data) {
                if (typeof err.data === 'object' && !Array.isArray(err.data)) {
                    errorMessage += ':\n' + Object.entries(err.data)
                        .map(([key, val]) => {
                            const errorText = Array.isArray(val) ? val.join(', ') : val;
                            return `${key}: ${errorText}`;
                        })
                        .join('\n');
                } else {
                    errorMessage += ': ' + (err.data.detail || JSON.stringify(err.data));
                }
            } else {
                errorMessage += ': ' + err.message;
            }
            alert(errorMessage);
        } finally {
            setIsSavingEdit(false);
        }
    };

    return (
        <div className="min-h-screen bg-gray-100 p-6">
            <div className="max-w-7xl mx-auto">
                <div className="flex justify-between items-center mb-8">
                    <h1 className="text-3xl font-bold text-gray-800">Admin Dashboard</h1>
                    <div className="flex gap-4">
                        {loading && <span className="text-blue-600 font-medium animate-pulse my-auto">Loading Data...</span>}
                        {fetchError && <span className="text-red-600 font-medium my-auto">Error: {fetchError}</span>}

                        <button
                            onClick={handleExport}
                            className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg shadow hover:bg-green-700 transition-colors font-medium"
                        >
                            <Download size={18} /> Export Excel
                        </button>

                        <button
                            onClick={() => setIsModalOpen(true)}
                            className="px-4 py-2 bg-blue-600 text-white rounded-lg shadow hover:bg-blue-700 transition-colors font-medium"
                        >
                            + Register Team
                        </button>
                        <button onClick={handleLogout} className="flex items-center gap-2 px-4 py-2 bg-white text-red-600 rounded-lg shadow hover:bg-red-50 transition-colors">
                            <LogOut size={18} /> Logout
                        </button>
                    </div>
                </div>

                {/* ── Register Modal ── */}
                {isModalOpen && (
                    <div className="fixed inset-0 bg-black/50 z-50 backdrop-blur-sm overflow-y-auto flex justify-center py-10">
                        <div className="bg-white rounded-2xl p-8 max-w-2xl w-full shadow-2xl animate-fade-in-up h-fit relative">
                            <h2 className="text-2xl font-bold mb-6 text-gray-800">Manual Team Registration</h2>
                            <TeamForm
                                data={newParticipant}
                                setData={setNewParticipant}
                                onSubmit={handleRegister}
                                submitLabel="Register Team"
                                isSubmitting={isRegistering}
                                onCancel={() => setIsModalOpen(false)}
                            />
                        </div>
                    </div>
                )}

                {/* ── Edit Modal ── */}
                {isEditModalOpen && editParticipant && (
                    <div className="fixed inset-0 bg-black/50 z-50 backdrop-blur-sm overflow-y-auto flex justify-center py-10">
                        <div className="bg-white rounded-2xl p-8 max-w-2xl w-full shadow-2xl animate-fade-in-up h-fit relative">
                            <div className="flex items-center gap-3 mb-6">
                                <div className="w-10 h-10 rounded-full bg-amber-100 flex items-center justify-center">
                                    <Pencil size={20} className="text-amber-600" />
                                </div>
                                <div>
                                    <h2 className="text-2xl font-bold text-gray-800">Edit Team Details</h2>
                                    <p className="text-sm text-gray-400">Editing participant #{editParticipant.id?.toString().slice(0, 8)}</p>
                                </div>
                            </div>
                            <TeamForm
                                data={editParticipant}
                                setData={setEditParticipant}
                                onSubmit={handleUpdate}
                                submitLabel="Save Changes"
                                isSubmitting={isSavingEdit}
                                onCancel={() => { setIsEditModalOpen(false); setEditParticipant(null); }}
                            />
                        </div>
                    </div>
                )}

                {/* ── Details View Modal ── */}
                {selectedParticipant && (
                    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 backdrop-blur-sm">
                        <div className="bg-white rounded-2xl p-8 max-w-2xl w-full shadow-2xl animate-fade-in-up overflow-y-auto max-h-[90vh]">
                            <div className="flex justify-between items-start mb-6">
                                <div>
                                    <h2 className="text-2xl font-bold text-gray-800">{selectedParticipant.team_name}</h2>
                                    <p className="text-gray-500 font-medium">{selectedParticipant.leader_name} (Leader)</p>
                                    <p className="text-gray-400 text-sm font-mono mt-1">Ticket: {selectedParticipant.ticket_number}</p>
                                </div>
                                <button onClick={() => setSelectedParticipant(null)} className="text-gray-400 hover:text-gray-600">
                                    <LogOut className="w-6 h-6 rotate-180" />
                                </button>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="space-y-4">
                                    <h3 className="font-semibold text-gray-900 border-b pb-2">Team & Academic</h3>
                                    <div className="grid grid-cols-2 gap-y-3 text-sm">
                                        <div className="text-gray-500">Email:</div>
                                        <div className="text-gray-800 font-medium break-all">{selectedParticipant.email}</div>

                                        <div className="text-gray-500">Mobile:</div>
                                        <div className="text-gray-800 font-medium">{selectedParticipant.phone}</div>

                                        <div className="text-gray-500">Institute:</div>
                                        <div className="text-gray-800 font-medium">{selectedParticipant.college || '-'}</div>

                                        <div className="text-gray-500">City:</div>
                                        <div className="text-gray-800 font-medium">{selectedParticipant.city || '-'}</div>

                                        <div className="text-gray-500">Year:</div>
                                        <div className="text-gray-800 font-medium">{selectedParticipant.education_year || '-'}</div>
                                    </div>

                                    <h3 className="font-semibold text-gray-900 border-b pb-2 mt-4">Team Members</h3>
                                    <ul className="list-disc ml-5 text-sm text-gray-800">
                                        {selectedParticipant.team_members && selectedParticipant.team_members.map((m, i) => (
                                            <li key={i}>{m}</li>
                                        ))}
                                        {(!selectedParticipant.team_members || selectedParticipant.team_members.length === 0) && (
                                            <li className="text-gray-400 italic">No other members</li>
                                        )}
                                    </ul>
                                </div>

                                <div className="space-y-4">
                                    <h3 className="font-semibold text-gray-900 border-b pb-2">Event & Status</h3>
                                    <div className="grid grid-cols-2 gap-y-3 text-sm">
                                        <div className="text-gray-500">Event:</div>
                                        <div className="text-gray-800 font-medium text-blue-600 col-span-2">{selectedParticipant.event_selection}</div>

                                        <div className="text-gray-500">Track:</div>
                                        <div className="text-gray-800 font-medium col-span-2">{selectedParticipant.track_selection || '-'}</div>

                                        <div className="text-gray-500">Problem:</div>
                                        <div className="text-gray-800 font-medium text-xs col-span-2">{selectedParticipant.problem_statement || '-'}</div>

                                        <div className="text-gray-500">Status:</div>
                                        <div>
                                            {selectedParticipant.is_approved ? (
                                                <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">Approved</span>
                                            ) : (
                                                <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">Pending</span>
                                            )}
                                        </div>

                                        <div className="text-gray-500">Payment ID:</div>
                                        <div className="text-gray-800 font-medium font-mono">{selectedParticipant.payment_id || 'N/A'}</div>
                                    </div>
                                </div>


                            </div>

                            <div className="mt-8 flex justify-end gap-3">
                                <button
                                    onClick={() => setSelectedParticipant(null)}
                                    className="px-6 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors font-medium"
                                >
                                    Close
                                </button>
                                <button
                                    onClick={() => openEditModal(selectedParticipant)}
                                    className="px-6 py-2 bg-amber-500 text-white rounded-lg hover:bg-amber-600 transition-colors font-medium flex items-center gap-2"
                                >
                                    <Pencil size={18} /> Edit
                                </button>
                                {!selectedParticipant.is_approved && (
                                    <button
                                        onClick={async () => {
                                            await handleAction(selectedParticipant.id, 'validate_registration');
                                            setSelectedParticipant(null);
                                        }}
                                        className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors font-medium flex items-center gap-2"
                                    >
                                        <Check size={18} /> Approve
                                    </button>
                                )}
                            </div>
                        </div>
                    </div>
                )}

                <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
                    <div className="p-4 border-b border-gray-100 flex flex-col gap-4 bg-gray-50 text-gray-800">
                        <div className="flex justify-between items-center">
                            <h3 className="font-semibold text-gray-700">
                                {loading ? 'Loading...' : `Participants Found: ${filteredParticipants.length}`}
                                {participants.length > filteredParticipants.length && ` (Total: ${participants.length})`}
                            </h3>
                            <button onClick={fetchParticipants} className="p-2 text-gray-500 hover:text-blue-600 hover:bg-blue-50 rounded-full transition-all" title="Refresh Data">
                                <RefreshCw size={20} className={loading ? 'animate-spin' : ''} />
                            </button>
                        </div>


                        <div className="flex flex-col sm:flex-row gap-4">
                            <div className="relative flex-1">
                                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
                                <input
                                    type="text"
                                    placeholder="Search by name, email, or ticket..."
                                    className="w-full pl-9 pr-4 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                />
                            </div>

                            <div className="flex gap-2 overflow-x-auto pb-1">
                                <select
                                    className="px-3 py-2 text-sm border border-gray-300 rounded-lg outline-none bg-white focus:ring-2 focus:ring-blue-500"
                                    value={filters.status}
                                    onChange={(e) => setFilters({ ...filters, status: e.target.value })}
                                >
                                    <option value="all">All Status</option>
                                    <option value="approved">Approved</option>
                                    <option value="pending">Pending</option>
                                </select>

                                <select
                                    className="px-3 py-2 text-sm border border-gray-300 rounded-lg outline-none bg-white focus:ring-2 focus:ring-blue-500"
                                    value={filters.attendance}
                                    onChange={(e) => setFilters({ ...filters, attendance: e.target.value })}
                                >
                                    <option value="all">All Attendance</option>
                                    <option value="present">Present</option>
                                    <option value="absent">Absent</option>
                                </select>

                                <select
                                    className="px-3 py-2 text-sm border border-gray-300 rounded-lg outline-none bg-white focus:ring-2 focus:ring-blue-500"
                                    value={filters.event}
                                    onChange={(e) => setFilters({ ...filters, event: e.target.value })}
                                >
                                    <option value="all">All Events</option>
                                    <option value="TechTantra Hackthon 2K26">TechTantra Hackthon 2K26</option>
                                </select>

                            </div>
                        </div>
                    </div>

                    <div className="overflow-x-auto">
                        <table className="w-full text-left">
                            <thead className="bg-gray-50 text-gray-500 font-medium text-xs uppercase tracking-wider">
                                <tr>
                                    <th className="px-6 py-4">Ticket</th>
                                    <th className="px-6 py-4">Team & Leader</th>
                                    <th className="px-6 py-4">Track & Problem</th>
                                    <th className="px-6 py-4">Contact Detail</th>
                                    <th className="px-6 py-4">Status & Payment</th>
                                    <th className="px-6 py-4 text-right">Actions</th>
                                </tr>

                            </thead>
                            <tbody className="divide-y divide-gray-100">
                                {filteredParticipants.map((p) => (

                                    <tr key={p.id} className="hover:bg-gray-50 transition-colors cursor-pointer group" onClick={() => setSelectedParticipant(p)}>
                                        <td className="px-6 py-4 font-mono text-sm text-gray-600">{p.ticket_number || '-'}</td>
                                        <td className="px-6 py-4">
                                            <div className="font-bold text-blue-600 leading-tight">{p.team_name}</div>
                                            <div className="font-medium text-gray-900 text-sm">{p.leader_name}</div>
                                            <div className="text-[10px] text-gray-400 mt-1 italic">{p.college}</div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="text-xs font-bold text-indigo-700">{p.track_selection || '-'}</div>
                                            <div className="text-[10px] text-gray-500 line-clamp-2 max-w-[200px] leading-tight mt-1">{p.problem_statement}</div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="text-xs text-gray-600">{p.email}</div>
                                            <div className="text-xs text-gray-400">{p.phone}</div>
                                        </td>


                                        <td className="px-6 py-4">
                                            <div className="mb-1 flex items-center gap-2">
                                                {p.is_approved ? (
                                                    <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold bg-green-100 text-green-800">
                                                        <Check size={10} /> APPROVED
                                                    </span>
                                                ) : (
                                                    <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold bg-yellow-100 text-yellow-800">
                                                        PENDING
                                                    </span>
                                                )}
                                                {p.is_attended && (
                                                    <span className="text-[10px] font-bold text-amber-600 uppercase">Present</span>
                                                )}
                                            </div>
                                            <div className="text-[10px] font-mono text-gray-400">P-ID: {p.payment_id || 'N/A'}</div>
                                        </td>



                                        <td className="px-6 py-4 text-right space-x-2" onClick={(e) => e.stopPropagation()}>
                                            {/* Edit */}
                                            <button
                                                onClick={() => openEditModal(p)}
                                                className="p-2 rounded transition-colors bg-amber-50 text-amber-600 hover:bg-amber-100"
                                                title="Edit Team"
                                            >
                                                <Pencil size={16} />
                                            </button>

                                            {/* Validate */}
                                            {!p.is_approved && (
                                                <button
                                                    onClick={() => handleAction(p.id, 'validate_registration')}
                                                    disabled={processingAction?.id === p.id}
                                                    className={`p-2 rounded transition-colors ${processingAction?.id === p.id && processingAction?.type === 'validate_registration'
                                                        ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                                                        : 'bg-blue-50 text-blue-600 hover:bg-blue-100'
                                                        }`}
                                                    title="Validate & Send Ticket"
                                                >
                                                    {processingAction?.id === p.id && processingAction?.type === 'validate_registration' ? (
                                                        <RefreshCw size={16} className="animate-spin" />
                                                    ) : (
                                                        <Check size={16} />
                                                    )}
                                                </button>
                                            )}

                                            {/* Attendance */}
                                            {p.is_approved && !p.is_attended && (
                                                <button
                                                    onClick={() => handleAction(p.id, 'mark_attendance')}
                                                    disabled={processingAction?.id === p.id}
                                                    className={`p-2 rounded transition-colors ${processingAction?.id === p.id && processingAction?.type === 'mark_attendance'
                                                        ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                                                        : 'bg-green-50 text-green-600 hover:bg-green-100'
                                                        }`}
                                                    title="Mark Attendance & Send Cert"
                                                >
                                                    {processingAction?.id === p.id && processingAction?.type === 'mark_attendance' ? (
                                                        <RefreshCw size={16} className="animate-spin" />
                                                    ) : (
                                                        <Award size={16} />
                                                    )}
                                                </button>
                                            )}

                                            {/* Winner/RunnerUp - Only if attended */}
                                            {p.is_attended && (
                                                <>
                                                    <button
                                                        onClick={() => handleAction(p.id, 'generate_award', { type: 'WINNER' })}
                                                        disabled={processingAction?.id === p.id}
                                                        className={`p-2 rounded transition-colors ${processingAction?.id === p.id && processingAction?.type === 'WINNER'
                                                            ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                                                            : 'bg-yellow-50 text-yellow-600 hover:bg-yellow-100'
                                                            }`}
                                                        title="Mark Winner"
                                                    >
                                                        {processingAction?.id === p.id && processingAction?.type === 'WINNER' ? (
                                                            <RefreshCw size={16} className="animate-spin" />
                                                        ) : (
                                                            <span className="font-bold text-xs">W</span>
                                                        )}
                                                    </button>
                                                    <button
                                                        onClick={() => handleAction(p.id, 'generate_award', { type: 'RUNNER_UP' })}
                                                        disabled={processingAction?.id === p.id}
                                                        className={`p-2 rounded transition-colors ${processingAction?.id === p.id && processingAction?.type === 'RUNNER_UP'
                                                            ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                                                            : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                                                            }`}
                                                        title="Mark Runner Up"
                                                    >
                                                        {processingAction?.id === p.id && processingAction?.type === 'RUNNER_UP' ? (
                                                            <RefreshCw size={16} className="animate-spin" />
                                                        ) : (
                                                            <span className="font-bold text-xs">R</span>
                                                        )}
                                                    </button>
                                                </>
                                            )}

                                            {/* Delete */}
                                            <button
                                                onClick={() => handleDelete(p.id)}
                                                className="p-2 text-red-400 hover:text-red-600 hover:bg-red-50 rounded"
                                                title="Remove User"
                                            >
                                                <Trash2 size={16} />
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                                {filteredParticipants.length === 0 && !loading && (
                                    <tr>
                                        <td colSpan="6" className="text-center py-12 text-gray-500">
                                            {fetchError ? (
                                                <div className="flex flex-col items-center gap-2 text-red-500">
                                                    <AlertCircle size={40} className="mb-2" />
                                                    <p className="font-bold">Failed to load data</p>
                                                    <p className="text-sm">{fetchError}</p>
                                                </div>
                                            ) : participants.length === 0 ? (
                                                <div className="flex flex-col items-center gap-2">
                                                    <Filter size={40} className="text-gray-300 mb-2" />
                                                    <p className="font-medium">No registrations yet</p>
                                                    <p className="text-sm text-gray-400">Successfully connected to server, but no participants found in database.</p>
                                                </div>
                                            ) : (
                                                <div className="flex flex-col items-center gap-2">
                                                    <Search size={40} className="text-gray-300 mb-2" />
                                                    <p className="font-medium">No results found</p>
                                                    <p className="text-sm text-gray-400">Try adjusting your search or filters (Total records: {participants.length})</p>
                                                </div>
                                            )}
                                        </td>

                                    </tr>
                                )}

                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
}
