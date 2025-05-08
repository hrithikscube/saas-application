import React from 'react'

const Input = ({ name, value, handleChange, label, width, error, type, required }) => {
    return (
        <div className={`${width || 'w-full'}`}>
            <input
                required={required}
                type={type}
                name={name}
                value={value}
                onChange={handleChange}
                placeholder={label}
                className='w-full p-3 outline-none text-sm rounded text-[#121212] border border-[#808080]/50 bg-transparent'
            />

            {error ? <p className='text-xs font-medium text-[#d32f2f]'>{error}</p> : ''}
        </div>
    )
}

export default Input