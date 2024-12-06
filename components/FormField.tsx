import React from "react";

interface FormFieldProps {
    labelName: string;
    placeholder: string;
    inputType?: string;
    value: string;
    handleChange: (e: any) => void;
    isTextArea?: boolean;
}

const FormField = ({
    labelName,
    placeholder,
    inputType,
    value,
    handleChange,
    isTextArea,
}: FormFieldProps) => {
    return (
        <label className="flex-1 w-full flex flex-col">
            {labelName && (
                <span className="font-epilogue font-medium text-[14px] leading-[22px] text-neutral-500 mb-[10px]">
                    {labelName} <span className="text-red-400">*</span>
                </span>
            )}
            {isTextArea ? (
                <textarea
                    required
                    value={value}
                    onChange={handleChange}
                    rows={10}
                    placeholder={placeholder}
                    className="py-[15px] sm:px-[25px] px-[15px] outline-none border-[1px] border-[#3a3a43] bg-transparent text-white text-[14px] placeholder:text-[#4b5264] rounded-[10px] sm:min-w-[300px]"
                />
            ) : (
                <input
                    required
                    value={value}
                    onChange={handleChange}
                    type={inputType}
                    step="0.0001"
                    placeholder={placeholder}
                    className="py-[15px] sm:px-[25px] px-[15px] outline-none border-[1px] border-[#3a3a43] bg-transparent text-white text-[14px] placeholder:text-[#4b5264] rounded-[10px] sm:min-w-[300px]"
                />
            )}
        </label>
    );
};

export default FormField;
