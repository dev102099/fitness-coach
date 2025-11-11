This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.js`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

{/_ workout _/}

      {state === "workout" && (
        <div className="grid grid-cols-3 gap-3">
          {plan[0].plan.workout_plan.map((workout) => (
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
          {plan[0].plan.diet_plan.map((diet, index) => (
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
          {plan[0].plan.tips.map((tip) => (
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
