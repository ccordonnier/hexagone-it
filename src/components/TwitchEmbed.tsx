import React from 'react';

interface TwitchEmbedProps {
  channelName: string;
  autoplay?: boolean;
}

const TwitchEmbed: React.FC<TwitchEmbedProps> = ({ channelName, autoplay = false }) => {
  return (
    <div className='w-full h-full rounded-xl'>
      <iframe  
        className='rounded-tl-xl rounded-bl-xl'
        src={`https://player.twitch.tv/?channel=${channelName}&parent=localhost`}
        height={"100%"}
        width={"100%"}
      ></iframe>
    </div>
  );
};

export default TwitchEmbed;