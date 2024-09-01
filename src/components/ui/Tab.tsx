import VideosList from '../VideosList';
const Tab = () => {
    return (

        <div role="tablist" className="tabs tabs-bordered">
            <input type="radio" name="my_tabs_1" role="tab" className="tab" aria-label="Accueil" defaultChecked />
            <div role="tabpanel" className="tab-content p-10">
                <VideosList />
            </div>
            <input type="radio" name="my_tabs_1" role="tab" className="tab" aria-label="Bio" />
            <div role="tabpanel" className="tab-content p-10">Bio</div>
            <input type="radio" name="my_tabs_1" role="tab" className="tab" aria-label="Programme" />
            <div role="tabpanel" className="tab-content p-10">Programme</div>
            <input type="radio" name="my_tabs_1" role="tab" className="tab" aria-label="Vidéos" />
            <div role="tabpanel" className="tab-content p-10">Vidéos</div>
            <input type="radio" name="my_tabs_1" role="tab" className="tab" aria-label="Chat" />
            <div role="tabpanel" className="tab-content p-10">Chat</div>
        </div>
    );
};

export default Tab;