import React from 'react'

const PrimaryButton = ({ label, width, type = 'button', onClick }) => {
    return (
        <button
            type={type}
            onClick={onClick}
            className={`${width || 'w-full'} p-2.5 px-5 text-sm rounded tracking-wide bg-cyan-700 text-white`}
        >
            {label}
        </button>
    )
}

export default PrimaryButton