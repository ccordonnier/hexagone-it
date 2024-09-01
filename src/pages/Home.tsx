import React, { useContext, useEffect, useState } from 'react';
import Navbar from '../components/ui/navigation/Navbar';
import Sidebar from '../components/ui/navigation/Sidebar';
import EmblaCarousel from '../components/ui/emblaCarousel/EmblaCarousel';
import VideosList from '../components/VideosList';
import { getAccessToken } from '../services/authService';
import { fetchLiveStreams } from '../api/twichApi';
import type { Stream } from '../api/twichApi';
import { AuthContext } from '../context/AuthContext';

const Home: React.FC = () => {
    const { authContext, setAuthContext } = useContext(AuthContext);
    const [OAuthToken, setOAuthToken] = useState<string | null>(localStorage.getItem("access_token") ?? null);
    const [streams, setStreams] = useState<Stream[] | null>(JSON.parse(localStorage.getItem("StreamToFeature") as string) ?? null);
    const [streamsYouShouldLike, setStreamsYouShouldLike] = useState<any[]>(JSON.parse(localStorage.getItem("streamsYouShouldLike") as string));
    const [streamsYouShouldLikeToShow, setStreamsYouShouldLikeToShow] = useState<number>(5);
    const [userID, setUserID] = useState<string | null>(localStorage.getItem("userID") ?? "");

    const handleLogin = async () => {
        const token = await getAccessToken();
        localStorage.setItem("access_token", token?.access_token ?? "");
        localStorage.setItem("expires_in", token?.expires_in ?? "");
        setOAuthToken(token?.access_token);
    };

    const getStreams = async () => {
        const streamsFetched = await fetchLiveStreams(15,userID);
        const streamToFeature = streamsFetched.filter((stream, index) => index <5)
        const streamsYouShouldLike = streamsFetched.filter((stream, index) => index >=5)
        localStorage.setItem("StreamToFeature", JSON.stringify(streams));
        localStorage.setItem("streamsYouShouldLike", JSON.stringify(streams));
        setStreams(streamToFeature);
        setStreamsYouShouldLike(streamsYouShouldLike);
    };

    useEffect(() => {
        if (OAuthToken === null) {
            handleLogin();
        }
    }, [OAuthToken]);

    useEffect(() => {
        getStreams();
    }, [authContext]);

    return (
        <>
            <Navbar />
            <main className='flex flex-row'>
                <Sidebar streams={streamsYouShouldLike} />
                <section className="text-white bg-base-300 w-full p-10 lg:ml-60 mt-10">
                    <div className="">
                        <EmblaCarousel slides={streams} options={{ loop: true }} />
                        <h1 className='mb-4'>Chaînes live qui pourraient vous plaire</h1>
                        <VideosList streams={streamsYouShouldLike} streamsToShow={streamsYouShouldLikeToShow} />
                        <div className="divider mb-6"><span onClick={()=>{streamsYouShouldLikeToShow == 5 ? setStreamsYouShouldLikeToShow(10) : setStreamsYouShouldLikeToShow(5)}}>Afficher {streamsYouShouldLikeToShow == 5 ? 'plus' : 'moins'}</span></div>
                        <h1 className='mb-4'>L'été des récompenses sur Twitch</h1>
                        <VideosList streams={streamsYouShouldLike} streamsToShow={streamsYouShouldLikeToShow} />
                        <div className="divider mb-6">Afficher plus</div>
                        <h1 className='mb-4'>Catégories qui pourraient vous plaire</h1>

                    </div>
                </section>
            </main>
        </>
    );
};

export default Home;