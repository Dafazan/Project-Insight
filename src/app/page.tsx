'use client'
import Image from 'next/image'
import { Carousel } from 'react-responsive-3d-carousel'

export default function Home() {

  return (
    <>
      <Carousel autoPlay={true} showIndicators={false} arrowsWidth='75' arrowsHoveredColor='rgb(253 224 71)' arrowsDefaultColor='rgb(59 130 246)'>
        <img src="https://cdna.artstation.com/p/assets/images/images/053/505/996/large/dafazan-igc3.jpg?1662385024" alt="example-image-1" />
        <img src="https://cdnb.artstation.com/p/assets/images/images/040/695/721/large/dafazan-mini-city-compnonwm2.jpg?1629640087" alt="example-image-2" />
        <img src="https://cdnb.artstation.com/p/assets/images/images/040/695/679/large/dafazan-wood-clean.jpg?1629639957" alt="example-image-1" />
        <img src="https://cdna.artstation.com/p/assets/images/images/039/968/002/large/dafazan-w-moon-c2.jpg?1627470927" alt="example-image-2" />


      </Carousel>

    </>
  )
}
