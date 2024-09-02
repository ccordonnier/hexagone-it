const Avatar = ({imageUrl, className="w-24"}) => {
    return (
        <div className="avatar">
            <div className={(className??"") +" rounded-full"}>
                <img src={imageUrl}/>
            </div>
        </div>
    );
};

export default Avatar;