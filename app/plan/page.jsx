"use client";
import { speak } from "@/utils/deepgram";
import { downloadFullPlanPDF } from "@/utils/pdfDownload";
import { supabase } from "@/utils/supabase/client";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

function page() {
  const router = useRouter();
  const [state, setState] = useState("workout");
  const [displayPlan, setDisplayPlan] = useState([]);
  const [plan, setPlan] = useState([]);

  useEffect(() => {
    const fetchPlan = async () => {
      try {
        const {
          data: { user },
          error: userError,
        } = await supabase.auth.getUser();

        if (userError || !user) {
          alert("Please log in first");
          router.push("/");
        }

        const { data, error } = await supabase
          .from("workout_plans")
          .select()
          .eq("user_id", user.id)
          .order("created_at", { ascending: false });
        console.log(data);
        if (error) {
          console.log(error);
          return;
        }
        setPlan(data);
        setDisplayPlan(data[0]);
      } catch (error) {
        console.log(error);
      }
    };
    fetchPlan();
  }, []);

  const speakWorkout = async () => {
    try {
      if (state === "workout") {
        const speakableData = JSON.stringify(displayPlan.plan.workout_plan);
        const res = await fetch("/api/generate-para", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            prompt:
              "convert the provided into readable para explaining things dont include any characters other than alphabets." +
              `${speakableData}`,
          }),
        });
        const data = await res.json();
        if (data.success === false) {
          alert(data.message);
          return;
        }
        speak(data.message);
      }
      if (state === "diet") {
        const speakableData = JSON.stringify(displayPlan.plan.diet_plan);
        const res = await fetch("/api/generate-para", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            prompt:
              "convert the provided into readable para explaining things dont include any characters other than alphabets." +
              `${speakableData}`,
          }),
        });
        const data = await res.json();
        if (data.success === false) {
          alert(data.message);
          return;
        }
        speak(data.message);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="min-h-screen min-w-screen flex flex-col p-5 bg-gray-100 ">
      <div className="flex self-center items-center justify-center border p-3 border-dashed border-gray-300 gap-3">
        <h1 className="text-4xl  font-bold">Your Personalised Fitness Plan</h1>
        <img src="/strength.png" className="h-10 w-10" alt="" />
      </div>
      <div className="flex gap-4 self-center">
        <div className="bg-gray-50   mt-5 shadow-md w-fit p-1 pl-2 pr-2 rounded-full border border-gray-200">
          <span className="text-sm text-green-600 font-semibold">
            Goal: <span>{`${displayPlan?.goal}`}</span>
          </span>
        </div>
        <div className="bg-gray-50   mt-5 shadow-md w-fit p-1 pl-2 pr-2 rounded-full border border-gray-200">
          <select
            name="History"
            className="text-blue-500 font-semibold outline-none"
            id="History"
            onChange={(e) => {
              const selected = plan.find(
                (item) => item.created_at === e.target.value
              );
              console.log(selected);
              setDisplayPlan(selected);
            }}
          >
            <option selected disabled>
              History
            </option>
            {plan.map((date) => {
              const dateNew = new Date(date?.created_at);
              return <option value={date.created_at}>{`${dateNew}`}</option>;
            })}
          </select>
        </div>
      </div>

      <div className=" flex m-8 p-5 self-center gap-16 w-full justify-end">
        <div className="w-[60%]  flex gap-10  justify-center  ">
          <div
            onClick={() => {
              setState("workout");
            }}
            className="flex w-[45%] justify-center cursor-pointer items-center gap-1 bg-gradient-to-r from-green-500 via-green-600 to-green-700 p-3 rounded-lg"
          >
            <img
              src="/icons8-workout-48.png"
              className="h-6 w-6"
              alt="workout"
            />
            <span className="text-white font-semibold">Workout Plan</span>
          </div>
          <div
            onClick={() => {
              setState("diet");
            }}
            className="flex w-[40%] justify-center cursor-pointer items-center gap-1 bg-gradient-to-r from-green-500 via-green-600 to-green-700 p-3 rounded-lg"
          >
            <img src="/icons8-diet-48.png" className="h-6 w-6" alt="workout" />
            <span className="text-white font-semibold">Diet Plan</span>
          </div>
          <div
            onClick={() => {
              setState("tips");
            }}
            className="flex w-[40%] justify-center cursor-pointer items-center gap-1 bg-gradient-to-r from-green-500 via-green-600 to-green-700 p-3 rounded-lg"
          >
            <img src="/icons8-tips-48.png" className="h-6 w-6" alt="workout" />
            <span className="text-white font-semibold">Tips</span>
          </div>
        </div>

        <div className="flex items-center w-fit gap-4 ">
          <div className="flex justify-center  rounded-full p-0.5 items-center bg-gradient-to-r from-green-400 via-green-500 to-green-600">
            <button
              onClick={() => {
                downloadFullPlanPDF(displayPlan.plan);
                console.log(displayPlan.plan);
              }}
              className="bg-white p-3 h-fit w-fit font-semibold  rounded-full  "
            >
              Download as PDF
            </button>
          </div>
          {state === "workout" || state === "diet" ? (
            <div
              onClick={() => {
                speakWorkout();
              }}
              className="bg-white shadow-lg h-fit p-4 rounded-full border border-gray-400 cursor-pointer"
            >
              <img src="/icons8-sound-24.png" alt="sound" />
            </div>
          ) : null}
        </div>
      </div>

      {/* workout */}

      {state === "workout" && (
        <div className="grid grid-cols-3 gap-3">
          {displayPlan?.plan?.workout_plan.map((workout) => (
            <div className="bg-white/50 p-8 h-full w-full rounded-xl shadow-sm border border-dashed border-gray-400  backdrop-blur-lg">
              <h1 className="text-3xl leading-7 font-bold">{`${workout.day}`}</h1>
              <span className=" text-gray-500 mb-5">{`${workout.focus}`} </span>
              {workout.exercises.map((ex) => (
                <div className="flex flex-col">
                  <span className="text-lg font-semibold">
                    --{`${ex.name}`}
                  </span>
                  <span className="text-sm mb-3 leading-3 text-gray-500">
                    sets: {`${ex.sets}`} & reps: {`${ex.reps}`}
                  </span>
                </div>
              ))}
            </div>
          ))}
        </div>
      )}

      {/* diet */}
      {state === "diet" && plan != null && (
        <div className="grid gap-5 grid-cols-2 h-full w-full">
          {displayPlan.plan.diet_plan.map((diet, index) => (
            <div
              key={index}
              className="flex p-4 rounded-xl border h-fit w-full border-dashed border-gray-400 flex-col  bg-gradient-to-r from-[#e1eec3] to-[#f05053]"
            >
              <h1 className="font-bold  text-2xl">{`${diet.meal_time}`}</h1>
              {diet.food_item.map((items, index) => (
                <span key={index} className="ml-5 text-sm">
                  -- {`${items}`}
                </span>
              ))}

              <div className="bg-yellow-50/50 mt-5 p-3 flex flex-col justify-center items-center rounded-xl backdrop-blur-xl">
                <h2 className="font-semibold">Benefits/Purpose</h2>
                <span className="text-sm">{`${diet["purpose/benefits"]}`}</span>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* tips */}
      {state === "tips" && (
        <div className="flex flex-col gap-4 justify-center items-center">
          <h1 className="font-bold text-4xl">Tips</h1>
          {displayPlan.plan.tips.map((tip) => (
            <div
              key={tip}
              className="bg-gradient-to-r hover:animate-pulse  shadow-lg border border-gray-400 from-[#bdf4ff] to-[#1c92d2] w-fit rounded-xl"
            >
              <div className="bg-white/20 backdrop-blur-3xl  p-5 rounded-xl">
                <span className="text-sm font-semibold">"{`${tip}`}"</span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default page;
