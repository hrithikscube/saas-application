import React from 'react'

const ModuleLoader = ({ bgColor }) => {
    return (
        <div className={`w-full max-h-[550px] flex flex-col gap-4 ${bgColor || 'bg-[#F9FAFB]'} `}>

            <div className="w-full h-full overflow-y-auto bg-slate-300 rounded animate-pulse flex flex-col lg:p-6 p-4 gap-4">

                {
                    React.Children.toArray(
                        [...Array(10)].map(item => (
                            <div className="h-9 flex-shrink-0 w-full bg-slate-400/50 rounded animate-pulse" />
                        ))
                    )
                }
            </div>

        </div>
    )
}

export default ModuleLoader