import { useContext, useEffect } from "react";
import { AuthContext } from "../context/AuthContext";

const initTwitchState = () => {
    let twitchState = generateRandomState();
    localStorage.setItem("twitch_state", twitchState);
    return twitchState;
}

const generateRandomState = (length = 32) => {
    const characters = '0123456789abcdef';
    let result = '';
    for (let i = 0; i < length; i++) {
        const randomIndex = Math.floor(Math.random() * characters.length);
        result += characters[randomIndex];
    }
    return result;
}

const getParams = () => {
    const urlToCheck = new URL(window.location.href.replace("#","?"));
    const params = new URLSearchParams(urlToCheck.search);
    return params;
}

type userAcessTokenType = {
    access_token:"", 
    scope: "", 
    token_type:""
}

const TwitchLogginButton = () => {
    const { authContext, setAuthContext } = useContext(AuthContext)
    const clientId = import.meta.env.VITE_REACT_APP_TWITCH_CLIENT_ID;
    const responseType = "token";
    const redirectUri = "http://localhost:5173";
    const scope = "user%3Aread%3Afollows";
    const state = localStorage.getItem("twitch_state") ?? initTwitchState();
    const encodedParameters = `response_type=${responseType}&client_id=${clientId}&redirect_uri=${redirectUri}&scope=${scope}&state=${state}`; 
    const url = `https://id.twitch.tv/oauth2/authorize?${encodedParameters}`;
    const userAcess = {access_token:"", scope: "", token_type:""};

    useEffect(() => {
        const returnedTwitchState = getParams().get("state");
        if (returnedTwitchState && returnedTwitchState === state) {
            if( getParams().get("access_token") ) userAcess.access_token = getParams().get("access_token") ?? "";
            if( getParams().get("scope") ) userAcess.scope = getParams().get("scope") ?? "";
            if( getParams().get("token_type") ) userAcess.token_type = getParams().get("token_type") ?? "";
            setAuthContext(userAcess);
            localStorage.setItem("userAcess", JSON.stringify(userAcess));
            window.location.href = window.location.origin+window.location.pathname;
        }
    }, []);

    return (
        <>
            <a className="btn btn-primary" href={url}>Se connecter</a>
        </>
    );
};

export default TwitchLogginButton;