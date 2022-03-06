import patientData from "../patients";
import { Patient, NewPatient } from "../types";
import { v1 as uuid } from "uuid";

const getAll = (): Patient[] => {
  return patientData;
};

const create = (obj: NewPatient): Patient => {
  const newObj = { ...obj, id: uuid() };
  patientData.push(newObj);
  return newObj;
};

export default {
  getAll,
  create,
};
