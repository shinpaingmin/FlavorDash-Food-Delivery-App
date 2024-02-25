const TipsBtn = ({ tipAmount }) => {
    return (
        <button
            className="rounded-full p-2 border border-gray-300 hover:bg-orange
                     hover:text-white text-sm focus:bg-orange focus:text-white font-semibold"
        >
            {tipAmount}
        </button>
    );
};

export default TipsBtn;
