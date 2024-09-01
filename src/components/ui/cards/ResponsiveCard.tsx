import React, { useState } from 'react';
import TwitchEmbed from '../../TwitchEmbed';

const ResponsiveCard: React.FC<{ thumbnail: string, userName: string, userLogin: string, game: string, viewers: number, tags: string[] }> = ({ thumbnail, userName, userLogin, game, viewers, tags }) => {
    const thumbnailUrl = thumbnail.replace("{width}", "500").replace("{height}", "400");
    const [play, setPlay] = useState(false);

    return (


        <div className="relative card lg:card-side bg-base-100 shadow-xl h-full">
            { !play && <div className="absolute top-0 left-0 w-2/3 h-full bg-base-100 opacity-0 hover:opacity-40 z-20 transition-all flex items-center justify-center cursor-pointer" onClick={() => setPlay(!play)}><p>PLAY</p></div>}

            <div className="w-2/3 z-10">
                {/* {play ?
                    <TwitchEmbed channelName={userLogin} />
                    :
                    <img className='rounded-l-xl h-full w-full'
                        src={thumbnailUrl}
                        alt={`Stream thumbnail of ${userName}`} />
                } */}
                <img className='rounded-l-xl h-full w-full'
                        src={thumbnailUrl}
                        alt={`Stream thumbnail of ${userName}`} />
            </div>

            <div className="card-body w-1/3">
                <h2 className="card-title">{userName}</h2>
                <span className='text-sm'>{game}</span>
                <span className='text-sm'>{viewers} spectateurs</span>
                <div className='flex flex-wrap gap-1 flex-row'>
                    {tags?.map((tag, index) => (
                        <span key={index} className='badge badge-primary text-xs'>{tag}</span>
                    ))}
                </div>
            </div>
        </div>

    );
};

export default ResponsiveCard;