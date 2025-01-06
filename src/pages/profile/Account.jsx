import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { logout } from '../../store/userSlice';

const mockOrders = [
    { id: '1', date: '2023-05-15', total: 79.99, status: 'Delivered' },
    { id: '2', date: '2023-06-02', total: 129.99, status: 'Shipped' },
    { id: '3', date: '2023-06-10', total: 59.99, status: 'Processing' },
];

export default function Account() {
    const user = useSelector((state) => state.user.user);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleLogout = () => {
        dispatch(logout());
        navigate('/');
    };

    if (!user) {
        navigate('/login');
        return null;
    }

    return (
        <div className="min-h-screen bg-gray-100 dark:bg-gray-900 py-12 px-4 sm:px-6 lg:px-8 mt-16">
            <div className="max-w-3xl mx-auto">
                <h1 className="text-3xl font-bold mb-8 dark:text-white">My Account</h1>

                <div className="bg-white dark:bg-gray-800 shadow-md rounded-lg overflow-hidden mb-8">
                    <div className="p-6">
                        <h2 className="text-xl font-semibold mb-4 dark:text-white">Personal Information</h2>
                        <p className="dark:text-gray-300"><strong>Name:</strong> {user.name}</p>
                        <p className="dark:text-gray-300"><strong>Email:</strong> {user.email}</p>
                    </div>
                </div>

                <div className="bg-white dark:bg-gray-800 shadow-md rounded-lg overflow-hidden mb-8">
                    <div className="p-6">
                        <h2 className="text-xl font-semibold mb-4 dark:text-white">Order History</h2>
                        {mockOrders.length > 0 ? (
                            <table className="w-full">
                                <thead>
                                    <tr className="bg-gray-50 dark:bg-gray-700">
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Order ID</th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Date</th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Total</th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Status</th>
                                    </tr>
                                </thead>
                                <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                                    {mockOrders.map((order) => (
                                        <tr key={order.id}>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white">{order.id}</td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-300">{order.date}</td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-300">${order.total.toFixed(2)}</td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-300">{order.status}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        ) : (
                            <p className="dark:text-gray-300">No orders found.</p>
                        )}
                    </div>
                </div>

                <button
                    onClick={handleLogout}
                    className="w-full bg-black dark:bg-gray-700 text-white px-6 py-3 rounded-md hover:bg-gray-800 dark:hover:bg-gray-600 text-sm sm:text-base font-medium transition-colors duration-200 ease-in-out"
                >
                    Log Out
                </button>
            </div>
        </div>
    );
}
