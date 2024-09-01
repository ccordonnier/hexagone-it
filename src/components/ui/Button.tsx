import React from 'react';
import { PropsWithChildren } from '../../utils/types';

type buttonType = PropsWithChildren<{
    type: string;
    size?: string;
}>

const Button: React.FC<buttonType> = ({type, size, children} : buttonType) => {
    return (
        <button className={`btn btn-xs btn-${type} ${size ?? "sm:btn-sm md:btn-md lg:btn-lg"}`}>{children}</button>
    );
};

export default Button;