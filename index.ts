const express = require("express");
const app = express();
import { calculateBmi } from "./bmiCalculator";

app.get("/hello", (_req: any, res: { send: (arg0: string) => void }) => {
  res.send("Hello Full Stack!");
});

app.get(
  "/bmi",
  (
    req: any,
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
    weight = Number(weight);
    height = Number(height);
    res.send({
      weight,
      height,
      bmi: calculateBmi(height, weight),
    });
  }
);

const PORT = 3003;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
