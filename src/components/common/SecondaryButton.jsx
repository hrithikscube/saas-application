import React from 'react'

const SecondaryButton = ({ label, width, type = 'button', onClick }) => {
    return (
        <div className={`${width || 'w-full'}`}>
            <button
                onClick={onClick}
                type={type}
                className='w-full p-3 px-5 text-sm font-medium rounded tracking-wide bg-transparent border border-[#121212] text-[#121212]'
            >
                {label}
            </button>
        </div>
    )
}

export default SecondaryButton