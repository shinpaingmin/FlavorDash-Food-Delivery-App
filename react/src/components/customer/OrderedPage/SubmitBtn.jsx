const SubmitBtn = ({ btnTitle }) => {
    return (
        <button className="px-4 py-2 bg-orange text-white rounded-md w-[60%] hover:bg-orange/95">
            { btnTitle }
        </button>
    );
};

export default SubmitBtn;
