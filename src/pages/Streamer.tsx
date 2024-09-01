import React, { useEffect, useState } from 'react';
import Navbar from '../components/ui/navigation/Navbar';
import Sidebar from '../components/ui/navigation/Sidebar';
import Tab from '../components/ui/tab';
import Card from '../components/ui/Card';
import VideoFooter from '../components/VideoFooter';
import { fetchStreamerByLogin, getStreamerFollowersCount } from '../api/twichApi';
import { useParams } from 'react-router-dom';
import LineFullSkeleton from '../components/ui/skeleton/LineFullSkeleton';
import LineSkeleton from '../components/ui/skeleton/LineSkeleton';
import TwitchEmbed from '../components/TwitchEmbed';

const Home: React.FC = () => {
    const { login } = useParams();
    const [streamer, setStreamer] = useState<any>(null);
    const [followersCount, setFollowersCount] = useState(0);
    
    useEffect(() => {
        const fetchStreamer = async () => {
            const streamer = await fetchStreamerByLogin(login);
            setStreamer(streamer);
            fetchFollowersCount(streamer.id);
        };

        const fetchFollowersCount = async (streamerId: string) => {
            const streamerFollowersCount = await getStreamerFollowersCount(streamerId);
            setFollowersCount(streamerFollowersCount);
        }

        fetchStreamer();
        
    }, []);

    return (
        <>
            <Navbar />
            <main className='flex flex-row'>
                <Sidebar />
                <section className="text-white bg-base-300 w-full ml-60 mr-96 z-10">
                    <TwitchEmbed channelName={streamer?.login} autoplay={true} />
                    <div className='p-6 bg-base-300'><VideoFooter streamer={streamer} /></div>
                    <div className='p-10 bg-base-300'>
                        <h1 className='mb-4'>{streamer ? `Concernant ${streamer.display_name}` : <LineSkeleton />} </h1>
                        <div className="card bg-base-200 w-full shadow-xl rounded-md">
                            <div className="card-body">
                                <p>{(followersCount/1000).toFixed(1)} k followers</p>
                                <p>{streamer ? streamer.description : <LineFullSkeleton />}</p>
                            </div>
                        </div>
                        {/* <Tab /> */}

                    </div>
                </section>
                {/* <Chat /> */}
                <div className='h-[90vh] w-96 fixed right-0 top-[7vh] z-20 bg-base-100  '></div>
            </main>
        </>
    );
};

export default Home;