import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Spinner from '/src/components/Spinner.jsx';
import Alert from '/src/components/Alert.jsx';

const OrderHistoryPage = () => {
    const [orders, setOrders] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchOrders = async () => {
            setIsLoading(true);
            setError('');
            
            const token = localStorage.getItem('userToken');
            if (!token) {
                setError('You must be logged in to view your orders.');
                setIsLoading(false);
                return;
            }

            try {
                const config = {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                };
                const { data } = await axios.get('http://localhost:5000/api/orders', config);
                setOrders(data);
            } catch (err) {
                setError(err.response?.data?.message || 'Failed to fetch orders.');
            } finally {
                setIsLoading(false);
            }
        };

        fetchOrders();
    }, []);

    const statusColor = {
        Pending: 'bg-amber-100 text-amber-800',
        Processing: 'bg-blue-100 text-blue-800',
        Completed: 'bg-teal-100 text-teal-800',
        Cancelled: 'bg-red-100 text-red-800',
    };

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
             <h1 className="text-4xl font-bold text-gray-800 mb-8">Your Order History</h1>
             {error && <div className="mb-6"><Alert message={error} type="error" /></div>}
             <div className="space-y-4">
                {orders.length > 0 ? orders.map((order, index) => (
                    <div 
                        key={order._id} 
                        className="bg-white/60 backdrop-blur-xl shadow-lg rounded-xl p-4 sm:p-6 hover:shadow-2xl hover:-translate-y-1 transition-all duration-300"
                        style={{ animationDelay: `${index * 100}ms` }}
                    >
                       <div className="flex items-center space-x-4">
                            <div className="flex-shrink-0">
                                <a href={getDisplayableUrl(order.prescription.url)} target="_blank" rel="noopener noreferrer">
                                    <img 
                                        className="h-16 w-16 rounded-lg object-cover cursor-pointer" 
                                        src={order.prescription.url.toLowerCase().endsWith('.pdf') ? 'https://placehold.co/100x100/e2e8f0/4a5567?text=PDF' : order.prescription.url} 
                                        alt="Prescription Thumbnail" 
                                    />
                                </a>
                            </div>
                            <div className="flex-1 min-w-0">
                                <p className="text-md font-semibold text-gray-900 truncate">
                                    Order #{order._id.substring(0, 7)}...
                                </p>
                                <p className="text-sm text-gray-500 truncate">
                                    Date: {formatDate(order.createdAt)}
                                </p>
                                <p className="text-sm text-gray-600 truncate font-medium">
                                    Tests: {order.tests.join(', ') || 'According to Prescription'}
                                </p>
                            </div>
                            <div>
                                 <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${statusColor[order.status]}`}>
                                    {order.status}
                                </span>
                            </div>
                       </div>
                    </div>
                )) : (
                     <div className="text-center py-12 bg-white/60 backdrop-blur-xl rounded-2xl">
                        <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 13h6m-3-3v6m-9 1V7a2 2 0 012-2h6l2 2h6a2 2 0 012 2v8a2 2 0 01-2 2H5a2 2 0 01-2-2z" /></svg>
                        <h3 className="mt-2 text-xl font-medium text-gray-800">No Orders Found</h3>
                        <p className="mt-1 text-gray-500">You haven't placed any orders yet. Start by uploading a prescription!</p>
                    </div>
                )}
             </div>
        </div>
    );
};

export default OrderHistoryPage;

