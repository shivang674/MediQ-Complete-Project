import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Spinner from '../components/Spinner.jsx';
import Alert from '../components/Alert.jsx';

const ReportsPage = () => {
    const [reports, setReports] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchReports = async () => {
            setIsLoading(true);
            setError('');
            
            const token = localStorage.getItem('userToken');
            if (!token) {
                setError('You must be logged in to view your reports.');
                setIsLoading(false);
                return;
            }

            try {
                const config = {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                };
                const { data: orders } = await axios.get('https://mediq-api.onrender.com/api/orders', config);
                
               
                const completedOrders = orders.filter(order => order.status === 'Completed');
                setReports(completedOrders);

            } catch (err) {
                setError(err.response?.data?.message || 'Failed to fetch reports.');
            } finally {
                setIsLoading(false);
            }
        };

        fetchReports();
    }, []);

    const formatDate = (dateString) => {
        return new Date(dateString).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
        });
    };
    
    const getDisplayableUrl = (url) => {
        if (url && url.toLowerCase().endsWith('.pdf')) {
            return url.replace('/upload/', '/upload/fl_inline/');
        }
        return url;
    };

    if (isLoading) {
        return (
            <div className="flex justify-center items-center h-64">
                <Spinner />
            </div>
        );
    }

    return (
        <div className="max-w-4xl mx-auto py-10 px-4 animate-fade-in">
             <h1 className="text-4xl font-bold text-gray-800 mb-8">Your Reports</h1>
             {error && <div className="mb-6"><Alert message={error} type="error" /></div>}
             <div className="space-y-4">
                {reports.length > 0 ? reports.map((report, index) => (
                    <div 
                        key={report._id} 
                        className="bg-white/60 backdrop-blur-xl shadow-lg rounded-xl p-4 sm:p-6 hover:shadow-2xl hover:-translate-y-1 transition-all duration-300"
                        style={{ animationDelay: `${index * 100}ms` }}
                    >
                       <div className="flex items-center space-x-4">
                            <div className="flex-shrink-0">
                                <svg className="h-16 w-16 text-teal-600" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V7a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>
                            </div>
                            <div className="flex-1 min-w-0">
                                <p className="text-md font-semibold text-gray-900 truncate">
                                    Report for Order #{report._id.substring(0, 7)}...
                                </p>
                                <p className="text-sm text-gray-500 truncate">
                                    Tests: {report.tests.join(', ') || 'According to Prescription'}
                                </p>
                                <p className="text-sm text-gray-500 truncate">
                                    Date Completed: {formatDate(report.updatedAt)}
                                </p>
                            </div>
                            <div className="flex flex-col items-end space-y-2">
                                <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-teal-100 text-teal-800">
                                    Available
                                </span>
                                <a 
                                    href={getDisplayableUrl(report.prescription.url)} 
                                    target="_blank" 
                                    rel="noopener noreferrer"
                                    className="text-sm font-medium text-teal-600 hover:text-teal-500"
                                >
                                    View Report
                                </a>
                            </div>
                       </div>
                    </div>
                )) : (
                    <div className="text-center py-12 bg-white/60 backdrop-blur-xl rounded-2xl">
                        <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 13h6m-3-3v6m-9 1V7a2 2 0 012-2h6l2 2h6a2 2 0 012 2v8a2 2 0 01-2 2H5a2 2 0 01-2-2z" /></svg>
                        <h3 className="mt-2 text-xl font-medium text-gray-800">No Reports Found</h3>
                        <p className="mt-1 text-gray-500">Your reports will appear here once your orders are completed.</p>
                    </div>
                )}
             </div>
        </div>
    );
};

export default ReportsPage;

