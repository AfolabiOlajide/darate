import React from "react";

const SkelentonText = ({ height }: { height: number }) => {
    return (
        <span className={`block w-full h-[${height}rem] bg-zinc-800 animate-pulse ml-3 rounded-md`}></span>
    );
};

export default SkelentonText;
