import { useEffect, useState } from "react";
import { fetchStreamerByLogin, getRecommendedStreamsForSidebar } from "../../../api/twichApi";

const Sidebar = ({ streams }) => {
    console.log("streams", streams);
    //console.log("access_token",JSON.parse(localStorage?.getItem("access_token")));
    const [userAccess, setUserAccess] = useState(JSON.parse(localStorage?.getItem("userAcess")));

    return (
        <div className="w-60 fixed left-0 top-[7vh] z-20">
            <div className="drawer lg:drawer-open">
                <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />

                <div className="drawer-side">
                    <label htmlFor="my-drawer-2" aria-label="close sidebar" className="drawer-overlay"></label>

                    <ul className="menu bg-base-100 w-60 h-full">
                        <li className="menu-title text-slate-200 text-lg">Pour vous</li>
                        <li className="menu-title  uppercase">Chaînes suivies</li>
                        <li className="mb-1"><a className="active">Item 1</a></li>
                        <li className="mb-1"><a>Item 2</a></li>
                        <li className="mb-1"><a>Item 3</a></li>
                        <li className="menu-title text-slate-200 uppercase mt-2">Chaînes recommandées</li>

                        {streams?.map(stream => async () => {
                            
                            console.log("streamerAvatar", streamerAvatar);
                            return (
                                <li key={stream.id} className="w-full"><a className="flex flex-col items-start gap-0 overflow-hidden text-ellipsis whitespace-nowrap w-full">{stream.user_name}<span className="text-xs">{stream.game_name}</span></a></li>
                            )
                        })}

                    </ul>

                </div>
            </div>
        </div>
    );
};

export default Sidebar;