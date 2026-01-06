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

                    {/* Core Principles */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
                        <div className="border-l-4 border-blue-500 pl-4 py-3">
                            <h3 className="text-xl font-bold text-gray-900 mb-2">Seamless Integration</h3>
                            <p className="text-gray-600 text-sm">
                                Unified platform connecting all hospital departments for smooth workflow
                            </p>
                        </div>

                        <div className="border-l-4 border-green-500 pl-4 py-3">
                            <h3 className="text-xl font-bold text-gray-900 mb-2">Patient-Centric Design</h3>
                            <p className="text-gray-600 text-sm">
                                Focus on enhancing patient experience and care quality
                            </p>
                        </div>

                        <div className="border-l-4 border-purple-500 pl-4 py-3">
                            <h3 className="text-xl font-bold text-gray-900 mb-2">Data-Driven Decisions</h3>
                            <p className="text-gray-600 text-sm">
                                Real-time analytics for informed healthcare management
                            </p>
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
                </div>
            </footer>
        </div>
    );
}