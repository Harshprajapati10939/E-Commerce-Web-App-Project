import React, { useContext } from 'react'

import HeroSection from '../../Components/Herosection/HeroSection'
import Filter from '../../Components/Filter/Filter'
import ProductCard from '../../Components/ProductCard/ProductCard'
import Track from '../../Components/Track/Track'
import Testimonal from '../../Components/Testimonial/Testimonal'
import Layout from '../../Components/Layout/Layout'
// import Aboutus from '../Aboutus/Aboutus'


function Home() {
    
    return (
        <Layout>
            
            <HeroSection />
            <Filter />
            <ProductCard />
            {/* <Aboutus/> */}
            <Track />
            <Testimonal />

        </Layout>
    )
}

export default Home
