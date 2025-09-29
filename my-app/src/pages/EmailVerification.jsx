import { authService } from "@/api/authService";
import React, { useState } from "react";
import { useAuthStore } from "@/store";
function EmailVerification() {
    const [email, setEmail] = useState("");
    const { emailVerification } = useAuthStore();

    const handleResendVerification = () => {
        emailVerification(email);
    };

    return <div className="w-full h-screen flex flex-col items-center justify-center p-4 bg-gray-50">


        <h1 className="text-2xl font-bold mb-4">Email Verification</h1>
        <p className="mb-4">A verification email has been sent to your email address. Please check your inbox and click on the verification link to verify your email.</p>
        <p className="mb-4">If you did not receive the email, please check your spam folder or click the button below to resend the verification email.</p>
        <div className="flex flex-col gap-1 items-center w-[500px] ">

            <input onChange={(e) => setEmail(e.target.value)} type="text" className="w-full border border-gray-300 rounded-md px-3 py-2 mb-4" placeholder="Enter your email" />
            <button onClick={() => handleResendVerification()} className="w-full px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">Resend Verification Email</button>
        </div>

    </div>;
}

export default EmailVerification;
