"use client";
import "./AnimatedButton.css";
import React, { useRef } from "react";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";
import { useGSAP } from "@gsap/react";
import { useViewTransition } from "@/hooks/useViewTransition";

import { IoMdArrowForward } from "react-icons/io";
import Link from "next/link";

gsap.registerPlugin(SplitText, ScrollTrigger);

const AnimatedButton = ({
  label,
  route,
  animate = true,
  animateOnScroll = true,
  delay = 0,
}) => {
  const { navigateWithTransition } = useViewTransition();
  const buttonRef = useRef(null);
  const circleRef = useRef(null);
  const iconRef = useRef(null);
  const textRef = useRef(null);
  const splitRef = useRef(null);

  const waitForFonts = async () => {
    try {
      await document.fonts.ready;
      const customFonts = ["Manrope"];
      const fontCheckPromises = customFonts.map((fontFamily) => {
        return document.fonts.check(`16px ${fontFamily}`);
      });
      await Promise.all(fontCheckPromises);
      await new Promise((resolve) => setTimeout(resolve, 100));
      return true;
    } catch (error) {
      await new Promise((resolve) => setTimeout(resolve, 200));
      return true;
    }
  };

  useGSAP(
    () => {
      if (!buttonRef.current || !textRef.current) return;

      if (!animate) {
        gsap.set(buttonRef.current, { scale: 1 });
        gsap.set(circleRef.current, { scale: 1, opacity: 1 });
        gsap.set(iconRef.current, { opacity: 1, x: 0 });
        return;
      }

      const initializeAnimation = async () => {
        await waitForFonts();

        const split = SplitText.create(textRef.current, {
          type: "lines",
          mask: "lines",
          linesClass: "line++",
          lineThreshold: 0.1,
        });
        splitRef.current = split;

        gsap.set(buttonRef.current, { scale: 0, transformOrigin: "center" });
        gsap.set(circleRef.current, {
          scale: 0,
          transformOrigin: "center",
          opacity: 0,
        });
        gsap.set(iconRef.current, { opacity: 0, x: -20 });
        gsap.set(split.lines, { y: "100%", opacity: 0 });

        const tl = gsap.timeline({ delay: delay });

        tl.to(buttonRef.current, {
          scale: 1,
          duration: 0.5,
          ease: "back.out(1.7)",
        });

        tl.to(
          circleRef.current,
          {
            scale: 1,
            opacity: 1,
            duration: 0.5,
            ease: "power3.out",
          },
          "+0.25"
        );

        tl.to(
          iconRef.current,
          {
            opacity: 1,
            x: 0,
            duration: 0.5,
            ease: "power3.out",
          },
          "-0.25"
        );

        tl.to(
          split.lines,
          {
            y: "0%",
            opacity: 1,
            duration: 0.8,
            stagger: 0.1,
            ease: "power4.out",
          },
          "-=0.2"
        );

        if (animateOnScroll) {
          ScrollTrigger.create({
            trigger: buttonRef.current,
            start: "top 90%",
            once: true,
            animation: tl,
          });
        }
      };

      initializeAnimation();

      return () => {
        if (splitRef.current) {
          splitRef.current.revert();
        }
      };
    },
    { scope: buttonRef, dependencies: [animate, animateOnScroll, delay] }
  );

  const buttonContent = (
    <>
      <span
        className="circle group-hover:w-full relative block w-12 h-12 text-2xl overflow-hidden transition-[width] duration-500 
      ease-[cubic-bezier(0.65,0,0.076,1)] m-0 rounded-[4rem] scale-0 bg-base-450"
        ref={circleRef}
        aria-hidden="true"
      ></span>
      <div
        className="icon group-hover:translate-x-3 absolute text-base-200 text-2xl translate-x-0 transition-all
       duration-500 ease-[cubic-bezier(0.65,0,0.076,1)] will-change-transform left-[0.95rem] top-[0.775rem]"
        ref={iconRef}
      >
        <IoMdArrowForward />
      </div>
      <span
        className="button-text group-hover:text-base-200 absolute -translate-x-2/4 -translate-y-2/4 text-center
         text-base-500 font-semibold leading-none whitespace-nowrap transition-all duration-500
       ease-[cubic-bezier(0.65,0,0.076,1)] ml-5 mr-0 my-0 left-2/4 top-2/4"
        ref={textRef}
      >
        {label}
      </span>
    </>
  );

  if (route) {
    return (
      <Link
        href={route}
        className="btn group relative inline-block w-48 h-auto text-[0.9rem] backdrop-blur-[10px] 
    cursor-pointer mx-0 my-4 p-[0.15rem] bg-[#f2ede6bf] rounded-[4rem] border-[none] scale-0"
        ref={buttonRef}
        onClick={(e) => {
          e.preventDefault();
          navigateWithTransition(route);
        }}
      >
        {buttonContent}
      </Link>
    );
  }

  return (
    <button
      className="btn group relative inline-block w-48 h-auto text-[0.9rem] backdrop-blur-[10px] 
    cursor-pointer mx-0 my-4 p-[0.15rem] bg-[#f2ede6bf] rounded-[4rem] border-[none] scale-0"
      ref={buttonRef}
    >
      {buttonContent}
    </button>
  );
};

export default AnimatedButton;
