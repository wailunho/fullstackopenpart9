interface CoursePartBase {
  name: string;
  exerciseCount: number;
  type: string;
}

interface CoursePartWithDesc extends CoursePartBase {
  description: string;
}

interface CourseNormalPart extends CoursePartWithDesc {
  type: "normal";
}

interface CourseProjectPart extends CoursePartBase {
  type: "groupProject";
  groupProjectCount: number;
}

interface CourseSubmissionPart extends CoursePartWithDesc {
  type: "submission";
  exerciseSubmissionLink: string;
}

interface CourseRequirementPart extends CoursePartWithDesc {
  type: "special";
  requirements: string[];
}

type CoursePart =
  | CourseNormalPart
  | CourseProjectPart
  | CourseSubmissionPart
  | CourseRequirementPart;

const Header = ({ courseName }: { courseName: string }) => (
  <h1>{courseName}</h1>
);

const assertNever = (value: never): never => {
  throw new Error(
    `Unhandled discriminated union member: ${JSON.stringify(value)}`
  );
};

const Part = ({ coursePart }: { coursePart: CoursePart }) => {
  switch (coursePart.type) {
    case "normal":
      return (
        <p>
          {coursePart.name} {coursePart.exerciseCount} {coursePart.description}
        </p>
      );
    case "groupProject":
      return (
        <p>
          {coursePart.name} {coursePart.exerciseCount}{" "}
          {coursePart.groupProjectCount}
        </p>
      );
    case "submission":
      return (
        <p>
          {coursePart.name} {coursePart.exerciseCount} {coursePart.description}{" "}
          {coursePart.exerciseSubmissionLink}
        </p>
      );
    case "special":
      return (
        <p>
          {coursePart.name} {coursePart.exerciseCount} {coursePart.description}{" "}
          {coursePart.requirements}
        </p>
      );
    default:
      return assertNever(coursePart);
  }
};

const Content = ({ courseParts }: { courseParts: CoursePart[] }) => (
  <>
    {courseParts.map((x) => (
      <Part key={x.name} coursePart={x} />
    ))}
  </>
);

const Total = ({ courseParts }: { courseParts: CoursePart[] }) => (
  <p>
    Number of exercises{" "}
    {courseParts.reduce((carry, part) => carry + part.exerciseCount, 0)}
  </p>
);

const App = () => {
  const courseName = "Half Stack application development";
  const courseParts: CoursePart[] = [
    {
      name: "Fundamentals",
      exerciseCount: 10,
      description: "This is the leisured course part",
      type: "normal",
    },
    {
      name: "Advanced",
      exerciseCount: 7,
      description: "This is the harded course part",
      type: "normal",
    },
    {
      name: "Using props to pass data",
      exerciseCount: 7,
      groupProjectCount: 3,
      type: "groupProject",
    },
    {
      name: "Deeper type usage",
      exerciseCount: 14,
      description: "Confusing description",
      exerciseSubmissionLink: "https://fake-exercise-submit.made-up-url.dev",
      type: "submission",
    },
    {
      name: "Backend development",
      exerciseCount: 21,
      description: "Typing the backend",
      requirements: ["nodejs", "jest"],
      type: "special",
    },
  ];

  return (
    <div>
      <Header courseName={courseName} />
      <Content courseParts={courseParts} />
      <Total courseParts={courseParts} />
    </div>
  );
};

export default App;
