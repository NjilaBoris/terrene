"use client";
import "./TopBar.css";
import { Link } from "next-view-transitions";
import Image from "next/image";
import React, { useEffect, useRef } from "react";
import AnimatedButton from "../AnimatedButton/AnimatedButton";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useViewTransition } from "@/hooks/useViewTransition";

gsap.registerPlugin(ScrollTrigger);
const TopBar = () => {
  const topBarRef = useRef(null);
  const { navigateWithTransition } = useViewTransition();
  let lastScrollY = 0;
  let isScrolling = false;
  useEffect(() => {
    const topBar = topBarRef.current;
    if (!topBar) return;

    const topBarHeight = topBar.offsetHeight;

    gsap.set(topBar, { y: 0 });

    const handleScroll = () => {
      if (isScrolling) return;

      isScrolling = true;
      const currentScrollY = window.scrollY;
      const direction = currentScrollY > lastScrollY ? 1 : -1;

      if (direction === 1 && currentScrollY > 50) {
        gsap.to(topBar, {
          y: -topBarHeight,
          duration: 1,
          ease: "power4.out",
        });
      } else if (direction === -1) {
        gsap.to(topBar, {
          y: 0,
          duration: 1,
          ease: "power4.out",
        });
      }

      lastScrollY = currentScrollY;

      setTimeout(() => {
        isScrolling = false;
      }, 100);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);
  useEffect(() => {
    if (topBarRef.current) {
      gsap.set(topBarRef.current, { y: 0 });
    }
  });

  return (
    <div
      className="top-bar fixed w-screen flex justify-between items-center z-10 px-8 py-4 left-0 top-0"
      ref={topBarRef}
    >
      <div className="top-bar-logo w-8">
        <Link
          href="/"
          onClick={(e) => {
            e.preventDefault();
            navigateWithTransition("/");
          }}
        >
          <Image
            height={200}
            width={200}
            src="/logos/terrene-logo-symbol.png"
            alt="logo"
          />
        </Link>
      </div>
      <div className="top-bar-cta max-[1000px]:px-6 max-[1000px]:py-2">
        <AnimatedButton label="Reserve" route="/connect" animate={false} />
      </div>
    </div>
  );
};

export default TopBar;
