"use client";
import { useViewTransition } from "@/hooks/useViewTransition";
import gsap from "gsap";
import CustomEase from "gsap/CustomEase";
import { useLenis } from "lenis/react";
import SplitText from "gsap/SplitText";
import { useRouter } from "next/navigation";
import React, { useCallback, useEffect, useRef, useState } from "react";
import MenuBtn from "../MenuBtn/MenuBtn";
import Link from "next/link";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(SplitText, CustomEase);
CustomEase.create(
  "hop",
  "M0,0 C0.354,0 0.464,0.133 0.498,0.502 0.532,0.872 0.651,1 1,1"
);
const Nav = () => {
  const [isAnimating, setIsAnimating] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [isNavigating, setIsNavigating] = useState(false);
  const menuRef = useRef(null);
  const isInitializedRef = useRef(false);
  const splitTextRefs = useRef([]);
  const router = useRouter();
  const lenis = useLenis();

  const { navigateWithTransition } = useViewTransition();

  useEffect(() => {
    if (lenis) {
      if (isOpen) {
        lenis.stop();
      } else {
        lenis.start();
      }
    }
  }, [lenis, isOpen]);

  useGSAP(() => {
    if (menuRef.current) {
      const menu = menuRef.current;
      splitTextRefs.current.forEach((split) => {
        if (split.revert) split.revert();
      });
      splitTextRefs.current = [];
      gsap.set(menu, {
        clipPath: "circle(0% at 50% 50%)",
      });
      const h2Elements = menu.querySelectorAll("h2");
      const pElements = menu.querySelectorAll("p");
      h2Elements.forEach((h2) => {
        const split = SplitText.create(h2, {
          type: "lines",
          mask: "lines",
          linesClass: "split-line",
        });

        gsap.set(split.lines, { y: "120%" });

        split.lines.forEach((line) => {
          line.style.pointerEvents = "auto";
        });

        splitTextRefs.current.push(split);
      });
      pElements.forEach((p) => {
        const split = SplitText.create(p, {
          type: "lines",
          mask: "lines",
          linesClass: "split-line",
        });

        gsap.set(split.lines, { y: "120%" });

        split.lines.forEach((line) => {
          line.style.pointerEvents = "auto";
        });

        splitTextRefs.current.push(split);
      });
      isInitializedRef.current = true;
    }
  }, []);
  const animateMenu = useCallback((open) => {
    if (!menuRef.current) {
      return;
    }
    const menu = menuRef.current;
    setIsAnimating(true);
    if (open) {
      document.body.classList.add("menu-open");

      gsap.to(menu, {
        clipPath: "circle(100% at 50% 50%)",
        ease: "power3.out",
        duration: 2,
        onStart: () => {
          menu.style.pointerEvents = "all";
        },
        onStart: () => {
          splitTextRefs.current.forEach((split, index) => {
            gsap.to(split.lines, {
              y: "0%",
              stagger: 0.05,
              delay: 0.35 + index * 0.1,
              duration: 1,
              ease: "power4.out",
            });
          });
        },
        onComplete: () => {
          setIsAnimating(false);
        },
      });
    } else {
      const textTimeline = gsap.timeline({
        onStart: () => {
          gsap.to(menu, {
            clipPath: "circle(0% at 50% 50%)",
            ease: "power3.out",
            duration: 1,
            delay: 0.75,
            onComplete: () => {
              menu.style.pointerEvents = "none";

              splitTextRefs.current.forEach((split) => {
                gsap.set(split.lines, { y: "120%" });
              });

              document.body.classList.remove("menu-open");

              setIsAnimating(false);
              setIsNavigating(false);
            },
          });
        },
      });

      splitTextRefs.current.forEach((split, index) => {
        textTimeline.to(
          split.lines,
          {
            y: "-120%",
            stagger: 0.03,
            delay: index * 0.05,
            duration: 1,
            ease: "power3.out",
          },
          0
        );
      });
    }
  }, []);
  useEffect(() => {
    if (isInitializedRef.current) {
      animateMenu(isOpen);
    }
  }, [isOpen, animateMenu]);
  const toggleMenu = useCallback(() => {
    if (!isAnimating && isInitializedRef.current && !isNavigating) {
      setIsOpen((prevIsOpen) => {
        return !prevIsOpen;
      });
    } else {
    }
  }, [isAnimating, isNavigating]);

  const handleLinkClick =
    ((e, href) => {
      e.preventDefault();

      const currentPath = window.location.pathname;
      if (currentPath === href) {
        if (isOpen) {
          setIsOpen(false);
        }
        return;
      }

      if (isNavigating) return;

      setIsNavigating(true);
      navigateWithTransition(href);
    },
    [isNavigating, router, isOpen, setIsOpen]);

  return (
    <div>
      <MenuBtn isOpen={isOpen} toggleMenu={toggleMenu} />
      <div
        className="menu fixed w-screen h-dvh [clip-path:circle(0%_at_50%_50%)] bg-base-500 overflow-hidden z-100 p-4 left-0 top-0"
        ref={menuRef}
      >
        <div
          className="menu-wrapper relative w-full h-full flex flex-col justify-between gap-8 
        bg-base-450 rounded-4xl"
        >
          <div className="col relative h-full flex flex-3 p-8">
            <div className="links">
              <div className="link">
                <Link href="/" onClick={(e) => handleLinkClick(e, "/")}>
                  <h2>Index</h2>
                </Link>
              </div>
              <div className="link">
                <Link
                  href="/studio"
                  onClick={(e) => handleLinkClick(e, "/studio")}
                >
                  <h2>Studio</h2>
                </Link>
              </div>
              <div className="link">
                <Link
                  href="/spaces"
                  onClick={(e) => handleLinkClick(e, "/spaces")}
                >
                  <h2>Our Spaces</h2>
                </Link>
              </div>
              <div className="link">
                <Link
                  href="/sample-space"
                  onClick={(e) => handleLinkClick(e, "/sample-space")}
                >
                  <h2>One Installation</h2>
                </Link>
              </div>
              <div className="link">
                <Link
                  href="/blueprints"
                  onClick={(e) => handleLinkClick(e, "/blueprints")}
                >
                  <h2>Blueprints</h2>
                </Link>
              </div>
              <div className="link">
                <Link
                  href="/connect"
                  onClick={(e) => handleLinkClick(e, "/connect")}
                >
                  <h2>Connect</h2>
                </Link>
              </div>
            </div>
          </div>
          <div className="relative max-[1000px]:flex-col max-[1000px]:items-start h-full flex flex-2 items-end p-8">
            <div className="socials w-6/12 flex gap-[2em]">
              <div className="flex-1 flex flex-col justify-end gap-8">
                <div className="nth-[1]:text-base-400 nth-[1]:mb-1 text-base-200 menu-commissions">
                  <p>Commissions</p>
                  <p>build@terrene.studio</p>
                  <p>+1 (872) 441‑2086</p>
                </div>
                <div className=" text-base-200 nth-[1]:text-base-400 nth-[1]:mb-1">
                  <p>Studio Address</p>
                  <p>18 Cordova Lane</p>
                  <p>Seattle, WA 98101</p>
                </div>
              </div>
              <div className="flex-1 flex flex-col justify-end gap-8">
                <div className="menu-meta text-base-200 nth-[1]:text-base-400 nth-[1]:mb-1">
                  <p>Social</p>
                  <p>Instagram</p>
                  <p>Are.na</p>
                  <p>LinkedIn</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Nav;
