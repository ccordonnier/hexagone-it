import { useEffect, useState } from "react";
import Avatar from "./ui/Avatar";
import Tag from "./ui/Tag";
import { getStreamInformations } from "../api/twichApi";

const VideoFooter = ({streamer}) => {
    const [channel, setChannel] = useState(null);

    useEffect(() => {
        const getChannel = async () => {
            const data = await getStreamInformations(streamer?.id);
            setChannel(data);
        }
        
        getChannel();
    },[]);
    return (
        <div className="flex flex-row justify-between">
            <div className="flex flex-row">
                <div><Avatar imageUrl={streamer?.profile_image_url} /></div>
                <div className="px-6">
                    <div>
                        <h2 className="text-lg mb-2">{streamer?.display_name}</h2>
                    </div>
                    <div className="mb-1"><p>{streamer?.description}</p></div>
                    <div className="flex flex-row">
                        {channel?.tags.map(tag => <Tag>{tag}</Tag>)}
                    </div>
                </div>
            </div>
            <div className="flex flex-col">
                <div className="flex flex-col justify-end min-w-[10rem]">
                    <p>{channel?.viewer_count ?? 0} viewers</p>
                </div>
            </div>
        </div>
    );
};

export default VideoFooter;