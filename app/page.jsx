"use client";

import Auth from "@/components/Auth";
import { supabase } from "@/utils/supabase/client";
import gsap from "gsap";
import { redirect } from "next/navigation";
import React, { useEffect, useRef, useState } from "react";

function page() {
  const underlineRef = useRef();
  const bgRef = useRef();
  const bgRef2 = useRef();
  const textRef = useRef();
  const textRef2 = useRef();
  const divRef = useRef();
  const blurRef = useRef();
  const [isHidden, setIsHidden] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const fetchUser = async () => {
      const {
        data: { user },
        error: userError,
      } = await supabase.auth.getUser();
      if (user) {
        setIsLoggedIn(true);
      }
    };
    fetchUser();
  }, []);

  const handleSignOut = async () => {
    try {
      const { error } = await supabase.auth.signOut();
      if (error) {
        alert(error.message);
      }
    } catch (error) {
      console.log(error);
    }
  };
  const handleBlur = () => {
    gsap.to(blurRef.current, {
      opacity: 1,
      backdropFilter: "blur(8px)",
      duration: 0.35,
      ease: "circ",
    });
  };
  const handleChange2Enter = () => {
    gsap.to(bgRef2.current, {
      border: 1,
      duration: 0.5,
      ease: "none",
    });
    gsap.to(textRef2.current, {
      color: "green",
      duration: 0.5,
      ease: "back.in",
    });
    gsap.to(divRef.current, {
      duration: 0.5,
      background: "white",
      ease: "circ.out",
    });
  };

  const handleChange2Leave = () => {
    gsap.to(bgRef2.current, {
      border: 0,
      duration: 0.5,
      ease: "none",
    });
    gsap.to(textRef2.current, {
      color: "black",
      duration: 1,
      ease: "back.out",
    });
    gsap.to(divRef.current, {
      duration: 0.5,
      background: "linear-gradient(to right, #22c55e, #16a34a, #15803d)",
      ease: "circ.out",
    });
  };

  const handleBgChange = () => {
    gsap.to(bgRef.current, {
      background: "#ffffff",
      border: 1,
      duration: 0.5,
      ease: "back.out",
    });
    gsap.to(textRef.current, {
      backgroundImage: "linear-gradient(to right, #22c55e, #16a34a, #15803d)",
      color: "transparent",
      WebkitBackgroundClip: "text",
      backgroundClip: "text",
      duration: 0.5,
      ease: "power2.out",
    });
  };

  const handleButtonLeave = () => {
    gsap.to(bgRef.current, {
      background: "linear-gradient(to right, #22c55e, #16a34a, #15803d)",
      duration: 0.6,
      ease: "back.out",
    });
    gsap.to(textRef.current, {
      backgroundImage: "none",
      color: "#ffffff",
      duration: 0.6,
      ease: "power2.inOut",
    });
  };

  const handleMouseEnter = () => {
    gsap.to(underlineRef.current, {
      width: "100%",
      duration: 0.3,
      ease: "bounce.out",
    });
  };
  const handleMouseLeave = () => {
    gsap.to(underlineRef.current, {
      width: "0%",
      duration: 0.6,
      ease: "power1.inOut",
    });
  };

  return (
    <>
      <div
        hidden={isHidden}
        ref={blurRef}
        className="h-full w-full absolute  "
      ></div>
      <Auth
        show={isHidden}
        setShow={setIsHidden}
        setIsLoggedIn={setIsLoggedIn}
      />
      <div className="font-custom h-full w-full flex">
        <img
          src="/motivational-text-with-healthy-elements.jpg"
          alt="image"
          className="h-screen w-[50%]"
        />
        <div className="m-10 flex flex-col h-ful w-full">
          {!isLoggedIn && (
            <div className="self-end">
              <span
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
                onClick={() => {
                  setIsHidden(!isHidden);
                  handleBlur();
                }}
                className="self-end cursor-pointer text-xl font-semibold"
              >
                Sign In
              </span>
              <div
                ref={underlineRef}
                className="bg-black self-end h-0.5 w-0"
              ></div>
            </div>
          )}

          {isLoggedIn && (
            <div className="self-end">
              <span
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
                onClick={() => {
                  handleSignOut();
                  setIsLoggedIn(false);
                }}
                className="self-end cursor-pointer text-xl font-semibold"
              >
                Log Out
              </span>
              <div
                ref={underlineRef}
                className="bg-black self-end h-0.5 w-0"
              ></div>
            </div>
          )}

          <span className="font-bold leading-tight mt-[120px] text-[53px]">
            Unlock Your Potential.
          </span>
          <span className="font-bold leading-tight text-[53px]">
            Your AI Powered Fitness & Nutrition Coach
          </span>
          <span className="mt-3  text-gray-500">
            Get personalised workout plans and diet plans, voice guidance, and
            visual exercises -- all crafted by AI.
          </span>
          <div className="flex  justify-center gap-10 mt-20">
            <button
              onMouseEnter={handleBgChange}
              onMouseLeave={handleButtonLeave}
              ref={bgRef}
              onClick={async () => {
                const {
                  data: { user: currentUser },
                  error,
                } = await supabase.auth.getUser();

                if (currentUser) {
                  redirect("/about-you");
                } else {
                  alert("Please sign in first!");
                }
              }}
              className="pt-4 pb-4 pr-12 pl-12 rounded-full text-white text-lg font-bold bg-gradient-to-r from-green-400 via-green-500 to-green-600"
            >
              <span ref={textRef} className="">
                Start Your Journey Now
              </span>
            </button>
            <div
              ref={divRef}
              className="bg-gradient-to-r from-green-300 via-green-400 to-green-500 rounded-full p-0.5"
            >
              <button
                onMouseEnter={handleChange2Enter}
                onMouseLeave={handleChange2Leave}
                ref={bgRef2}
                className="pt-4 pb-4 pr-12 pl-12 text-black bg-white font-bold rounded-full text-lg border-1 border-grad"
              >
                <span ref={textRef2}>Learn More</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default page;
