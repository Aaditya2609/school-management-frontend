import React from 'react'
import { NavLink, useLocation } from 'react-router-dom'

function Nav() {
    const location = useLocation();
    return (
        <div className='flex flex-col w-[20%] min-h-[100vh] gap-8 bg-[rgba(0,0,0,0.9)] py-12 px-8 font-bold text-2xl'>
            <NavLink to="/" className={`flex items-center justify-center ${location.pathname === '/'||location.pathname === '/students' ? 'text-[#29b9f0ff]' : ' text-[white]'
                }`}>
                Students
            </NavLink>
            <NavLink to="/teachers" className={`flex items-center justify-center ${location.pathname === '/teachers' ? 'text-[#29b9f0ff]' : 'text-[white]'
                }`}>
                Teachers
            </NavLink>
            <NavLink to="/classes/" className={`flex items-center justify-center ${location.pathname.includes('/classes') ? 'text-[#29b9f0ff]' : ' text-[white]'
                }`}>
                Classes
            </NavLink>
            <NavLink to="/school" className={`flex items-center justify-center ${location.pathname.includes('/school') ? 'text-[#29b9f0ff]' : ' text-[white]'
                }`}>
                School
            </NavLink>
            <NavLink to="/links" className={`flex items-center justify-center ${location.pathname.includes('/links') ? 'text-[#29b9f0ff]' : ' text-[white]'
                }`}>
                Repo Links
            </NavLink>
        </div>

    )
}

export default Nav