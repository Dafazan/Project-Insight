import React from 'react'

function CardsCanvas({ children, cols }) {
    return (
        <>
            <div className={`grid grid-cols-1 md:grid-cols-${cols} gap-5 w-full py-5 md:px-2 px-5`}>
                {children}
            </div>
        </>
    )
}

export default CardsCanvas