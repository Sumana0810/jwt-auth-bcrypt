    import React from "react";
    import { Link } from "react-router-dom";
    export default function Footer() {
    return (
        <footer className="bg-gray-800 text-white mt-auto">
        <div className="container mx-auto px-4 py-8">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
                <h3 className="text-xl font-bold mb-4">CarMarket</h3>
                <p className="text-gray-400">
                Your trusted platform for buying and selling quality used cars.
                </p>
            </div>
            <div>
                <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
                <ul className="space-y-2">
                <li>
                    <Link to="/" className="text-gray-400 hover:text-white">
                    Browse Cars
                    </Link>
                </li>
                <li>
                    <Link to="/add-car" className="text-gray-400 hover:text-white">
                    Sell Your Car
                    </Link>
                </li>
                <li>
                    <Link to="/my-cars" className="text-gray-400 hover:text-white">
                    My Listings
                    </Link>
                </li>
                </ul>
            </div>
            <div>
                <h4 className="text-lg font-semibold mb-4">Support</h4>
                <ul className="space-y-2">
                <li>
                    <a href="#" className="text-gray-400 hover:text-white">
                    Help Center
                    </a>
                </li>
                <li>
                    <a href="#" className="text-gray-400 hover:text-white">
                    Contact Us
                    </a>
                </li>
                <li>
                    <a href="#" className="text-gray-400 hover:text-white">
                    Terms of Service
                    </a>
                </li>
                </ul>
            </div>
            <div>
                <h4 className="text-lg font-semibold mb-4">Connect</h4>
                <ul className="space-y-2">
                <li>
                    <a href="#" className="text-gray-400 hover:text-white">
                    Facebook
                    </a>
                </li>
                <li>
                    <a href="#" className="text-gray-400 hover:text-white">
                    Twitter
                    </a>
                </li>
                <li>
                    <a href="#" className="text-gray-400 hover:text-white">
                    Instagram
                    </a>
                </li>
                </ul>
            </div>
            </div>
            <div className="border-t border-gray-700 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2025 CarMarket. All rights reserved.</p>
            </div>
        </div>
        </footer>
    );
    }