import patientData from "../patients";
import { Patient, NewPatient } from "../types";
import { v1 as uuid } from "uuid";

const getAll = (): Patient[] => {
  return patientData;
};

const get = (id: string): Patient | undefined => {
  return patientData.find((x: Patient) => x.id === id);
};

const create = (obj: NewPatient): Patient => {
  const newObj = { ...obj, id: uuid() };
  patientData.push(newObj);
  return newObj;
};

export default {
  get,
  getAll,
  create,
};
