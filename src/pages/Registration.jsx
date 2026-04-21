import React, { useState } from 'react';
import api from '../api';
import { User, Mail, Phone, Building, Calendar, Users, CheckCircle, Plus, Trash2, ArrowRight, Loader2 } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import LoadingOverlay from '../components/LoadingOverlay';
import RegistrationClosed from '../components/RegistrationClosed';

export default function Registration() {
    // Registration is closed
    return <RegistrationClosed />;

    const [formData, setFormData] = useState({
        team_name: '',
        leader_name: '',
        email: '',
        phone: '',
        college: '',
        city: '',
        education_year: '',
        event_selection: 'TechTantra Hackthon 2K26',
        track_selection: '',
        problem_statement: '',
        team_members: [],
        agreed_to_terms: false
    });


    const [touched, setTouched] = useState({});
    const [isLoading, setIsLoading] = useState(false);

    // Removed apiError state as we use toast now

    const tracks = [
        "FinTech",
        "AgriTech",
        "AI & ML",
        "IOT and Robotics",
        "Open Innovation"
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
        "Diploma / Polytechnic / ITI",
        "B.Tech / B.E / BCA / BSC",
        "M.Tech / M.E / MCA / MSC",
        "Other"
    ];

    // Team Member Logic
    const MAX_MEMBERS = 3;

    const addTeamMember = () => {
        if (formData.team_members.length < MAX_MEMBERS) {
            setFormData(prev => ({
                ...prev,
                team_members: [...prev.team_members, ""]
            }));
        }
    };

    const updateTeamMember = (index, value) => {
        // Allow letters, spaces, dots, hyphens and apostrophes (matching backend)
        if (/^[A-Za-z\s.'-]*$/.test(value)) {
            const newMembers = [...formData.team_members];

            newMembers[index] = value;
            setFormData(prev => ({ ...prev, team_members: newMembers }));
        }
    };

    const removeTeamMember = (index) => {
        const newMembers = formData.team_members.filter((_, i) => i !== index);
        setFormData(prev => ({ ...prev, team_members: newMembers }));
    };

    // Validation Logic
    const validate = (data) => {
        const errors = {};

        if (!data.team_name.trim()) errors.team_name = "Team Name is required";
        if (!data.leader_name.trim()) errors.leader_name = "Team Leader Name is required";

        if (!data.email) {
            errors.email = "Email is required";
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) {
            errors.email = "Please enter a valid email address";
        }

        if (!data.phone) {
            errors.phone = "Phone number is required";
        } else if (!/^\d{10}$/.test(data.phone)) {
            errors.phone = "Phone number must be exactly 10 digits";
        }

        if (!data.college.trim()) errors.college = "Institute Name is required";
        if (!data.city.trim()) errors.city = "City is required";
        if (!data.education_year) errors.education_year = "Please select your Education";
        if (!data.track_selection) errors.track_selection = "Please select a track";
        if (!data.problem_statement) errors.problem_statement = "Please select or enter a problem statement";

        // Validate Team Members
        data.team_members.forEach((member, index) => {
            if (!member.trim()) {
                errors[`member_${index}`] = "Member name is required";
            }
        });

        if (!data.agreed_to_terms) errors.agreed_to_terms = "You must agree to the terms";


        return errors;
    };

    const errors = validate(formData);
    const isValid = Object.keys(errors).length === 0;

    const handleBlur = (field) => {
        setTouched(prev => ({ ...prev, [field]: true }));
    };

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData(prev => {
            const newData = {
                ...prev,
                [name]: type === 'checkbox' ? checked : value
            };

            if (name === 'track_selection') {
                newData.problem_statement = '';
            }

            return newData;
        });
    };

    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Mark all as touched
        const allTouched = Object.keys(formData).reduce((acc, key) => ({ ...acc, [key]: true }), {});
        formData.team_members.forEach((_, index) => {
            allTouched[`member_${index}`] = true;
        });
        setTouched(allTouched);

        if (!isValid) {
            toast.error("Please fill all required fields correctly.");
            return;
        }

        setIsLoading(true);

        try {
            const data = await api.post('register/', formData);

            toast.success("Registration Successful!");

            // Navigate to Payment page with data
            navigate(`/payment/${data.id}`, {
                state: {
                    registrationId: data.id,
                    ...formData,
                    amount: 1000
                }
            });
        } catch (err) {
            console.error("Registration error:", err);
            let errorMsg = "Registration failed. Please try again.";

            if (err.data) {
                const data = err.data;
                // Handle different error structures
                if (data.detail) {
                    errorMsg = data.detail;
                } else if (typeof data === 'object') {
                    // Extract the first error found
                    const keys = Object.keys(data);
                    if (keys.length > 0) {
                        const firstKey = keys[0];
                        const errorContent = data[firstKey];
                        const message = Array.isArray(errorContent) ? errorContent[0] : errorContent;

                        // Customize message for specific fields if needed
                        if (firstKey === 'email') {
                            errorMsg = `Email Error: ${message}`;
                        } else if (firstKey === 'transaction_id') {
                            errorMsg = `Transaction ID Error: ${message}`;
                        } else {
                            // Capitalize first letter of field name for better readability 
                            const fieldName = firstKey.charAt(0).toUpperCase() + firstKey.slice(1).replace(/_/g, ' ');
                            errorMsg = `${fieldName}: ${message}`;
                        }
                    }
                }
            }
            toast.error(errorMsg);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-screen relative overflow-x-hidden pt-16 sm:pt-20 pb-8 sm:pb-12">
            <LoadingOverlay isLoading={isLoading} message="Processing Registration..." />

            {/* Video Background */}
             <div className="fixed inset-0 z-0">
                <video
                    autoPlay
                    loop
                    muted
                    playsInline
                    className="w-full h-full object-cover"
                >
                    <source src="/bgvod.mp4" type="video/mp4" />
                </video>
                <div className="absolute inset-0 bg-black/30"></div>
            </div>
        
            <div className="relative z-10 container mx-auto px-3 sm:px-4 max-w-3xl">
                <div className="text-center mb-10 animate-fade-in-up">
                    <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white mb-3 sm:mb-4 font-outfit tracking-tight">
                        <span className="bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600">
                            Join the Challenge
                        </span>
                    </h1>
                    <p className="text-[#FFFCBF] text-base sm:text-lg max-w-xl mx-auto">
                        Register your team for the ultimate hackathon experience.
                    </p>
                </div>

                <div className="glass-panel rounded-2xl sm:rounded-3xl p-4 sm:p-6 md:p-10 border border-white/10 shadow-2xl animate-fade-in-up" style={{ animationDelay: '0.1s' }}>
                    <form onSubmit={handleSubmit} className="space-y-6">

                        {/* Team Details */}
                        <div className="space-y-4">
                            <h3 className="text-xl font-bold text-cyan-400 flex items-center gap-2">
                                <Users className="w-5 h-5" /> Team Details
                            </h3>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div className="space-y-1">
                                    <label className="text-sm font-medium text-gray-300 ml-1">Team Name <span className="text-red-400">*</span></label>
                                    <div className="relative group">
                                        <Users className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 group-focus-within:text-cyan-400 transition-colors w-5 h-5" />
                                        <input
                                            type="text"
                                            name="team_name"
                                            value={formData.team_name}
                                            onChange={handleChange}
                                            onBlur={() => handleBlur('team_name')}
                                            className={`w-full pl-10 pr-4 py-3 rounded-xl bg-white/5 border ${touched.team_name && errors.team_name ? 'border-red-500/50 focus:border-red-500' : 'border-white/10 focus:border-cyan-400'} text-white placeholder-gray-500 focus:outline-none focus:ring-1 focus:ring-cyan-400 transition-all`}
                                            placeholder="e.g. Binary Bandits"
                                        />
                                    </div>
                                    {touched.team_name && errors.team_name && <p className="text-red-400 text-xs ml-1">{errors.team_name}</p>}
                                </div>

                                <div className="space-y-1">
                                    <label className="text-sm font-medium text-gray-300 ml-1">Team Leader Name <span className="text-red-400">*</span></label>
                                    <div className="relative group">
                                        <User className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 group-focus-within:text-cyan-400 transition-colors w-5 h-5" />
                                        <input
                                            type="text"
                                            name="leader_name"
                                            value={formData.leader_name}
                                            onChange={handleChange}
                                            onBlur={() => handleBlur('leader_name')}
                                            className={`w-full pl-10 pr-4 py-3 rounded-xl bg-white/5 border ${touched.leader_name && errors.leader_name ? 'border-red-500/50 focus:border-red-500' : 'border-white/10 focus:border-cyan-400'} text-white placeholder-gray-500 focus:outline-none focus:ring-1 focus:ring-cyan-400 transition-all`}
                                            placeholder="Full Name"
                                        />
                                    </div>
                                    {touched.leader_name && errors.leader_name && <p className="text-red-400 text-xs ml-1">{errors.leader_name}</p>}
                                </div>
                            </div>
                        </div>

                        {/* Contact */}
                        <div className="space-y-4 pt-4 border-t border-white/5">
                            <h3 className="text-xl font-bold text-purple-400 flex items-center gap-2">
                                <Mail className="w-5 h-5" /> Contact
                            </h3>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div className="space-y-1">
                                    <label className="text-sm font-medium text-gray-300 ml-1">Email <span className="text-red-400">*</span></label>
                                    <div className="relative group">
                                        <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 group-focus-within:text-purple-400 transition-colors w-5 h-5" />
                                        <input
                                            type="email"
                                            name="email"
                                            value={formData.email}
                                            onChange={handleChange}
                                            onBlur={() => handleBlur('email')}
                                            className={`w-full pl-10 pr-4 py-3 rounded-xl bg-white/5 border ${touched.email && errors.email ? 'border-red-500/50 focus:border-red-500' : 'border-white/10 focus:border-purple-400'} text-white placeholder-gray-500 focus:outline-none focus:ring-1 focus:ring-purple-400 transition-all`}
                                            placeholder="leader@example.com"
                                        />
                                    </div>
                                    {touched.email && errors.email && <p className="text-red-400 text-xs ml-1">{errors.email}</p>}
                                </div>

                                <div className="space-y-1">
                                    <label className="text-sm font-medium text-gray-300 ml-1">Phone Number <span className="text-red-400">*</span></label>
                                    <div className="relative group">
                                        <Phone className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 group-focus-within:text-purple-400 transition-colors w-5 h-5" />
                                        <input
                                            type="tel"
                                            name="phone"
                                            value={formData.phone}
                                            onChange={(e) => {
                                                const val = e.target.value.replace(/\D/g, '').slice(0, 10);
                                                setFormData({ ...formData, phone: val });
                                            }}
                                            onBlur={() => handleBlur('phone')}
                                            className={`w-full pl-10 pr-4 py-3 rounded-xl bg-white/5 border ${touched.phone && errors.phone ? 'border-red-500/50 focus:border-red-500' : 'border-white/10 focus:border-purple-400'} text-white placeholder-gray-500 focus:outline-none focus:ring-1 focus:ring-purple-400 transition-all`}
                                            placeholder="10-digit number"
                                        />
                                    </div>
                                    {touched.phone && errors.phone && <p className="text-red-400 text-xs ml-1">{errors.phone}</p>}
                                </div>
                            </div>
                        </div>

                        {/* Institute and City */}
                        <div className="space-y-4 pt-4 border-t border-white/5">
                            <h3 className="text-xl font-bold text-pink-400 flex items-center gap-2">
                                <Building className="w-5 h-5" /> Institute and City
                            </h3>

                            <div className="space-y-4">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div className="space-y-1">
                                        <label className="text-sm font-medium text-gray-300 ml-1">Institute Name <span className="text-red-400">*</span></label>
                                        <div className="relative group">
                                            <Building className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 group-focus-within:text-pink-400 transition-colors w-5 h-5" />
                                            <input
                                                type="text"
                                                name="college"
                                                value={formData.college}
                                                onChange={handleChange}
                                                onBlur={() => handleBlur('college')}
                                                className={`w-full pl-10 pr-4 py-3 rounded-xl bg-white/5 border ${touched.college && errors.college ? 'border-red-500/50 focus:border-red-500' : 'border-white/10 focus:border-pink-400'} text-white placeholder-gray-500 focus:outline-none focus:ring-1 focus:ring-pink-400 transition-all`}
                                                placeholder="Institute Name"
                                            />
                                        </div>
                                        {touched.college && errors.college && <p className="text-red-400 text-xs ml-1">{errors.college}</p>}
                                    </div>

                                    <div className="space-y-1">
                                        <label className="text-sm font-medium text-gray-300 ml-1">City <span className="text-red-400">*</span></label>
                                        <div className="relative group">
                                            {/* Reusing Building Icon for City or could import MapPin */}
                                            <Building className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 group-focus-within:text-pink-400 transition-colors w-5 h-5" />
                                            <input
                                                type="text"
                                                name="city"
                                                value={formData.city}
                                                onChange={handleChange}
                                                onBlur={() => handleBlur('city')}
                                                className={`w-full pl-10 pr-4 py-3 rounded-xl bg-white/5 border ${touched.city && errors.city ? 'border-red-500/50 focus:border-red-500' : 'border-white/10 focus:border-pink-400'} text-white placeholder-gray-500 focus:outline-none focus:ring-1 focus:ring-pink-400 transition-all`}
                                                placeholder="City"
                                            />
                                        </div>
                                        {touched.city && errors.city && <p className="text-red-400 text-xs ml-1">{errors.city}</p>}
                                    </div>
                                </div>

                                <div className="space-y-1">
                                    <label className="text-sm font-medium text-gray-300 ml-1">Select Education <span className="text-red-400">*</span></label>
                                    <div className="relative group">
                                        <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 group-focus-within:text-pink-400 transition-colors w-5 h-5" />
                                        <select
                                            name="education_year"
                                            value={formData.education_year}
                                            onChange={handleChange}
                                            onBlur={() => handleBlur('education_year')}
                                            className={`w-full pl-10 pr-10 py-3 rounded-xl bg-white/5 border ${touched.education_year && errors.education_year ? 'border-red-500/50 focus:border-red-500' : 'border-white/10 focus:border-pink-400'} text-white placeholder-gray-500 focus:outline-none focus:ring-1 focus:ring-pink-400 transition-all appearance-none cursor-pointer`}
                                        >
                                            <option value="" disabled>Select Education ...</option>
                                            {educationOptions.map(year => (
                                                <option key={year} value={year} className="bg-gray-900 text-white">{year}</option>
                                            ))}
                                        </select>
                                        <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-gray-500">
                                            <svg className="w-4 h-4 fill-current" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" /></svg>
                                        </div>
                                    </div>
                                    {touched.education_year && errors.education_year && <p className="text-red-400 text-xs ml-1">{errors.education_year}</p>}
                                </div>
                            </div>
                        </div>

                        {/* Event Section */}
                        <div className="space-y-4 pt-4 border-t border-white/5">
                            <h3 className="text-xl font-bold text-yellow-400 flex items-center gap-2">
                                <Calendar className="w-5 h-5" /> Event
                            </h3>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div className="space-y-1">
                                    <label className="text-sm font-medium text-gray-300 ml-1">Select Event <span className="text-red-400">*</span></label>
                                    <div className="relative group">
                                        <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 group-focus-within:text-yellow-400 transition-colors w-5 h-5" />
                                        <input
                                            type="text"
                                            value="TechTantra Hackthon 2K26"
                                            disabled
                                            className="w-full pl-10 pr-4 py-3 rounded-xl bg-white/5 border border-white/10 text-gray-400 cursor-not-allowed"
                                        />
                                    </div>
                                </div>

                                <div className="space-y-1">
                                    <label className="text-sm font-medium text-gray-300 ml-1">Select Track <span className="text-red-400">*</span></label>
                                    <div className="relative group">
                                        <CheckCircle className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 group-focus-within:text-yellow-400 transition-colors w-5 h-5" />
                                        <select
                                            name="track_selection"
                                            value={formData.track_selection}
                                            onChange={handleChange}
                                            onBlur={() => handleBlur('track_selection')}
                                            className={`w-full pl-10 pr-10 py-3 rounded-xl bg-white/5 border ${touched.track_selection && errors.track_selection ? 'border-red-500/50 focus:border-red-500' : 'border-white/10 focus:border-yellow-400'} text-white placeholder-gray-500 focus:outline-none focus:ring-1 focus:ring-yellow-400 transition-all appearance-none cursor-pointer`}
                                        >
                                            <option value="" disabled>Select Track...</option>
                                            {tracks.map(track => (
                                                <option key={track} value={track} className="bg-gray-900 text-white">{track}</option>
                                            ))}
                                        </select>
                                        <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-gray-500">
                                            <svg className="w-4 h-4 fill-current" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" /></svg>
                                        </div>
                                    </div>
                                    {touched.track_selection && errors.track_selection && <p className="text-red-400 text-xs ml-1">{errors.track_selection}</p>}
                                </div>

                                {formData.track_selection && (
                                    <div className="space-y-1 md:col-span-2">
                                        <label className="text-sm font-medium text-gray-300 ml-1">
                                            {formData.track_selection === "Open Innovation" ? "Enter Problem Statement" : "Select Problem Statement"} <span className="text-red-400">*</span>
                                        </label>
                                        <div className="relative group">
                                            <CheckCircle className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 group-focus-within:text-yellow-400 transition-colors w-5 h-5" />

                                            {formData.track_selection === "Open Innovation" ? (
                                                <input
                                                    type="text"
                                                    name="problem_statement"
                                                    value={formData.problem_statement}
                                                    onChange={handleChange}
                                                    onBlur={() => handleBlur('problem_statement')}
                                                    className={`w-full pl-10 pr-4 py-3 rounded-xl bg-white/5 border ${touched.problem_statement && errors.problem_statement ? 'border-red-500/50 focus:border-red-500' : 'border-white/10 focus:border-yellow-400'} text-white placeholder-gray-500 focus:outline-none focus:ring-1 focus:ring-yellow-400 transition-all`}
                                                    placeholder="Describe your problem statement..."
                                                />
                                            ) : (
                                                <select
                                                    name="problem_statement"
                                                    value={formData.problem_statement}
                                                    onChange={handleChange}
                                                    onBlur={() => handleBlur('problem_statement')}
                                                    className={`w-full pl-10 pr-10 py-3 rounded-xl bg-white/5 border ${touched.problem_statement && errors.problem_statement ? 'border-red-500/50 focus:border-red-500' : 'border-white/10 focus:border-yellow-400'} text-white placeholder-gray-500 focus:outline-none focus:ring-1 focus:ring-yellow-400 transition-all appearance-none cursor-pointer`}
                                                >
                                                    <option value="" disabled>Select Problem Statement...</option>
                                                    {problemStatements[formData.track_selection]?.map(ps => (
                                                        <option key={ps} value={ps} className="bg-gray-900 text-white">{ps}</option>
                                                    ))}
                                                </select>
                                            )}

                                            {formData.track_selection !== "Open Innovation" && (
                                                <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-gray-500">
                                                    <svg className="w-4 h-4 fill-current" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" /></svg>
                                                </div>
                                            )}
                                        </div>
                                        {touched.problem_statement && errors.problem_statement && <p className="text-red-400 text-xs ml-1">{errors.problem_statement}</p>}
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* Team Members Section (Optional) */}
                        <div className="space-y-4 pt-4 border-t border-white/5">
                            <div className="flex items-center justify-between">
                                <h3 className="text-xl font-bold text-green-400 flex items-center gap-2">
                                    <Users className="w-5 h-5" /> Team Members <span className="text-sm font-normal text-gray-500 ml-2">(Max {MAX_MEMBERS})</span>
                                </h3>
                                {formData.team_members.length < MAX_MEMBERS && (
                                    <button
                                        type="button"
                                        onClick={addTeamMember}
                                        className="px-3 py-1.5 bg-green-400/10 hover:bg-green-400/20 text-green-400 text-sm font-medium rounded-lg transition-colors flex items-center gap-1"
                                    >
                                        <Plus className="w-4 h-4" /> Add Member
                                    </button>
                                )}
                            </div>

                            {formData.team_members.length === 0 && (
                                <p className="text-sm text-gray-500 italic ml-1">No additional members added yet.</p>
                            )}

                            <div className="space-y-3">
                                {formData.team_members.map((member, index) => (
                                    <div key={index} className="animate-fade-in-up" style={{ animationDuration: '0.3s' }}>
                                        <div className="flex gap-2">
                                            <input
                                                type="text"
                                                value={member}
                                                onChange={(e) => updateTeamMember(index, e.target.value)}
                                                onBlur={() => handleBlur(`member_${index}`)}
                                                className={`flex-1 pl-4 pr-4 py-3 rounded-xl bg-white/5 border ${touched[`member_${index}`] && errors[`member_${index}`] ? 'border-red-500/50 focus:border-red-500' : 'border-white/10 focus:border-yellow-400'} text-white placeholder-gray-600 focus:outline-none focus:ring-1 focus:ring-yellow-400 transition-all`}
                                                placeholder={`Member ${index + 2} Name (Letters only)`}
                                            />
                                            <button
                                                type="button"
                                                onClick={() => removeTeamMember(index)}
                                                className="p-3 bg-red-500/10 hover:bg-red-500/20 text-red-400 rounded-xl transition-colors"
                                                title="Remove Member"
                                            >
                                                <Trash2 className="w-5 h-5" />
                                            </button>

                                        </div>
                                        {touched[`member_${index}`] && errors[`member_${index}`] && (
                                            <p className="text-red-400 text-xs ml-1 mt-1">{errors[`member_${index}`]}</p>
                                        )}
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Fee Info */}
                        <div className="bg-gradient-to-r from-blue-900/20 to-purple-900/20 rounded-xl p-4 border border-blue-500/10">
                            <div className="flex justify-between items-center text-sm">
                                <span className="text-gray-300">Registration Fee:</span>
                                <span className="text-xl font-bold text-white">₹1000.00</span>
                            </div>
                            <p className="text-xs text-blue-300/70 mt-1">* Non-refundable registration fee includes entry for the entire team.</p>
                        </div>

                        {/* Terms */}
                        <div className="pt-2">
                            <label className="flex items-start gap-3 cursor-pointer group">
                                <div className="relative flex items-center">
                                    <input
                                        type="checkbox"
                                        name="agreed_to_terms"
                                        checked={formData.agreed_to_terms}
                                        onChange={handleChange}
                                        className="peer sr-only"
                                    />

                                    <div className={`w-6 h-6 rounded-md border-2 border-gray-500 peer-checked:bg-cyan-500 peer-checked:border-cyan-500 transition-all mr-2 flex items-center justify-center ${touched.agreed_to_terms && errors.agreed_to_terms ? 'border-red-500' : ''}`}>

                                        <svg className="w-4 h-4 text-white opacity-0 peer-checked:opacity-100 transition-opacity" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                                            <polyline points="20 6 9 17 4 12"></polyline>
                                        </svg>
                                    </div>
                                </div>
                                <span className={`text-sm text-gray-300 group-hover:text-white transition-colors select-none ${touched.agreed_to_terms && errors.agreed_to_terms ? 'text-red-400' : ''}`}>
                                    I agree to the <a href="https://drive.google.com/file/d/1STp8d7vo7VusK9ybh-p9eJDl1o0HPKIe/view?usp=drive_link" className="text-cyan-400 hover:underline">Terms & Conditions</a> .
                                </span>
                            </label>
                            {touched.agreed_to_terms && errors.agreed_to_terms && <p className="text-red-400 text-xs ml-9 mt-1">{errors.agreed_to_terms}</p>}

                        </div>

                        {/* Submit Button */}
                        <div className="pt-4">
                            <button
                                type="submit"
                                disabled={!isValid || isLoading}
                                className={`w-full py-3 sm:py-4 rounded-xl font-bold text-base sm:text-lg shadow-xl flex items-center justify-center gap-2 transition-all 
                                    ${!isValid || isLoading
                                        ? 'bg-gray-700 text-gray-400 cursor-not-allowed opacity-70'
                                        : 'bg-gradient-to-r from-cyan-600 via-blue-600 to-purple-600 text-white hover:shadow-cyan-500/25 hover:-translate-y-1'
                                    }`}
                            >
                                {isLoading ? (
                                    <>
                                        <Loader2 className="w-6 h-6 animate-spin" /> Processing...
                                    </>
                                ) : (
                                    <>
                                        Register & Pay <ArrowRight className="w-6 h-6" />
                                    </>
                                )}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}
