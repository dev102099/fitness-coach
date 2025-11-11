import { supabase } from "@/utils/supabase/client";
import gsap from "gsap";
import React, { useRef, useState } from "react";
import Spinner from "./Spinner";
import GradientSpinner from "./Spinner";

function Auth({ show, setShow, setIsLoggedIn }) {
  const [hidden, setHidden] = useState(true);
  const [formData, setFormData] = useState({
    name: "",
    password: "",
    email: "",
  });
  const buttonRef = useRef();
  const textRef = useRef();
  const [loading, setLoading] = useState(false);

  const handleSign = async (e) => {
    try {
      setLoading(true);
      if (hidden === true) {
        const { data, error } = await supabase.auth.signInWithPassword({
          email: formData.email,
          password: formData.password,
        });
        if (error) {
          alert(error.message);
          setLoading(false);
        } else {
          console.log("Logged in:", data);
          setLoading(false);
          setShow(true);
          setIsLoggedIn(true);
        }
      } else {
        const { data, error } = await supabase.auth.signUp({
          email: formData.email,
          password: formData.password,
        });
        if (error) {
          alert(error.message);
          setLoading(false);
        } else {
          console.log("Signed up:", data);
          setLoading(false);
        }
      }
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };

  const handleButtonEnter = () => {
    gsap.to(buttonRef.current, {
      duration: 0.7,
      background: "white",
      border: 1,
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
    gsap.to(buttonRef.current, {
      duration: 0.7,
      background: "linear-gradient(to right, #15803d,  #4ade80 , #15803d)",
      border: 1,
    });
    gsap.to(textRef.current, {
      color: "white",
      duration: 0.5,
      ease: "power2.out",
    });
  };
  return (
    <>
      {!show && (
        <div className="bg-white absolute flex top-[25%] left-[40%] justify-center items-center font-custom flex-col p-4 gap-5 w-[40vh] rounded-lg">
          <div className="flex flex-col justify-center items-center">
            <img src="/logo.png" height={70} width={70} alt="Logo" />
            <h1 className="font-semibold text-3xl">
              {!hidden ? "Sign Up" : "Sign In"}
            </h1>
          </div>
          <div className="flex flex-col gap-5 w-full">
            <input
              hidden={hidden}
              type="text"
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
              placeholder="Enter Your Name"
              className="p-3 border border-gray-400 rounded-lg"
            />
            <input
              type="email"
              onChange={(e) =>
                setFormData({ ...formData, email: e.target.value })
              }
              placeholder="Enter Your Email"
              className="p-3 border border-gray-400 rounded-lg"
            />
            <input
              type="password"
              onChange={(e) =>
                setFormData({ ...formData, password: e.target.value })
              }
              placeholder="Enter Your Password"
              className="p-3 border border-gray-400 rounded-lg"
            />
            {console.log(formData)}
            <button
              ref={buttonRef}
              onMouseEnter={handleButtonEnter}
              onMouseLeave={handleButtonLeave}
              onClick={handleSign}
              className="bg-gradient-to-r from-green-700 via-green-400 to-green-700 p-3 text-white font-semibold rounded-xl"
            >
              <span ref={textRef}>
                {loading ? <GradientSpinner /> : hidden ? "Sign In" : "Sign Up"}
              </span>
            </button>
            <span className="text-sm text-gray-500">
              {hidden ? "Don't have an account yet?" : "Already a user?"}
              <span
                onClick={() => setHidden(!hidden)}
                className="font-semibold text-green-600 ml-1 cursor-pointer"
              >
                {hidden ? "Register here" : "Log In"}
              </span>
            </span>
          </div>
        </div>
      )}
    </>
  );
}

export default Auth;
