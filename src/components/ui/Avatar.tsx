const Avatar = ({imageUrl}) => {
    return (
        <div className="avatar">
            <div className="w-24 rounded-full">
                <img src={imageUrl}/>
            </div>
        </div>
    );
};

export default Avatar;