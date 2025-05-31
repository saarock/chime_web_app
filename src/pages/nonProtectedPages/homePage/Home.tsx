import {  FeatureSection, HowItWorks } from "../../../components";
import HeroSection from "../../../components/HeroSection/HeroSection";
import "../../../styles/pages/Home.css";

const Home = () => {
  return (
    <>
      <HeroSection />
      <FeatureSection />
      <HowItWorks />
    </>
  );
};

export default Home;
