import React from 'react';
import Hero from '../components/Hero';
import TrustedBy from '../components/TrustedBy';
import FeatureGrid from '../components/FeatureGrid';
import AISection from '../components/AISection';
import PlanningSection from '../components/PlanningSection';
import PlanningGrid from '../components/PlanningGrid';

const Home = () => {
    return (
        <>
            <Hero />
            <TrustedBy />
            <FeatureGrid />
            <AISection />
            <PlanningSection />
            <PlanningGrid />
        </>
    );
};

export default Home;
