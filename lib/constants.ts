import { defineChain } from "thirdweb/chains";
import { createThirdwebClient } from "thirdweb";

export const APP_TITLE = "Darate";
export const APP_DESCRIPTION =
    "Worldclass Crypto Donation Platform, generosity meets innovation";

export const chainId = defineChain(11155111);
export const client = createThirdwebClient({
    clientId: process.env.NEXT_PUBLIC_DARATE_CLIENT_ID as string,
});

export const DUMMY_DATA = [
    {
        id: 1,
        title: "Community Wellness Program",
        description:
            "Offering mental health support and free therapy sessions.",
        category: "health",
    },
    {
        id: 2,
        title: "Code for Change",
        description:
            "Empowering youth with coding skills to solve local problems.",
        category: "tech",
    },
    {
        id: 3,
        title: "Ocean Cleanup Project",
        description:
            "Removing plastic waste from oceans to restore marine life.",
        category: "nature",
    },
    {
        id: 4,
        title: "Books for All",
        description:
            "Distributing educational materials to underserved communities.",
        category: "education",
    },
    {
        id: 5,
        title: "Access to Clean Water",
        description: "Building wells to provide clean water in remote areas.",
        category: "health",
    },
    {
        id: 6,
        title: "Free School Lunches",
        description:
            "Ensuring every child has access to nutritious meals at school.",
        category: "education",
    },
    {
        id: 7,
        title: "AI for Accessibility",
        description:
            "Developing AI tools to assist individuals with disabilities.",
        category: "tech",
    },
    {
        id: 8,
        title: "Reforest the World",
        description: "Aiming to plant a billion trees by 2030.",
        category: "nature",
    },
    {
        id: 9,
        title: "Scholarship Fundraiser",
        description:
            "Providing scholarships to students from low-income families.",
        category: "education",
    },
    {
        id: 10,
        title: "Free Vaccination Drive",
        description: "Offering free vaccines to prevent major health crises.",
        category: "health",
    },
    {
        id: 11,
        title: "Wildlife Conservation",
        description:
            "Protecting endangered species through habitat preservation.",
        category: "nature",
    },
    {
        id: 12,
        title: "Tech4Good",
        description:
            "Developing apps to improve community health and education.",
        category: "tech",
    },
    {
        id: 13,
        title: "Teacher Training Program",
        description:
            "Equipping teachers with modern techniques for effective education.",
        category: "education",
    },
    {
        id: 14,
        title: "Emergency Medical Aid",
        description: "Rapid response for areas affected by natural disasters.",
        category: "health",
    },
    {
        id: 15,
        title: "Preserve Natural Reserves",
        description:
            "Supporting the conservation of global biodiversity hotspots.",
        category: "nature",
    },
    {
        id: 16,
        title: "Future Innovators",
        description: "Funding research and innovation projects by students.",
        category: "tech",
    },
    {
        id: 17,
        title: "STEM for Girls",
        description:
            "Promoting STEM education for girls in marginalized communities.",
        category: "education",
    },
    {
        id: 18,
        title: "Save the Children Fund",
        description:
            "Providing critical healthcare to underprivileged children worldwide.",
        category: "health",
    },
    {
        id: 19,
        title: "Digital Literacy for All",
        description:
            "Providing digital literacy training to bridge the tech divide.",
        category: "tech",
    },
    {
        id: 20,
        title: "Eco-Friendly Agriculture",
        description: "Encouraging sustainable farming practices.",
        category: "nature",
    },
    {
        id: 21,
        title: "Adult Literacy Campaign",
        description: "Helping adults achieve basic literacy skills.",
        category: "education",
    },
    {
        id: 22,
        title: "Health Awareness Workshops",
        description: "Raising awareness about preventive healthcare measures.",
        category: "health",
    },
    {
        id: 23,
        title: "Blockchain for Transparency",
        description:
            "Using blockchain to ensure fair resource distribution in NGOs.",
        category: "tech",
    },
    {
        id: 24,
        title: "Green Energy Initiative",
        description: "Promoting sustainable energy solutions in rural areas.",
        category: "nature",
    },
    {
        id: 25,
        title: "Rural Health Clinics",
        description: "Setting up mobile clinics in underserved rural areas.",
        category: "health",
    },
];
