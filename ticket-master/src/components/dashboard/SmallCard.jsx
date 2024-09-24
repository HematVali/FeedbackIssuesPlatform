function SmallCard({ icon, title = "no title", value = "0" }) {
    return (
        <div className="flex flex-col justify-center items-center gap-2 min-w-[20%]">
            <div>{icon}</div>
            <h2 className="card-title text-5xl font-bold text-primary text-center self-center">{value}</h2>
            <p className="mt-6 text-xl font-semibold text-center text-gray-800 text-nowrap">{title}</p>
        </div>
    );
}

export default SmallCard;