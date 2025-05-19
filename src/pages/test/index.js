// import React, { useState } from 'react';
// import Input from '@/components/common/Input';

// const Test = () => {

//     const initial_data = {
//         name: 'src',
//         isOpen: true,
//         files: [
//             {
//                 name: 'tailwind.config.css'
//             },
//             {
//                 name: 'components',
//                 isOpen: true,
//                 files: [
//                     {
//                         name: 'common',
//                         isOpen: true,
//                         files: [
//                             {
//                                 name: 'Input.jsx'
//                             },
//                         ]
//                     },
//                     {
//                         name: 'module',
//                         isOpen: true,
//                         files: [
//                             {
//                                 name: 'TestModule.jsx'
//                             },
//                         ]
//                     },
//                 ]
//             }
//         ]
//     }

//     const [params, setParams] = useState({
//         file_name: ""
//     })

//     const handleChange = (e) => {
//         let { name, value } = e.target
//         setParams({
//             ...params,
//             [name]: value
//         })
//     }

//     return (
//         <div className='flex flex-col w-full lg:gap-6 gap-4 lg:p-10 p-4'>

//             <div className='bg-cyan-600 w-full p-3'>

//                 <p className='lg:text-lg text-base font-medium text-white'>File Structure</p>

//             </div>

//             <form className='flex flex-col w-full gap-2'>
//                 <Input
//                     required
//                     name="file_name"
//                     value={params?.file_name}
//                     handleChange={handleChange}
//                     label="Enter text"
//                     width="w-96"
//                 />

//                 <ul>
//                     <li>
//                         <button>
//                             {initial_data?.name} {initial_data?.isOpen ? '[+]' : '[-]'}
//                         </button>

//                         <ul>
//                             {
//                                 initial_data?.files?.map((item, index) => (
//                                     <li>
//                                         <button>
//                                             {item?.name} {item?.isOpen ? '[+]' : '[-]'}
//                                         </button>

//                                         <ul className='flex flex-col'>
//                                             {
//                                                 item?.files?.map(child => (
//                                                     <button>
//                                                         {child?.name} {child?.isOpen ? '[+]' : '[-]'}
//                                                     </button>
//                                                 ))
//                                             }

//                                             {/* add file or folder */}
//                                             {
//                                                 item?.files?.length ?
//                                                     <li>
//                                                         <button>
//                                                             +
//                                                         </button>
//                                                     </li> : ''
//                                             }

//                                         </ul>

//                                     </li>
//                                 ))
//                             }

//                             {/* add file or folder */}
//                             {
//                                 initial_data?.files?.length ?
//                                     <li>
//                                         <button>
//                                             +
//                                         </button>
//                                     </li>
//                                     : ''
//                             }

//                         </ul>


//                     </li>

//                     {/* add file or folder */}
//                     <li>
//                         <button>
//                             +
//                         </button>
//                     </li>

//                 </ul>
//             </form>

//         </div>
//     )
// }

// export default Test

import React, { useState } from 'react';
import Input from '@/components/common/Input';
import { showToastMessage } from '@/utils/toast';

const Test = () => {
    const [params, setParams] = useState({
        file_name: ""
    });

    const [tree, setTree] = useState({
        name: 'src',
        isOpen: true,
        files: [
            {
                name: 'tailwind.config.css'
            },
            {
                name: 'components',
                isOpen: true,
                files: [
                    {
                        name: 'common',
                        isOpen: true,
                        files: [
                            { name: 'Input.jsx' },
                        ]
                    },
                    {
                        name: 'module',
                        isOpen: true,
                        files: [
                            { name: 'TestModule.jsx' },
                        ]
                    },
                ]
            }
        ]
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setParams({ ...params, [name]: value });
    };

    const addToTree = (path, isFolder = false) => {
        if (params?.file_name) {
            const newTree = structuredClone(tree);

            const traverse = (node, currentPath) => {
                if (currentPath.length === 0) {
                    if (!node.files) node.files = [];
                    node.files.push(
                        isFolder
                            ? { name: params.file_name, isOpen: true, files: [] }
                            : { name: params.file_name }
                    );
                    return;
                }

                const [next, ...rest] = currentPath;
                const child = node.files.find(item => item.name === next);
                if (child) traverse(child, rest);
            };

            traverse(newTree, path);
            setTree(newTree);
            setParams({ file_name: '' }); // Clear input
        }
        else {
            showToastMessage('Please enter a valid file name', 'error')
            return
        }
    };

    const toggleIsOpen = (path) => {
        const newTree = structuredClone(tree);

        const traverse = (node, currentPath) => {
            if (currentPath.length === 0) {
                if (node.files) {
                    node.isOpen = !node.isOpen;
                }
                return;
            }

            const [next, ...rest] = currentPath;
            const child = node.files.find(item => item.name === next);
            if (child) traverse(child, rest);
        };

        traverse(newTree, path);
        setTree(newTree);
    };

    let clickTimer = null;

    const handleAddClick = (path, isDouble = false) => {
        if (clickTimer) {
            clearTimeout(clickTimer);
            clickTimer = null;
        }

        if (isDouble) {
            addToTree(path, true); // Add folder
        } else {
            clickTimer = setTimeout(() => {
                addToTree(path, false); // Add file
                clickTimer = null;
            }, 200); // 200ms delay before confirming it's not a double-click
        }
    };

    const renderTree = (node, path = []) => {
        return (
            <li key={path.join('/')}>
                <button
                    type="button"
                    onClick={() => node.files && toggleIsOpen(path)}
                    className="text-left"
                >
                    {node.name} {node?.files?.length > 0 ? (node.isOpen ? '[-]' : '[+]') : ''}
                </button>

                {node.files && node.isOpen && (
                    <ul className="pl-4">
                        {node.files.map((item) =>
                            renderTree(item, [...path, item.name])
                        )}
                        <li>
                            <button
                                type="button"
                                // onClick={() => addToTree(path, false)}
                                // onDoubleClick={() => addToTree(path, true)}
                                onClick={() => handleAddClick(path, false)}
                                onDoubleClick={() => handleAddClick(path, true)}
                                className="text-green-600"
                            >
                                +
                            </button>
                        </li>
                    </ul>
                )}
            </li>
        );
    };


    return (
        <div className='flex flex-col w-full lg:gap-6 gap-4 lg:p-10 p-4'>
            <div className='bg-cyan-600 w-full p-3'>
                <p className='lg:text-lg text-base font-medium text-white'>File Structure</p>
            </div>

            <form className='flex flex-col w-full gap-2'>
                <Input
                    required
                    name="file_name"
                    value={params?.file_name}
                    handleChange={handleChange}
                    label="Enter file/folder name"
                    width="w-96"
                />

                <ul>{renderTree(tree)}</ul>
            </form>
        </div>
    );
};

export default Test;
