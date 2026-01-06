import React from "react";
import { Link } from "react-router-dom";
import { Calendar, FileText, CreditCard, Smartphone, Play, Apple } from "lucide-react";

export default function Download() {
    return (
        <div className="w-full min-h-screen bg-white text-gray-800 mt-20">

            {/* ---------------- HERO SECTION ---------------- */}
            <div className="bg-gradient-to-r from-blue-900 to-blue-600 py-20 text-center text-white">
                <h1 className="text-4xl font-bold">Download DCM Hospital App</h1>
            </div>

            {/* ---------------- MAIN SECTION ---------------- */}
            <div className="max-w-6xl mx-auto px-6 py-16 grid grid-cols-1 md:grid-cols-2 gap-10 items-center">

                {/* LEFT CONTENT */}
                <div>
                    <h2 className="text-3xl font-semibold mb-4">
                        Manage Your Hospital Faster With DCM App
                    </h2>

                    <p className="text-gray-600 leading-relaxed mb-4">
                        Optimize hospital operations with powerful digital tools. Manage patients,
                        appointments, billing, pharmacy, lab reports, and staff in a single
                        integrated platform.
                    </p>

                    <p className="text-gray-600 leading-relaxed">
                        Seamlessly handle IP/OP management, insurance claims, automated reports,
                        and data-driven dashboards to boost efficiency and hospital growth.
                    </p>

                    {/* Stats */}
                    <div className="grid grid-cols-3 gap-4 mt-8">
                        <div className="border p-6 rounded-xl bg-white text-center shadow">
                            <h3 className="text-3xl font-bold text-blue-600">250+</h3>
                            <p className="text-sm text-gray-600 mt-1">Hospitals</p>
                        </div>

                        <div className="border p-6 rounded-xl bg-white text-center shadow">
                            <h3 className="text-3xl font-bold text-blue-600">24/7</h3>
                            <p className="text-sm text-gray-600 mt-1">Live Support</p>
                        </div>

                        <div className="border p-6 rounded-xl bg-white text-center shadow">
                            <h3 className="text-3xl font-bold text-blue-600">12+</h3>
                            <p className="text-sm text-gray-600 mt-1">Awards</p>
                        </div>
                    </div>
                </div>

                {/* RIGHT — PHONE IMAGE */}
                <div className="flex justify-center">
                    <img
                        src="./assets/images/image.png"
                        alt="DCM Hospital App"
                        className="w-80 drop-shadow-2xl"
                    />
                </div>
            </div>

            {/* ---------------- FOOTER ---------------- */}
            <footer className="bg-slate-800 text-white py-8">
                <div className="max-w-6xl mx-auto px-6">
                    {/* Title */}
                    <div className="text-center mb-10">
                        <h2 className="text-3xl md:text-4xl font-bold mb-4">Download Our App Now</h2>
                        <p className="text-gray-300 max-w-2xl mx-auto text-lg">
                            Access doctor appointments, lab reports, billing, and hospital management tools with our mobile application.
                        </p>
                    </div>

                    {/* Download Buttons */}
                    <div className="flex flex-col sm:flex-row justify-center items-center gap-6 mb-10">

                        {/* Google Play Button */}
                        <Link
                            to="#"
                            className="flex items-center gap-3 bg-black text-white px-6 py-3 rounded-xl shadow-lg hover:bg-gray-900 transition min-w-[190px]"
                        >
                            {/* Google Play Icon (direct PNG) */}
                            <img
                                src="./assets/images/playstore.png"
                                alt="Google Play"
                                className="h-11 w-auto"
                            />
                            <span className="text-lg font-semibold">Google Play</span>
                        </Link>

                        {/* App Store Button */}
                        <Link
                            to="#"
                            className="flex items-center gap-3 bg-black text-white px-6 py-3 rounded-xl shadow-lg hover:bg-gray-900 transition min-w-[190px]"
                        >
                            {/* Apple Icon (PNG) */}
                            <img
                                src="./assets/images/appstore.png"
                                alt="Apple App Store"
                                className="h-11 w-auto"
                            />
                            <span className="text-lg font-semibold">App Store</span>
                        </Link>

                    </div>

                    {/* App Features */}
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-6  max-w-4xl mx-auto">
                        <div className="flex flex-col items-center text-center p-4">
                            <div className="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center mb-3">
                                <Calendar className="w-6 h-6 text-white" />
                            </div>
                            <h3 className="font-bold text-lg mb-2">Appointments</h3>
                            <p className="text-gray-300 text-sm">Book with real-time availability</p>
                        </div>
                        
                        <div className="flex flex-col items-center text-center p-4">
                            <div className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center mb-3">
                                <FileText className="w-6 h-6 text-white" />
                            </div>
                            <h3 className="font-bold text-lg mb-2">Lab Reports</h3>
                            <p className="text-gray-300 text-sm">Access digital reports</p>
                        </div>
                        
                        <div className="flex flex-col items-center text-center p-4">
                            <div className="w-12 h-12 bg-purple-500 rounded-full flex items-center justify-center mb-3">
                                <CreditCard className="w-6 h-6 text-white" />
                            </div>
                            <h3 className="font-bold text-lg mb-2">Payments</h3>
                            <p className="text-gray-300 text-sm">Secure billing & payments</p>
                        </div>

                        <div className="flex flex-col items-center text-center p-4">
                            <div className="w-12 h-12 bg-orange-500 rounded-full flex items-center justify-center mb-3">
                                <Smartphone className="w-6 h-6 text-white" />
                            </div>
                            <h3 className="font-bold text-lg mb-2">Mobile Access</h3>
                            <p className="text-gray-300 text-sm">Full platform on mobile</p>
                        </div>
                    </div>
                </div>
            </footer>
        </div>
    );
}