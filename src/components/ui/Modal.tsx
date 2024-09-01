import React from 'react';

const Modal = ({ openButtonText, openButtonType = "primary", closeButtonText, title, children }: { openButtonText: string, openButtonType?: "primary" | "secondary" | "neutral", closeButtonText?: string, title: string, children: React.ReactNode | string }) => {
    return (
        <div>
            <button className={`btn btn-${openButtonType}`} onClick={(e) => console.log(e.target.parentElement.querySelector("dialog").showModal())}>{openButtonText}</button>
            <dialog className="modal">
                <div className="modal-box">
                    <h3 className="font-bold text-lg">{title}</h3>
                    {children}
                </div>
                <form method="dialog" className="modal-backdrop">
                    <button>close</button>
                </form>
            </dialog>
        </div>
    );
};

export default Modal;