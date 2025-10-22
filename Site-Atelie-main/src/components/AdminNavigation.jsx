import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const AdminNavigation = () => {
    const location = useLocation();

    const navItems = [
        { path: '/admin/produtos', label: 'Produtos', icon: '📦' },
        { path: '/admin/agendamentos', label: 'Agendamentos', icon: '📅' },
        { path: '/admin/encomendas', label: 'Encomendas', icon: '🛍️' },

    ];

    return (
        <nav className="bg-white shadow-lg">
            <div className="container mx-auto px-4">
                <div className="flex space-x-8">
                    {navItems.map((item) => (
                        <Link
                            key={item.path}
                            to={item.path}
                            className={`flex items-center px-3 py-4 text-sm font-medium transition-colors ${
                                location.pathname === item.path
                                    ? 'text-blue-600 border-b-2 border-blue-600'
                                    : 'text-gray-500 hover:text-gray-700'
                            }`}
                        >
                            <span className="mr-2">{item.icon}</span>
                            {item.label}
                        </Link>
                    ))}
                </div>
            </div>
        </nav>
    );
};

export default AdminNavigation;