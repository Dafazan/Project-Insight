import React from 'react'

function Moviecard({ title, desc, img }) {
    return (
        <div className="flex relative">
            <div className="bgblur w-full h-40"></div>
            <div className=" flex flex-col h-40 w-full justify-between absolute">
                <div className=" h-3 flex justify-between">
                    <div className=" w-3 h-3 border-t border-s border-blue-500"></div>
                    <div className=""></div>
                    <div className=" w-3 h-3 border-t border-e border-blue-500"></div>
                </div>
                <div className="px-3 flex gap-2 h-full w-full">
                    <div style={{
                        backgroundImage: `url(${img})`,// Set the height of the div
                    }} className=" h-full w-36 border bg-cover bg-center border-blue-500"></div>
                    <div className=" h-full w-full px-2 flex flex-col justify-between">
                        <div>  <p className="text-green-600 font-medium uppercase max-h-12 line-clamp-2">{title}</p>
                            <p className="text-blue-500 line-clamp-4 text-xs">{desc}</p></div>
                        <div className="flex gap-2 text-xs">
                            <button className="bg-blue-500 text-blue-950 font-semibold px-1">SAVE</button>
                            <button className="bg-blue-500 text-blue-950 font-semibold px-1">WTCHLST</button>
                            <button className="bg-blue-500 text-blue-950 font-semibold px-1">OPT</button>
                        </div>
                    </div>
                </div>
                <div className=" h-3 flex justify-between">
                    <div className=" w-3 h-3 border-b border-s border-blue-500"></div>
                    <div className=""></div>
                    <div className=" w-3 h-3 border-b border-e border-blue-500"></div>
                </div>
            </div>
        </div>
    )
}

export default Moviecard