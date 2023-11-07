'use client'
import React from 'react'
import { useState, useEffect } from "react";
import MobileLayout from "@/components/Layouts/mobile"
import DesktopLayout from "@/components/Layouts/desktop"
import { isMobile } from 'react-device-detect'
import TitleStatusCard from "@/components/cards/TitleStatusCard"
import CardsCanvas from "@/components/Layouts/CardsCanvas"

function DataCenterContent() {
    return (
        <>
            <CardsCanvas cols={'4'}>
                <TitleStatusCard status={'private'} />
                <TitleStatusCard status={'public'} />
                <TitleStatusCard status={'private'} />
                <TitleStatusCard status={'public'} />
                <TitleStatusCard status={'private'} />
                <TitleStatusCard status={'public'} />
                <TitleStatusCard status={'private'} />
                <TitleStatusCard status={'private'} />
                <TitleStatusCard status={'private'} />
                <TitleStatusCard status={'private'} />
                <TitleStatusCard status={'private'} />
                <TitleStatusCard status={'private'} />
            </CardsCanvas>
        </>
    )
}

function DataCenter() {
    const [isClient, setIsClient] = useState(false);

    useEffect(() => {
        setIsClient(true);
    }, []);

    return (
        <>
            {isClient && (
                <>
                    {isMobile ? (
                        <MobileLayout>
                            <DataCenterContent />
                        </MobileLayout>
                    ) : (
                        <DesktopLayout>
                            <DataCenterContent />
                        </DesktopLayout>
                    )}
                </>
            )}
        </>
    )
}

export default DataCenter