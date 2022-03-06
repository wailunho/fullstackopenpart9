import patientData from "../patients";
import { Patient } from "../types";

const getAll = (): Patient[] => {
  return patientData;
};

export default {
  getAll,
};
