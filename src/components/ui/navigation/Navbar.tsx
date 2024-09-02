import { useContext } from "react";
import TwitchLogginButton from "../../TwitchLogginButton";
import { AuthContext } from "../../../context/AuthContext";

const Navbar = () => {
    const { authContext, setAuthContext } = useContext(AuthContext);

    const logout = async () => {        
        localStorage.removeItem("userAcess");
        setAuthContext(null);
    }
    
    return (
        <div className="navbar bg-base-200 drop-shadow-md fixed left-0 top-0 h-[7vh] z-30">
            <div className="drawer-content flex flex-col items-center justify-center lg:hidden">
                <label htmlFor="my-drawer-2" className="btn btn-square btn-ghost">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        className="inline-block h-5 w-5 stroke-current">
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M4 6h16M4 12h16M4 18h16"></path>
                    </svg>
                </label>

            </div>
            <div className="flex-1">
                <a className="btn btn-ghost text-xl" href="/">StreamingT</a>
            </div>
            <div className="flex-none gap-2">
                <div className="form-control">
                    <input type="text" placeholder="Search" className="input input-bordered w-24 md:w-auto" />
                </div>
                {authContext?.access_token ?
                    <div className="dropdown dropdown-end">
                        <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
                            <div className="w-10 rounded-full">
                                <img
                                    alt="Tailwind CSS Navbar component"
                                    src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp" />
                            </div>
                        </div>
                        <ul
                            tabIndex={0}
                            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow">
                            <li>
                                <a className="justify-between">
                                    Profile
                                    <span className="badge">New</span>
                                </a>
                            </li>
                            <li><a>Paramètres</a></li>
                            <li><a onClick={()=>logout()}>Déconnexion</a></li>
                        </ul>
                    </div>
                    :
                    <TwitchLogginButton />
                    
                }
            </div>
        </div>
    );
};

export default Navbar;