"use client"
import Image from "next/image";
import styles from "./page.module.css";
import Hero from "./landing/components/hero";
import Features from "./landing/components/principal";
import MarketingCampaign from "./landing/components/describe";
import UserStories from "./landing/components/testimonials";
import OurTeam from "./landing/components/team";
import { Box } from "@mui/material";
import { WidthFull } from "@mui/icons-material";
import Info from "./landing/components/info";
import Footer from "./landing/components/Footer";
import FQA from "./landing/components/FQA";
import getColor from '@/themes/colorUtils';
import { useTheme } from '@mui/material';

export default function Home() {
  const theme = useTheme();
  return (
    <Box sx={{ width: '100%', background:getColor(theme,'background')}}>
      <Box id="hero-section">
        <Hero />
      </Box>
      <Box id="features-section">
        <Features />
      </Box>
      <Box id="marketing-section">
        <MarketingCampaign />
      </Box>
      <Box id="info-section">
        <Info />
      </Box>
      <Box id="testimonials-section">
        <UserStories />
      </Box>
      <Box id="faq-section">
        <FQA />
      </Box>
      <Box id="team-section">
        <OurTeam />
      </Box>
      <Box id="footer-section">
        <Footer />
      </Box>
    </Box>
  );
}
