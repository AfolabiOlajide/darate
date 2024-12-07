import React from "react";

const SkelentonText = ({ height }: { height: number }) => {
    return (
        <span
            className={`block w-full bg-zinc-800 animate-pulse ml-3 rounded-md`}
            style={{ height: height+"rem" }}
        ></span>
    );
};

export default SkelentonText;
