import { NewPatient, Gender } from "./types";

const toPatient = (obj: {
  name: string;
  dateOfBirth: string;
  ssn: string;
  gender: Gender;
  occupation: string;
}): NewPatient => {
  return {
    name: obj.name,
    dateOfBirth: obj.dateOfBirth,
    ssn: obj.ssn,
    gender: obj.gender,
    occupation: obj.occupation,
  };
};

export default toPatient;
