import React from 'react'
import { useNavigate } from 'react-router-dom'

const NotFound = () => {
    const navigator = useNavigate();
    return (
        <div className='h-screen flex items-center justify-center'>
            <div className='flex flex-col gap-4'>
                <p className='text-3xl font-medium text-gray-700'>The page you are looking for doesn't exist🫣</p>
                <button className='bg-blue-500 text-white font-medium rounded-sm p-2 cursor-pointer hover:bg-[#3F90F5] hover:shadow-2xs' onClick={() => navigator('/')}>CONTINUE TRACKING</button>
            </div>
        </div>
    )
}

export default NotFound