import React from 'react'

function SideLink({ click, text, link }) {
    return (

        <button onClick={click} className=' w-56 py-1 border border-t-0 border-yellow-300 hover:bg-[#002c41]'>
            <a href={link}>
                {text}
            </a>
        </button>
    )
}

export default SideLink