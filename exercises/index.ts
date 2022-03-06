const express = require("express");
const app = express();
import { calculateBmi } from "./bmiCalculator";
import { Result, calculateExercises } from "./exerciseCalculator";
import bodyParser from "body-parser";

app.use(bodyParser.json());

app.get("/hello", (_req: never, res: { send: (arg0: string) => void }) => {
  res.send("Hello Full Stack!");
});

app.get(
  "/bmi",
  (
    req: { query: { weight: string; height: string } },
    res: {
      send: (
        arg0:
          | { weight: number; height: number; bmi: string }
          | { error: string }
      ) => void;
    }
  ) => {
    let { height, weight } = req.query;
    if (isNaN(Number(height)) || isNaN(Number(weight))) {
      return res.send({ error: "malformatted parameters" });
    }
    const w = Number(weight);
    const h = Number(height);
    res.send({
      weight: w,
      height: h,
      bmi: calculateBmi(h, w),
    });
  }
);

app.post(
  "/exercises",
  (
    req: { body: { daily_exercises: any; target: any } },
    res: {
      send: (arg0: Result | { error: string }) => void;
    }
  ) => {
    let { daily_exercises, target } = req.body;
    if (!daily_exercises || !target) {
      res.send({
        error: "parameters missing",
      });
    }
    if (
      !Array.isArray(daily_exercises) ||
      !daily_exercises.every((x) => !isNaN(Number(x)))
    ) {
      res.send({
        error: "malformatted parameters",
      });
    }
    res.send(calculateExercises(daily_exercises, target));
  }
);

const PORT = 3003;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
