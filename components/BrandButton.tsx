import React from 'react'

interface BrandButtonProps{
    btnType?: "button" | "submit" | "reset" | undefined,
    title: string,
    styles: string,
    onClick?: () => void
}

const BrandButton = ({ btnType, title, styles, onClick }: BrandButtonProps) => {
    return (
        <button type={btnType} className={`${styles} font-epilogue font-semibold text-[16px] leading-[26px] min-h-[52px] px-4 rounded-[10px]`} onClick={onClick}>{title}</button>
    )
}

export default BrandButton