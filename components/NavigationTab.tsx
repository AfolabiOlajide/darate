"use client"
import {
    IconHome,
    IconTargetArrow,
    IconWorld,
    IconCirclePlus,
    IconUser,
} from "@tabler/icons-react";
import { FloatingDock } from "./ui/floating-dock";

const NavigationTab = () => {
    const NavigationIconClass =
        "h-full w-full text-neutral-500 dark:text-neutral-300";
    const NavItemColor ="#1EC49E"
    const NavItemActiveColor ="#1EC49E"
    const NavigationLinks = [
        {
            title: "Home",
            icon: <IconHome color={NavItemColor} className={NavigationIconClass} />,
            href: "/",
        },
        {
            title: "Campaigns",
            icon: <IconTargetArrow color={NavItemColor} className={NavigationIconClass} />,
            href: "/campaigns",
        },
        {
            title: "Organizations",
            icon: <IconWorld color={NavItemColor} className={NavigationIconClass} />,
            href: "/organizations",
        },
        {
            title: "Create",
            icon: <IconCirclePlus color={NavItemColor} className={NavigationIconClass} />,
            href: "/create",
        },

        {
            title: "Profile",
            icon: <IconUser color={NavItemColor} className={NavigationIconClass} />,
            href: "/profile",
        },
    ];

    return (
        <div className="w-max fixed bottom-[2rem] left-[50%] -translate-x-[50%]">
            <FloatingDock
                desktopClassName="bg-white/30 backdrop-blur-lg block flex"
                mobileClassName="hidden"
                items={NavigationLinks}
            />
        </div>
    );
};

export default NavigationTab;
