import express from "express";
import cors from "cors";
import diagnoseService from "./services/diagnose";
import patientService from "./services/patient";
import { toPatient } from "./utils";

const app = express();
app.use(express.json());
// eslint-disable-next-line @typescript-eslint/no-unsafe-call
app.use(cors());

const PORT = 3001;

app.get("/api/ping", (_req, res) => {
  console.log("someone pinged here");
  res.send("pong");
});

app.get("/api/diagnoses", (_req, res) => {
  res.send(diagnoseService.getAll());
});

app.get("/api/patients", (_req, res) => {
  res.send(patientService.getAll());
});

app.get("/api/patients/:id", (req, res) => {
  res.send(patientService.get(String(req.params.id)));
});

app.post("/api/patients", (req, res) => {
  res.send(patientService.create(toPatient(req.body)));
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
