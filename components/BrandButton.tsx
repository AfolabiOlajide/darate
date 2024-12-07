import React from 'react'

interface BrandButtonProps{
    btnType?: "button" | "submit" | "reset" | undefined,
    title: string,
    styles: string,
    onClick?: () => void,
    loading?: boolean
}

const BrandButton = ({ btnType, title, styles, onClick, loading }: BrandButtonProps) => {
    return (
        <button disabled={loading} type={btnType} className={`${styles} font-epilogue font-semibold text-[16px] leading-[26px] min-h-[52px] px-4 rounded-[10px]`} onClick={onClick}>{title}</button>
    )
}

export default BrandButton