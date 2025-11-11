"use client";
import { safeJsonParse } from "@/utils/cleaning";
import { supabase } from "@/utils/supabase/client";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import GradientSpinner from "./Spinner";

function OptionCard() {
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [width, setWidth] = useState(20);
  const [selected, setSelected] = useState("");
  const [loadingState, setLoading] = useState(false);

  const loading = () => {
    const loadingP = (step / 5) * 100;
    return loadingP;
  };
  const nextStep = () => {
    setStep(step + 1);
  };
  const prevStep = () => {
    setStep(step - 1);
  };

  const [formField, setFormField] = useState({
    name: "",
    age: 0,
    heightFt: 0,
    heightIn: 0,
    gender: "male",
    weight: 0,
    goal: "",
    level: "",
    location: "",
    diet: "",
  });

  const savePlan = async (cleaned) => {
    const {
      data: { user },
      error: userError,
    } = await supabase.auth.getUser();

    if (userError || !user) {
      alert("Please log in first");
      return;
    }

    const { error } = await supabase.from("workout_plans").insert({
      user_id: user.id,
      plan: cleaned,
      name: formField.name,
      goal: formField.goal,
    });

    if (error) console.error(error);
    else alert("Workout plan saved!");
  };

  const handleSubmit = async () => {
    try {
      setLoading(true);
      if (
        formField.name === "" ||
        formField.age < 15 ||
        formField.weight < 2 ||
        formField.heightFt <= 0 ||
        formField.heightIn <= 0 ||
        formField.goal === "" ||
        formField.location === "" ||
        formField.diet === "" ||
        formField.level === ""
      ) {
        alert(
          "Dont leave any empty choice or field and dont put irrelevant data.Check and try again!"
        );
        setLoading(false);
        return;
      }
      const res = await fetch("/api/generate-plan", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: formField.name,
          age: formField.age,
          gender: formField.gender,
          weight: formField.weight,
          heightFt: formField.heightFt,
          heightIn: formField.heightIn,
          goal: formField.goal,
          level: formField.level,
          location: formField.location,
          diet: formField.diet,
        }),
      });
      const data = await res.json();

      if (data.success === false) {
        alert(data.message);
        setLoading(false);
        return;
      }
      const cleaned = safeJsonParse(data.message);
      await savePlan(cleaned);
      setLoading(false);
      router.push("/plan");
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };

  useEffect(() => {
    const width1 = loading();
    setWidth(width1);
  }, [step]);

  return (
    <>
      {/* step 1 */}
      {step === 1 && (
        <div className="flex flex-col bg-white rounded-xl p-10">
          <div className="flex flex-col self-center justify-center items-center">
            <span className="text-gray-500 text-sm">
              Step {`${step}`} out of 5
            </span>
            <div className="bg-gray-100 rounded-full h-[10px] w-[200px]">
              <div
                style={{ width: `${width}%` }}
                className="bg-green-400 rounded-full h-[10px] transition-all duration-300"
              ></div>
            </div>
          </div>
          <h1 className="font-bold text-3xl mt-10 mb-10">
            Tell us about yourself
          </h1>
          <div className="flex flex-col gap-4">
            <div className="flex gap-3 items-center">
              <span className="font-semibold text-lg">Name</span>
              <input
                type="Text"
                placeholder="Enter your name"
                onChange={(e) =>
                  setFormField({ ...formField, name: e.target.value })
                }
                className="border border-gray-300 h-14 w-full text-center rounded-lg"
              />
            </div>
            <div className="flex gap-3 items-center">
              <span className="font-semibold text-lg">Height</span>
              <input
                type="number"
                placeholder="fts"
                onChange={(e) =>
                  setFormField({
                    ...formField,
                    heightFt: Number(e.target.value),
                  })
                }
                className="border border-gray-300 h-14 w-15 text-center rounded-lg"
              />
              <input
                type="number"
                placeholder="inches"
                onChange={(e) =>
                  setFormField({
                    ...formField,
                    heightIn: Number(e.target.value),
                  })
                }
                className="border border-gray-300 h-14 w-15 text-center rounded-lg"
              />
            </div>
            <div className="flex gap-3 items-center">
              <span className="font-semibold text-lg">Weight</span>
              <input
                type="number"
                placeholder="Weight in kgs"
                onChange={(e) =>
                  setFormField({ ...formField, weight: Number(e.target.value) })
                }
                className="border border-gray-300 h-14 w-full text-center rounded-lg"
              />
            </div>

            <div className="flex gap-3 items-center">
              <span className="font-semibold text-lg">Age</span>
              <input
                type="number"
                max={100}
                onChange={(e) =>
                  setFormField({ ...formField, age: Number(e.target.value) })
                }
                className="border border-gray-300 h-14 w-full text-center rounded-lg"
              />
            </div>
            <div className="flex gap-3 items-center">
              <span className="font-semibold text-lg">Gender</span>
              <select
                className="border border-gray-300 h-14 w-full rounded-lg"
                onChange={(e) =>
                  setFormField({ ...formField, gender: e.target.value })
                }
              >
                <option value="male">Male</option>
                <option value="female">Female</option>
              </select>
            </div>
          </div>
          <div className="flex justify-between mt-8">
            {step > 1 && (
              <button
                onClick={prevStep}
                className="rounded-lg w-[30%] bg-slate-200 p-4"
              >
                <span className="text-gray-500 font-semibold">Back</span>
              </button>
            )}

            <button
              onClick={nextStep}
              className="p-3 bg-gradient-to-r w-[30%] from-green-500 to-green-600 rounded-lg"
            >
              <span className="text-lg font-semibold text-white">Next</span>
            </button>
          </div>
        </div>
      )}

      {/* step 2 */}
      {step === 2 && (
        <div className="flex flex-col bg-white rounded-xl p-10">
          <div className="flex flex-col self-center justify-center items-center">
            <span className="text-gray-500 text-sm">
              Step {`${step}`} out of 5
            </span>
            <div className="bg-gray-100 rounded-full h-[10px] w-[200px]">
              <div
                style={{ width: `${width}%` }}
                className="bg-green-400 rounded-full h-[10px] transition-all duration-300"
              ></div>
            </div>
          </div>
          <h1 className="font-bold text-3xl mt-10 mb-10">
            What is your fitness goal?
          </h1>
          <div className="flex flex-col gap-5">
            <div className="flex justify-between gap-5">
              <div
                onClick={(e) => {
                  setFormField({ ...formField, goal: "weight loss" });
                  setSelected("weigthLoss");
                }}
                className={`flex cursor-pointer hover:border-green-500 flex-col w-full p-4 items-center rounded-2xl border-2 gap-2 ${
                  selected === "weigthLoss"
                    ? "border-green-500"
                    : "border-gray-300"
                }`}
              >
                <img src="/flame.png" className="h-10 w-10" alt="Flame" />
                <span className="font-semibold">Weight Loss</span>
              </div>

              <div
                onClick={(e) => {
                  setFormField({ ...formField, goal: "muscle gain" });
                  setSelected("muscleGain");
                }}
                className={`flex cursor-pointer hover:border-green-500 flex-col w-full p-4 items-center rounded-2xl border-2 gap-2 ${
                  selected === "muscleGain"
                    ? "border-green-500"
                    : "border-gray-300"
                }`}
              >
                <img src="/strength.png" className="h-10 w-10" alt="Flame" />
                <span className="font-semibold">Muscle Gain</span>
              </div>
            </div>
            <div className="flex justify-between gap-5">
              <div
                onClick={(e) => {
                  setFormField({ ...formField, goal: "general fitness" });
                  setSelected("generalFitness");
                }}
                className={`flex cursor-pointer hover:border-green-500 flex-col w-full p-4 items-center rounded-2xl border-2 gap-2 ${
                  selected === "generalFitness"
                    ? "border-green-500"
                    : "border-gray-300"
                }`}
              >
                <img src="/running.png" className="h-10 w-10" alt="Flame" />
                <span className="font-semibold">General Fitness</span>
              </div>

              <div
                onClick={(e) => {
                  setFormField({ ...formField, goal: "mind and body" });
                  setSelected("mind");
                }}
                className={`flex cursor-pointer hover:border-green-500 flex-col w-full p-4 items-center rounded-2xl border-2 gap-2 ${
                  selected === "mind" ? "border-green-500" : "border-gray-300"
                }`}
              >
                <img src="/lotus.png" className="h-10 w-10" alt="Flame" />
                <span className="font-semibold">Mind & Body</span>
              </div>
            </div>
          </div>

          <div className="flex justify-between mt-8">
            {step > 1 && (
              <button
                onClick={prevStep}
                className="rounded-lg w-[30%] bg-slate-200 p-4"
              >
                <span className="text-gray-500 font-semibold">Back</span>
              </button>
            )}
            <button
              onClick={nextStep}
              className="p-3 bg-gradient-to-r w-[30%] from-green-500 to-green-600 rounded-lg"
            >
              <span className="text-lg font-semibold text-white">Next</span>
            </button>
          </div>
        </div>
      )}

      {/* step 3 */}
      {step === 3 && (
        <div className="flex flex-col bg-white rounded-xl p-10">
          <div className="flex flex-col self-center justify-center items-center">
            <span className="text-gray-500 text-sm">
              Step {`${step}`} out of 5
            </span>
            <div className="bg-gray-100 rounded-full h-[10px] w-[200px]">
              <div
                style={{ width: `${width}%` }}
                className="bg-green-400 rounded-full h-[10px] transition-all duration-300"
              ></div>
            </div>
          </div>
          <h1 className="font-bold text-3xl mt-10 mb-10">
            What is your current fitness level?
          </h1>
          <div className="flex flex-col gap-5">
            <div className="flex justify-between gap-5">
              <div
                onClick={(e) => {
                  setFormField({ ...formField, level: "beginner" });
                  setSelected("begin");
                }}
                className={`flex cursor-pointer hover:border-green-500 flex-col w-full p-4 items-center rounded-2xl border-2 gap-2 ${
                  selected === "begin" ? "border-green-500" : "border-gray-300"
                }`}
              >
                <img src="/newbie.png" className="h-10 w-10" alt="Flame" />
                <span className="font-semibold">Beginner</span>
              </div>

              <div
                onClick={(e) => {
                  setFormField({ ...formField, level: "intermediate" });
                  setSelected("inter");
                }}
                className={`flex cursor-pointer hover:border-green-500 flex-col w-full p-4 items-center rounded-2xl border-2 gap-2 ${
                  selected === "inter" ? "border-green-500" : "border-gray-300"
                }`}
              >
                <img src="/in-between.png" className="h-10 w-10" alt="Flame" />
                <span className="font-semibold">Intermediate</span>
              </div>
            </div>
            <div
              className="flex justify-between gap-5"
              onClick={(e) => {
                setFormField({ ...formField, level: "advanced" });
                setSelected("advanced");
              }}
            >
              <div
                className={`flex cursor-pointer hover:border-green-500 flex-col w-full p-4 items-center rounded-2xl border-2 gap-2 ${
                  selected === "advanced"
                    ? "border-green-500"
                    : "border-gray-300"
                }`}
              >
                <img src="/crown.png" className="h-10 w-10" alt="Flame" />
                <span className="font-semibold">Advanced</span>
              </div>
            </div>
          </div>

          <div className="flex justify-between mt-8">
            {step > 1 && (
              <button
                onClick={prevStep}
                className="rounded-lg w-[30%] bg-slate-200 p-4"
              >
                <span className="text-gray-500 font-semibold">Back</span>
              </button>
            )}
            <button
              onClick={nextStep}
              className="p-3 bg-gradient-to-r w-[30%] from-green-500 to-green-600 rounded-lg"
            >
              <span className="text-lg font-semibold text-white">Next</span>
            </button>
          </div>
        </div>
      )}

      {/*step 4*/}
      {step === 4 && (
        <div className="flex flex-col shadow-lg bg-white rounded-xl p-10">
          <div className="flex flex-col self-center justify-center items-center">
            <span className="text-gray-500 text-sm">
              Step {`${step}`} out of 5
            </span>
            <div className="bg-gray-100 rounded-full h-[10px] w-[200px]">
              <div
                style={{ width: `${width}%` }}
                className="bg-green-400 rounded-full h-[10px] transition-all duration-300"
              ></div>
            </div>
          </div>
          <h1 className="font-bold text-3xl mt-10 mb-10">
            Preffered Workout Location?
          </h1>
          <div className="flex flex-col gap-5">
            <div className="flex justify-between gap-5">
              <div
                onClick={(e) => {
                  setFormField({ ...formField, location: "home" });
                  setSelected("home");
                }}
                className={`flex cursor-pointer hover:border-green-500 flex-col w-full p-4 items-center rounded-2xl border-2 gap-2 ${
                  selected === "home" ? "border-green-500" : "border-gray-300"
                }`}
              >
                <img src="/house.png" className="h-10 w-10" alt="Flame" />
                <span className="font-semibold">Home</span>
              </div>

              <div
                onClick={(e) => {
                  setFormField({ ...formField, location: "gym" });
                  setSelected("gym");
                }}
                className={`flex cursor-pointer hover:border-green-500 flex-col w-full p-4 items-center rounded-2xl border-2 gap-2 ${
                  selected === "gym" ? "border-green-500" : "border-gray-300"
                }`}
              >
                <img src="/gym.png" className="h-10 w-10" alt="Flame" />
                <span className="font-semibold">Gym</span>
              </div>
            </div>
            <div className="flex justify-between gap-5">
              <div
                onClick={(e) => {
                  setFormField({ ...formField, location: "outdoors" });
                  setSelected("out");
                }}
                className={`flex cursor-pointer hover:border-green-500 flex-col w-full p-4 items-center rounded-2xl border-2 gap-2 ${
                  selected === "out" ? "border-green-500" : "border-gray-300"
                }`}
              >
                <img src="/outdoors.png" className="h-10 w-10" alt="Flame" />
                <span className="font-semibold">Outdoor</span>
              </div>
            </div>
          </div>

          <div className="flex justify-between mt-8">
            {step > 1 && (
              <button
                onClick={prevStep}
                className="rounded-lg w-[30%] bg-slate-200 p-4"
              >
                <span className="text-gray-500 font-semibold">Back</span>
              </button>
            )}
            <button
              onClick={nextStep}
              className="p-3 bg-gradient-to-r w-[30%] from-green-500 to-green-600 rounded-lg"
            >
              <span className="text-lg font-semibold text-white">Next</span>
            </button>
          </div>
        </div>
      )}

      {/*step 5*/}
      {step === 5 && (
        <div className="flex flex-col shadow-lg bg-white rounded-xl p-10">
          <div className="flex flex-col self-center justify-center items-center">
            <span className="text-gray-500 text-sm">
              Step {`${step}`} out of 5
            </span>
            <div className="bg-gray-100 rounded-full h-[10px] w-[200px]">
              <div
                style={{ width: `${width}%` }}
                className="bg-green-400 rounded-full h-[10px] transition-all duration-300"
              ></div>
            </div>
          </div>
          <h1 className="font-bold text-3xl mt-10 mb-10">
            Dietary Preference?
          </h1>
          <div className="flex flex-col gap-5">
            <div className="flex justify-between gap-5">
              <div
                onClick={(e) => {
                  setFormField({ ...formField, diet: "veg" });
                  setSelected("veg");
                }}
                className={`flex cursor-pointer hover:border-green-500 flex-col w-full p-4 items-center rounded-2xl border-2 gap-2 ${
                  selected === "veg" ? "border-green-500" : "border-gray-300"
                }`}
              >
                <img src="/healthy.png" className="h-10 w-10" alt="Flame" />
                <span className="font-semibold">Veg</span>
              </div>

              <div
                onClick={(e) => {
                  setFormField({ ...formField, diet: "non-veg" });
                  setSelected("nonVeg");
                }}
                className={`flex cursor-pointer hover:border-green-500 flex-col w-full p-4 items-center rounded-2xl border-2 gap-2 ${
                  selected === "nonVeg" ? "border-green-500" : "border-gray-300"
                }`}
              >
                <img src="/no-meat.png" className="h-10 w-10" alt="Flame" />
                <span className="font-semibold">Non-Veg</span>
              </div>
            </div>

            <div className="flex justify-between gap-5">
              <div
                onClick={(e) => {
                  setFormField({ ...formField, diet: "vegan" });
                  setSelected("vegan");
                }}
                className={`flex cursor-pointer hover:border-green-500 flex-col w-full p-4 items-center rounded-2xl border-2 gap-2 ${
                  selected === "vegan" ? "border-green-500" : "border-gray-300"
                }`}
              >
                <img src="/vegan.png" className="h-10 w-10" alt="Flame" />
                <span className="font-semibold">Vegan</span>
              </div>
              <div
                onClick={(e) => {
                  setFormField({ ...formField, diet: "keto" });
                  setSelected("keto");
                }}
                className={`flex cursor-pointer hover:border-green-500 flex-col w-full p-4 items-center rounded-2xl border-2 gap-2 ${
                  selected === "keto" ? "border-green-500" : "border-gray-300"
                }`}
              >
                <img src="/keto.png" className="h-10 w-10" alt="Flame" />
                <span className="font-semibold">Keto</span>
              </div>
            </div>
          </div>

          <div className="flex justify-between mt-8">
            {step > 1 && (
              <button
                onClick={prevStep}
                className="rounded-lg w-[30%] bg-slate-200 p-4"
              >
                <span className="text-gray-500 font-semibold">Back</span>
              </button>
            )}
            <button
              onClick={handleSubmit}
              disabled={loadingState}
              className={`p-3 w-[30%] rounded-lg ${
                loadingState
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-gradient-to-r from-green-500 to-green-600"
              }`}
            >
              <span className="text-lg font-semibold text-white">
                {loadingState ? <GradientSpinner /> : "Submit"}
              </span>
            </button>
          </div>
        </div>
      )}
    </>
  );
}

export default OptionCard;
