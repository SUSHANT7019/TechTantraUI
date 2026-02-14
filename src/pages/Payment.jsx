import React, { useState, useEffect } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import QRCode from "react-qr-code";
import api from "../api";
import toast from 'react-hot-toast';
import LoadingOverlay from '../components/LoadingOverlay';
import { Copy, CheckCircle, AlertCircle, Loader2 } from "lucide-react";

export default function Payment() {
    const location = useLocation();
    const navigate = useNavigate();
    const { registrationId: stateRegId, team_name = "Team", leader_name, email, phone, amount = 1000 } = location.state || {};
    const { registrationId: paramRegId } = useParams();
    const registrationId = stateRegId || paramRegId;

    const [transactionId, setTransactionId] = useState("");
    const [isValidTxnId, setIsValidTxnId] = useState(false);
    const [proofFile, setProofFile] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [copied, setCopied] = useState(false);

    // Configurable Payee Details
    const payeeVPA = "8010472310@upi"; // Replace with actual VPA
    const payeeName = "TechTantra Hackathon";
    const transactionNote = `Reg Fee for ${team_name}`;

    // UPI Link
    const upiLink = `upi://pay?pa=${payeeVPA}&pn=${encodeURIComponent(payeeName)}&am=${amount}&tn=${encodeURIComponent(transactionNote)}&cu=INR`;

    useEffect(() => {
        if (!registrationId) {
            // If accessed directly without state, redirect to home or registration
            navigate("/");
        }
    }, [registrationId, navigate]);

    const handleTxnIdChange = (e) => {
        const val = e.target.value;
        setTransactionId(val);
        // Trim and remove any spaces/special chars for validation
        const sanitized = val.trim().replace(/\s/g, '');
        // Only allow alphanumeric characters
        setIsValidTxnId(sanitized.length > 0 && /^[a-zA-Z0-9]+$/.test(sanitized));
    };

    const copyToClipboard = () => {
        navigator.clipboard.writeText(upiLink);
        setCopied(true);
        toast.success("UPI Link Copied!");
        setTimeout(() => setCopied(false), 2000);
    };

    const verifyPayment = async () => {
        if (!isValidTxnId) return;
        if (!proofFile) {
            toast.error("Please upload a payment screenshot.");
            return;
        }
        setIsLoading(true);

        try {
            const formData = new FormData();
            const sanitizedTxnId = transactionId.trim().replace(/\s/g, '');
            formData.append('registration_id', registrationId);
            formData.append('transaction_id', sanitizedTxnId);
            formData.append('amount', amount);
            formData.append('payment_status', 'Pending Verification');
            formData.append('proof_screenshot', proofFile);

            await api.upload("payments/", formData);

            toast.success("Payment Submitted! We will verify it shortly.");
            navigate('/success', { state: { transactionId, team_name } });

        } catch (error) {
            console.error("Full Payment Error:", error);
            const errorMsg = error.data?.detail || error.message || "Payment verification failed. Please try again.";
            toast.error(errorMsg);
            if (error.data && typeof error.data === 'object') {
                console.log("Validation Errors:", error.data);
            }
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-screen relative flex items-center justify-center p-3 sm:p-4 pt-20 sm:pt-24 pb-8 sm:pb-12 overflow-hidden bg-gray-50">
            <LoadingOverlay isLoading={isLoading} message="Verifying Payment..." />
            {/* Background elements (subtle gradients instead of black) */}
            <div className="fixed inset-0 z-0">
                <div className="absolute inset-0 bg-gradient-to-br from-cyan-50 to-blue-50"></div>
                <div className="absolute top-0 right-0 w-96 h-96 bg-purple-100/50 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
                <div className="absolute bottom-0 left-0 w-96 h-96 bg-cyan-100/50 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2"></div>
            </div>

            <div className="relative z-10 w-full max-w-lg animate-fade-in-up">
                <div className="bg-white/80 backdrop-blur-xl p-4 sm:p-6 md:p-8 rounded-2xl sm:rounded-3xl border border-white/40 shadow-xl">

                    {/* Header */}
                    <div className="text-center mb-6 sm:mb-8">
                        <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2 font-outfit">
                            Complete Payment
                        </h2>
                        <p className="text-gray-500 text-sm">Scan QR or use UPI ID to pay</p>
                    </div>

                    {/* QR Code Section */}
                    <div className="flex flex-col items-center mb-6 sm:mb-8">
                        <div className="p-3 sm:p-4 bg-white rounded-xl mb-4 shadow-lg shadow-gray-200 border border-gray-100">
                            <QRCode
                                value={upiLink}
                                size={170}
                                level="H"
                                fgColor="#000000"
                                bgColor="#FFFFFF"
                                className="w-[150px] h-[150px] sm:w-[200px] sm:h-[200px]"
                            />
                        </div>
                        <div className="flex items-center gap-2 px-4 py-2 bg-gray-100 rounded-full border border-gray-200">
                            <span className="text-gray-700 font-mono text-sm">{payeeVPA}</span>
                            <button
                                onClick={copyToClipboard}
                                className="text-gray-400 hover:text-gray-600 transition-colors"
                                title="Copy UPI Link"
                            >
                                {copied ? <CheckCircle className="w-4 h-4 text-green-500" /> : <Copy className="w-4 h-4" />}
                            </button>
                        </div>
                    </div>

                    {/* Details & Form */}
                    <div className="space-y-4">
                        {/* Readonly Details */}
                        <div className="bg-gray-50 rounded-xl p-4 border border-gray-100 space-y-2 text-sm">
                            <div className="flex justify-between">
                                <span className="text-gray-500">Team</span>
                                <span className="text-gray-900 font-medium">{team_name}</span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-gray-500">Amount</span>
                                <span className="text-green-600 font-bold text-lg">₹{amount}</span>
                            </div>
                        </div>

                        {/* Transaction ID Input */}
                        <div className="space-y-2">
                            <label className="text-sm font-medium text-gray-700 ml-1">
                                Transaction ID / UPI Reference <span className="text-red-500">*</span>
                            </label>
                            <input
                                type="text"
                                value={transactionId}
                                onChange={handleTxnIdChange}
                                placeholder="Enter 12-digit UTR or Transaction ID"
                                className={`w-full px-4 py-3 rounded-xl bg-white border ${!isValidTxnId && transactionId.length > 0 ? 'border-red-500 focus:border-red-600' : 'border-gray-200 focus:border-cyan-500'
                                    } text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-cyan-100 transition-all font-mono shadow-sm`}
                            />
                            {!isValidTxnId && transactionId.length > 0 && (
                                <p className="text-red-500 text-xs ml-1">Must be alphanumeric (only numbers & letters).</p>
                            )}
                        </div>

                        {/* Payment Proof Upload */}
                        <div className="space-y-2">
                            <label className="text-sm font-medium text-gray-700 ml-1">
                                Payment Proof Screenshot <span className="text-red-500">*</span>
                            </label>
                            <input
                                type="file"
                                accept="image/*"
                                onChange={(e) => setProofFile(e.target.files[0])}
                                className="w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-cyan-100 file:text-cyan-700 hover:file:bg-cyan-200 cursor-pointer"
                            />
                        </div>

                        {/* Confirm Button */}
                        <button
                            onClick={verifyPayment}
                            disabled={!isValidTxnId || isLoading}
                            className={`w-full py-4 rounded-xl font-bold text-lg shadow-lg flex items-center justify-center gap-2 transition-all mt-4
                ${!isValidTxnId || isLoading
                                    ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
                                    : 'bg-gradient-to-r from-cyan-500 to-blue-600 text-white hover:shadow-cyan-200 hover:-translate-y-1'
                                }`}
                        >
                            {isLoading ? (
                                <>
                                    <Loader2 className="w-5 h-5 animate-spin" /> Verifying...
                                </>
                            ) : (
                                "Confirm Payment"
                            )}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
