import{ useEffect, useState } from 'react';
import { fetchLiveStreams } from '../api/twichApi';

const VideosListYouShouldLike = () => {
    const [userID, setUserID] = useState<string>(localStorage.getItem("user_id") as string);
    
    const getStreamsYouShouldLike = async (userID: string) => {
        const streams = await fetchLiveStreams(15, userID);
        const filteredStreams = streams.filter(stream => !excludeStreams.some(exclude => exclude.id === stream.id));
        localStorage.setItem("streamsYouShouldLike", JSON.stringify(streams));
        setStreams(streams);
    };

    useEffect(() => {
        getStreamsYouShouldLike(userID);
    }, []);
    return (
        <div>
            
        </div>
    );
};

export default VideosListYouShouldLike;