import React from 'react';
import Hero from '../components/Hero';
import About from '../components/About';
import Objectives from '../components/Objectives';
import Activities from '../components/Activities';

const Home = () => {
    return (
        <div className="overflow-x-hidden">
            <Hero />
            <About />
            <Objectives />
            <Activities />
        </div>
    );
};

export default Home;
