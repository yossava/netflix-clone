"use client";

import { useState } from "react";
import Header from "@/components/header";
import HeroSection from "@/components/HeroSection";
import MoviesSection from "@/components/MoviesSection";
import FeaturesSection from "@/components/FeaturesSection";
import LoginModal from "@/components/LoginModal";

export default function Home() {
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);

  const handleLoginClick = () => {
    setIsLoginModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsLoginModalOpen(false);
  };

  return (
    <div className="min-h-screen">
      <Header onLoginClick={handleLoginClick} />
      <HeroSection />
      <MoviesSection />
      <FeaturesSection />
      <LoginModal isOpen={isLoginModalOpen} onClose={handleCloseModal} />
    </div>
  );
}
