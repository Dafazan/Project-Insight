import React from 'react'

function classNames(cols) {
    switch (cols) {
        case 1:
            return "md:grid-cols-1";
        case 2:
            return "md:grid-cols-2";
        case 3:
            return "md:grid-cols-3";
        case 4:
            return "md:grid-cols-4";
        case 5:
            return "md:grid-cols-5";
        default:
            return "md:grid-cols-4";
    }
}

function CardsCanvas({ children, cols }) {
    return (
        <>
            <div className={`grid grid-cols-1 ${classNames(cols)} gap-5 w-full py-5 md:px-2 px-5`}>
                {children}
            </div>
        </>
    )
}

export default CardsCanvas