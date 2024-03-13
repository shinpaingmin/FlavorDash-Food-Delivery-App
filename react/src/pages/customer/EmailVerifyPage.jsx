import { useGetRegenerateEmailVerifyQuery } from "../../services";
import { emailSentImg } from "../../assets/images";

const EmailVerifyPage = () => {

    return (
        <div className="px-8 pt-12 border-t border-t-gray-200 flex flex-col items-center">
            <div className="w-96 h-96 overflow-hidden">
                <img
                    src={emailSentImg}
                    alt="email_sent"
                    className="object-cover w-full h-full"
                />
            </div>
            <h1 className="font-bold text-3xl text-center mb-8">
                Email verification link was sent. Please check out your email.
            </h1>
            <button
                type="button"
                className="px-4 py-2 bg-orange text-white hover:bg-orange/90"
                onClick={useGetRegenerateEmailVerifyQuery}
            >
                Resend email verification
            </button>
        </div>
    );
};

export default EmailVerifyPage;
