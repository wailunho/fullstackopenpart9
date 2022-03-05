interface MultiplyValues2 {
  value1: Array<number>;
  value2: number;
}

const parseArguments2 = (args: Array<string>): MultiplyValues2 => {
  if (args.length < 4) throw new Error("Not enough arguments");

  const [_first, _second, target, ...rest] = args;
  if (!isNaN(Number(target)) && rest.every((x) => !isNaN(Number(x)))) {
    return {
      value1: rest.map((x) => Number(x)),
      value2: Number(target),
    };
  } else {
    throw new Error("Provided values were not numbers!");
  }
};

interface Result {
  periodLength: number;
  trainingDays: number;
  success: boolean;
  rating: number;
  ratingDescription: string;
  target: number;
  average: number;
}

const calculateExercises = (
  dailyExerciseHours: Array<number>,
  target: number
): Result => {
  const periodLength = dailyExerciseHours.length;
  const average = dailyExerciseHours.reduce((p, c) => p + c, 0) / periodLength;
  let rating, ratingDescription;
  const score = average / target;
  if (score < 0.7) {
    rating = 1;
    ratingDescription = "need more work";
  } else if (score < 1) {
    rating = 2;
    ratingDescription = "not bad but could be better";
  } else if (score < 1.5) {
    rating = 3;
    ratingDescription = "good";
  } else {
    rating = 4;
    ratingDescription = "very good";
  }
  return {
    periodLength,
    trainingDays: dailyExerciseHours.filter((x) => 0 < x).length,
    success: target <= average,
    rating,
    ratingDescription,
    target,
    average,
  };
};

try {
  const { value1, value2 } = parseArguments2(process.argv);
  console.log(calculateExercises(value1, value2));
} catch (error: unknown) {
  let errorMessage = "Something bad happened.";
  if (error instanceof Error) {
    errorMessage += " Error: " + error.message;
  }
  console.log(errorMessage);
}
