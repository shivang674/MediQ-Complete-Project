import React from 'react';
import axios from 'axios';
import Button from '/src/components/Button.jsx';
import Alert from '/src/components/Alert.jsx';
import Spinner from '/src/components/Spinner.jsx';

const PrescriptionUploadPage = () => {
    const [file, setFile] = React.useState(null);
    const [preview, setPreview] = React.useState(null);
    const [tests, setTests] = React.useState('');
    const [status, setStatus] = React.useState({ message: '', type: '' });
    const [isLoading, setIsLoading] = React.useState(false);
    const [isAccordingToPrescription, setIsAccordingToPrescription] = React.useState(false);

    const handleFileChange = (e) => {
        const selectedFile = e.target.files[0];
        if (selectedFile) {
            setFile(selectedFile);
            if (selectedFile.type.startsWith('image/')) {
                const reader = new FileReader();
                reader.onloadend = () => { setPreview(reader.result); };
                reader.readAsDataURL(selectedFile);
            } else {
                setPreview(null);
            }
        }
    };

    const handleAccordingToPrescriptionClick = () => {
        setIsAccordingToPrescription(!isAccordingToPrescription);
        setTests('');
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        setStatus({ message: '', type: '' });

        if (!file) {
            setStatus({ message: 'Please upload a prescription file.', type: 'error' });
            setIsLoading(false);
            return;
        }

        const token = localStorage.getItem('userToken');
        if (!token) {
            setStatus({ message: 'You must be logged in to place an order.', type: 'error' });
            setIsLoading(false);
            return;
        }

        const formData = new FormData();
        formData.append('prescription', file);
        
        const testsToSend = isAccordingToPrescription ? 'According to Prescription' : tests;
        formData.append('tests', testsToSend);

        try {
            const config = {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    Authorization: `Bearer ${token}`,
                },
            };

            await axios.post('https://mediq-api.onrender.com/api/orders', formData, config);

            setStatus({ message: 'Order placed successfully! Track it in Order History.', type: 'success' });
            
            setFile(null);
            setPreview(null);
            setTests('');
            setIsAccordingToPrescription(false);

        } catch (err) {
            setStatus({ message: err.response?.data?.message || 'An error occurred while placing the order.', type: 'error' });
        } finally {
            setIsLoading(false);
        }
    }

    return (
        <div className="max-w-4xl mx-auto py-10 px-4 animate-fade-in">
            <h1 className="text-4xl font-bold text-gray-800 mb-2">Create New Order</h1>
            <p className="text-gray-500 mb-8">Follow the two simple steps below to place your order.</p>

            {status.message && <div className="mb-6"><Alert message={status.message} type={status.type} /></div>}

            <form onSubmit={handleSubmit} className="bg-white/60 backdrop-blur-xl p-8 rounded-2xl shadow-2xl space-y-8">
                <div>
                    <label className="block text-lg font-semibold text-gray-700 mb-2">1. Upload Prescription</label>
                    <div className="mt-1 flex justify-center p-6 border-2 border-gray-300 border-dashed rounded-xl hover:border-teal-400 transition-colors">
                        <div className="space-y-2 text-center">
                            {preview ? (
                                <img src={preview} alt="Prescription preview" className="mx-auto h-48 w-auto rounded-lg shadow-md" />
                            ) : file ? (
                                <div className="mx-auto flex flex-col items-center justify-center h-48 text-gray-600">
                                    <svg className="h-16 w-16 text-red-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m.75 12.188l-2.25.625m2.25-.625l2.25 2.25M8.25 15l2.25 2.25m0 0l2.25 2.25M10.5 17.25l2.25-2.25m-2.25 2.25l-2.25 2.25m2.25-2.25l2.25-2.25M15 21l-3-3m0 0l-3 3m3-3v-6m0 6h6m-6 0H6" />
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m2.25 0H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
                                    </svg>
                                    <p className="mt-2 text-sm font-medium">{file.name}</p>
                                </div>
                            ) : (
                               <svg className="mx-auto h-16 w-16 text-gray-400"  viewBox="0 0 24 24"  fill="none"  stroke="currentColor"  strokeWidth="2"  strokeLinecap="round"  strokeLinejoin="round">  <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />  <polyline points="14 2 14 8 20 8" />  <line x1="12" y1="18" x2="12" y2="12" />  <line x1="9" y1="15" x2="15" y2="15" /></svg>
                            )}
                            <div className="flex text-sm text-gray-600">
                                <label htmlFor="file-upload" className="relative cursor-pointer bg-white rounded-md font-medium text-teal-600 hover:text-teal-500 focus-within:outline-none">
                                    <span>Upload a file</span>
                                    <input id="file-upload" name="file-upload" type="file" className="sr-only" onChange={handleFileChange} accept="image/png, image/jpeg, application/pdf" />
                                </label>
                                <p className="pl-1">or drag and drop</p>
                            </div>
                            <p className="text-xs text-gray-500">PNG, JPG, PDF up to 10MB</p>
                        </div>
                    </div>
                </div>
                <div>
                    <div className="flex justify-between items-center">
                         <label htmlFor="tests" className="block text-lg font-semibold text-gray-700">
                            2. List Required Tests
                        </label>
                    </div>
                     <p className="text-sm text-gray-500 mt-1 mb-2">
                        Type the test names below, or click the button if you're unsure.
                    </p>
                    <div className="flex items-center space-x-2">
                        <textarea 
                            id="tests" 
                            name="tests" 
                            rows="4"
                            className="flex-grow block w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm placeholder-gray-400 focus:outline-none focus:ring-cyan-500 focus:border-cyan-500 sm:text-sm disabled:bg-gray-100 disabled:cursor-not-allowed"
                            placeholder={isAccordingToPrescription ? "Our team will identify the tests from your prescription." : "e.g., Complete Blood Count (CBC), Vitamin D Test"}
                            value={tests}
                            onChange={(e) => {
                                setTests(e.target.value);
                                if (isAccordingToPrescription) {
                                    setIsAccordingToPrescription(false);
                                }
                            }}
                            disabled={isAccordingToPrescription}
                        ></textarea>
                         <button 
                            type="button" 
                            onClick={handleAccordingToPrescriptionClick}
                            title="Let us identify the tests from your prescription"
                            className={`flex-shrink-0 p-3 h-full rounded-lg transition-colors ${
                                isAccordingToPrescription 
                                ? 'bg-teal-600 text-white shadow-md' 
                                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                            }`}
                        >
                           <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                        </button>
                    </div>
                </div>
                <div className="pt-2">
                    <Button type="submit" fullWidth={true}>
                        {isLoading ? <Spinner /> : 'Place Your Order'}
                    </Button>
                </div>
            </form>
        </div>
    );
};

export default PrescriptionUploadPage;

