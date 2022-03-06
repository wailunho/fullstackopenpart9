import diagnoseData from "../diagnoses";
import { Diagnose } from "../types";

const getAll = (): Diagnose[] => {
  return diagnoseData;
};

export default {
  getAll,
};
