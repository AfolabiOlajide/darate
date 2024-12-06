import React from "react";

const SkelentonLoadingList = ({ withImage }: { withImage?: boolean }) => {
    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-10 md:gap-2">
            {Array.from({ length: 8 }).map((_, index) => {
                return (
                    <div className="skelenton bg-neutral-700 rounded-md flex flex-col gap-[1.5rem] p-[1rem]" key={index}>
                        {withImage && (
                            <div className="flex flex-1 w-full min-h-[8rem] rounded-xl bg-gradient-to-br from-neutral-900 to-neutral-800 animate-pulse"></div>
                        )}
                        <div className="h-[3rem] w-full bg-neutral-800 animate-pulse rounded-md"></div>
                        <div className="h-[6rem] w-full bg-neutral-800 animate-pulse rounded-md"></div>
                    </div>
                );
            })}
        </div>
    );
};

export default SkelentonLoadingList;
