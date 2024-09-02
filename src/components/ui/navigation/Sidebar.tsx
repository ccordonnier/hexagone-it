import { useEffect, useState } from "react";
import { getRecommendedChannelsForSidebar, getFollowedChannels, validateToken } from "../../../api/twichApi";
import Avatar from "../Avatar";

const Sidebar = () => {
    const [recommendedChannels, setRecommendedChannels] = useState(null);
    const [FollowedChannels, setFollowedChannels] = useState(null);
    const [userAccess, setUserAccess] = useState(JSON.parse(localStorage?.getItem("userAcess")));

    useEffect(() => {
        const getRecommendedChannels = async () => {
            const channels = await getRecommendedChannelsForSidebar();
            console.log("recommendedChannels", channels);
            setRecommendedChannels(channels);
        }

        const fetchFollowedChannels = async () => {
            const userId = await validateToken(userAccess.access_token);
            const followedChannels = await getFollowedChannels(userId);
            console.log("followedChannels", followedChannels);
            setFollowedChannels(followedChannels);
        }

        getRecommendedChannels();
        
        userAccess && fetchFollowedChannels();
    }, []);



    return (
        <div className="w-60 fixed left-0 top-[7vh] z-20 overflow-y-scroll h-[93vh]">
            <div className="drawer lg:drawer-open overflow-y-scroll w-[39vh]">
                <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />

                <div className="drawer-side">
                    <label htmlFor="my-drawer-2" aria-label="close sidebar" className="drawer-overlay"></label>

                    <ul className="menu bg-base-100 w-60 h-full">
                        <li className="menu-title text-slate-200 text-lg">Pour vous</li>
                        {/* {userAccess && (
                            <>
                                <li className="menu-title  uppercase">Chaînes suivies</li>
                                <li className="mb-1"><a className="active">Item 1</a></li>
                            </>
                        )} */}
                        <li className="menu-title text-slate-200 uppercase mt-2">Chaînes recommandées</li>
                      
                        {recommendedChannels?.map(channel => {
                            return <li key={channel.id} className="w-full">
                                <a href={`/streamer/${channel.login}`} className="flex flex-row items-start gap-0 overflow-hidden text-ellipsis whitespace-nowrap w-full">
                                    <div><Avatar imageUrl={channel.profile_image_url} className="w-10" /></div>
                                    <div className="flex flex-col ml-2 overflow-hidden text-ellipsis whitespace-nowrap">
                                        <p className="overflow-hidden text-ellipsis whitespace-nowrap">{channel.display_name}</p>
                                        <span className="text-xs overflow-hidden text-ellipsis whitespace-nowrap">{channel.game_name}</span>
                                    </div>
                                </a></li>
                        })}

                    </ul>

                </div>
            </div>
        </div>
    );
};

export default Sidebar;