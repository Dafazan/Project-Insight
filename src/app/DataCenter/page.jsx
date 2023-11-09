'use client'
import React from 'react'
import { useState, useEffect } from "react";
import MobileLayout from "@/components/Layouts/mobile"
import DesktopLayout from "@/components/Layouts/desktop"
import { isMobile } from 'react-device-detect'
import TitleStatusCard from "@/components/cards/TitleStatusCard"
import TitleOnlyCard from "@/components/cards/TitleOnlyCard"
import CardsCanvas from "@/components/Layouts/CardsCanvas"


function DataCenter() {

    return (
        <>
            <CardsCanvas cols={3}>
                <TitleOnlyCard
                    link="/DataCenter/Notes"
                    title='Notes' />
                <TitleOnlyCard
                    link="/DataCenter/Archives"
                    title='Archives' />
                <TitleOnlyCard
                    link="/DataCenter/Tasks"
                    title='Tasks' />
                <TitleOnlyCard
                    link="/DataCenter/Letters"
                    title='Letters' />
                <TitleOnlyCard
                    link="/DataCenter/ImageArchives"
                    title='Image Archives' />
            </CardsCanvas>
        </>
    )
}

export default DataCenter