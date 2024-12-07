"use client";
import { ethers } from "ethers";
import { BackgroundGradient } from "@/components/ui/background-gradient";
import useContract from "@/hooks/useContract";
import { useEffect, useState } from "react";
import { prepareContractCall } from "thirdweb";
import { useSendTransaction } from "thirdweb/react";
import FormField from "@/components/FormField";
import BrandButton from "@/components/BrandButton";
import Bottom from "@/components/Bottom";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

const CreateContainer = () => {
    const router = useRouter();
    const {
        mutate: sendTransaction,
        isPending,
        isSuccess,
        isError,
    } = useSendTransaction();
    const { contract } = useContract({
        address: process.env.NEXT_PUBLIC_DARATE_CONTRACT_ADDRESS as string,
    });
    const [details, setDetails] = useState({
        title: "",
        name: "",
        description: "",
        category: "Health",
        targetAmount: "",
    });
    const [CampaignType, setCampaignType] = useState<
        "organization" | "campaign"
    >("campaign");
    const [createLoading, setCreateLoading] = useState(false);

    const handleFormFieldChange = (fieldName: any, e: any) => {
        setDetails({ ...details, [fieldName]: e.target.value });
    };

    const handleCampaignType = (e: any) => {
        setDetails({
            title: "",
            name: "",
            description: "",
            category: "Health",
            targetAmount: "",
        });
        setCampaignType(e.target.value);
    };

    const handleCreateCampaign = () => {
        if (CampaignType === "organization") {
            if (details.name === "" || details.description === "") {
                toast.warning("Name and description are required");
                return;
            }
            const name = details.name;
            const description = details.description;
            // console.log(name, description);
            const transaction = prepareContractCall({
                contract,
                method: "function createOrganization(string _name, string _description)",
                params: [name, description],
            });
            setCreateLoading(true);
            sendTransaction(transaction);
        } else if (CampaignType === "campaign") {
            if (Number.isNaN(Number(details.targetAmount))) {
                toast.error("Goal must be a valid number");
                return;
            } else if (
                details.title === "" ||
                details.description === "" ||
                details.category === "" ||
                details.targetAmount === ""
            ) {
                toast.warning("Fill in the required fields");
                return;
            }
            const title = details.title;
            const description = details.description;
            const category = details.category;
            const targetAmount = BigInt(
                Number(ethers.utils.parseEther(details.targetAmount.toString()))
            );
            // console.log(title, description, category, targetAmount);

            const transaction = prepareContractCall({
                contract,
                method: "function createCampaign(string _title, string _description, string _category, uint256 _targetAmount)",
                params: [title, description, category, targetAmount],
            });
            setCreateLoading(true);
            sendTransaction(transaction);
        }
    };

    useEffect(() => {
        if (isSuccess) {
            setDetails({
                title: "",
                name: "",
                description: "",
                category: "Health",
                targetAmount: "",
            });
            setCreateLoading(false);
            toast.success("Campaign created successfully");
            if (CampaignType === "organization") {
                router.push("/organizations");
            } else if (CampaignType === "campaign") {
                router.push("/campaigns");
            }
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isSuccess]);

    useEffect(() => {
        if (isError) {
            setCreateLoading(false);
            toast.error("Something went wrong try again");
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isError]);

    return (
        <div className="mt-[2rem] md:mt-[3rem]">
            <BackgroundGradient className="rounded-[22px] p-[1rem] md:p-[2rem] py-[2rem] bg-zinc-900 text-neutral-300 break-all">
                <div className="flex flex-col gap-[30px]">
                    {/* campaign type */}
                    <div className="flex-1 flex flex-col">
                        <span className="font-medium text-[14px] leading-[22px] text-neutral-500 mb-[10px]">
                            Campaign Type{" "}
                            <span className="text-red-400">*</span> (you can
                            only have one organization campaign, read FAQ to
                            learn more)
                        </span>
                        <select
                            name="Campaign type"
                            className="flex-1 py-[15px] sm:px-[25px] px-[15px] outline-none border-[1px] border-[#3a3a43] bg-transparent text-[#4b5264] text-[14px] placeholder:text-[#4b5264] rounded-[10px] sm:min-w-[300px]"
                            id=""
                            onChange={(e) => handleCampaignType(e)}
                        >
                            <option className="text-black" value="campaign">
                                Campaign
                            </option>
                            <option className="text-black" value="organization">
                                Organization
                            </option>
                        </select>
                    </div>
                    {/* campaign details */}
                    <div className="flex flex-wrap gap-[40px]">
                        {CampaignType === "organization" && (
                            <FormField
                                labelName="Organization Name"
                                placeholder="Coinbase"
                                inputType="text"
                                value={details.name}
                                handleChange={(e) =>
                                    handleFormFieldChange("name", e)
                                }
                            />
                        )}
                        {CampaignType === "campaign" && (
                            <FormField
                                labelName="Campaign Title"
                                placeholder="Write a title for your campaign"
                                inputType="text"
                                value={details.title}
                                handleChange={(e) =>
                                    handleFormFieldChange("title", e)
                                }
                            />
                        )}
                        {CampaignType === "campaign" && (
                            <div className="flex-1 flex flex-col">
                                <span className="font-medium text-[14px] leading-[22px] text-neutral-500 mb-[10px]">
                                    Category{" "}
                                    <span className="text-red-400">*</span>
                                </span>
                                <select
                                    name="Category"
                                    className="flex-1 py-[15px] sm:px-[25px] px-[15px] outline-none border-[1px] border-[#3a3a43] bg-transparent text-[#4b5264] text-[14px] placeholder:text-[#4b5264] rounded-[10px] sm:min-w-[300px]"
                                    id=""
                                    onChange={(e) =>
                                        handleFormFieldChange("category", e)
                                    }
                                >
                                    <option
                                        className="text-black"
                                        value="Health"
                                    >
                                        Health
                                    </option>
                                    <option
                                        className="text-black"
                                        value="Education"
                                    >
                                        Education
                                    </option>
                                    <option
                                        className="text-black"
                                        value="Nature"
                                    >
                                        Nature
                                    </option>
                                    <option className="text-black" value="Tech">
                                        Tech
                                    </option>
                                    <option
                                        className="text-black"
                                        value="Others"
                                    >
                                        Others
                                    </option>
                                </select>
                            </div>
                        )}
                    </div>
                    {/* description */}
                    <FormField
                        labelName="Description"
                        placeholder="Write a description of your campaign or organization"
                        isTextArea
                        value={details.description}
                        handleChange={(e) =>
                            handleFormFieldChange("description", e)
                        }
                    />
                    {/* amount */}
                    {CampaignType === "campaign" && (
                        <div className="">
                            <FormField
                                labelName="Goal"
                                placeholder="1 ETH"
                                inputType="text"
                                value={details.targetAmount}
                                handleChange={(e) =>
                                    handleFormFieldChange("targetAmount", e)
                                }
                            />
                        </div>
                    )}
                    {/* submit button */}
                    <div className="flex justify-center items-center mt-[40px]">
                        <BrandButton
                            btnType="submit"
                            title={`Create ${CampaignType}`}
                            styles="bg-brand text-black"
                            onClick={handleCreateCampaign}
                            loading={createLoading}
                        />
                    </div>
                </div>
            </BackgroundGradient>
            <Bottom />
        </div>
    );
};

export default CreateContainer;
