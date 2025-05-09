import React from 'react'

const PrimaryButton = ({ label, width, type = 'button', onClick }) => {
    return (
        <div className={`${width || 'w-full'}`}>
            <button
                onClick={onClick}
                type={type}
                className='w-full p-3 px-5 text-sm rounded tracking-wide bg-cyan-700 text-white'
            >
                {label}
            </button>
        </div>
    )
}

export default PrimaryButton