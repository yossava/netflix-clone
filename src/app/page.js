"use client";

import Header from "@/components/header";
import HeroSection from "@/components/HeroSection";
import LoginModal from "@/components/LoginModal";
import MoviesSection from "@/components/MoviesSection";
import { useState } from "react";

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
      <div className="pt-20">
        <HeroSection />
        <MoviesSection />
      </div>
      <LoginModal isOpen={isLoginModalOpen} onClose={handleCloseModal} />
    </div>
  );
}
