import Tag from "../Tag";

const StandardCard = ({ stream }) => {
    return (
        <div className='flex flex-col'>
            <figure>
                <a href={`/streamer/${stream.user_login}`}>
                    <img className='rounded-t-xl relative hover:translate-x-[5px] hover:translate-y-[-5px] transition-all'
                        src={stream.thumbnail_url.replace("{width}", "500").replace("{height}", "400")}
                        alt="Album" />
                </a>
            </figure>
            <div className='flex flex-row w-full'>
                <div className="flex flex-col"></div>
                <div className="flex flex-col w-full">
                    <div className='flex flex-row w-full mt-2'>
                        <h2 className="font-semibold text-base overflow-hidden text-ellipsis whitespace-nowrap w-full">{stream.title}</h2>
                    </div>
                    <a className="mt-1 text-sm text-red-400 overflow-hidden text-ellipsis whitespace-nowrap" href='#'>{stream.user_name}</a>
                    <a className="mt-1 text-sm text-red-400 overflow-hidden text-ellipsis whitespace-nowrap" href='#'>{stream.game_name}</a>
                    <div>
                        {stream.tags.map((tag, index) => (
                            <Tag key={index}>{tag}</Tag>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default StandardCard;