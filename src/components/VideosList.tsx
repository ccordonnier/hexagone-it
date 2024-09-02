import StandardCard from './ui/cards/StandardCard';
import type { Stream } from '../api/twichApi';

const videos = [1,2,3,4,5];


const VideosList = ({streams, streamsToShow}) => {
    return (
        <div className='grid sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-4 w-full'>
            {streams?.map((stream,index) => {
                return index < streamsToShow && <StandardCard key={index} stream={stream} />
            })}
        </div>
    );
};

export default VideosList;