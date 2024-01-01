import React from 'react'

function SideButton({ click, text }) {
    return (
        <button onClick={click} className=' w-56 py-1 border border-t-0 border-yellow-300 hover:bg-[#002c41]'>{text}</button>
    )
}

export default SideButton