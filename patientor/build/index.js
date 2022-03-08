"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const diagnose_1 = __importDefault(require("./services/diagnose"));
const patient_1 = __importDefault(require("./services/patient"));
const utils_1 = require("./utils");
const app = (0, express_1.default)();
app.use(express_1.default.json());
// eslint-disable-next-line @typescript-eslint/no-unsafe-call
app.use((0, cors_1.default)());
const PORT = 3001;
app.get("/api/ping", (_req, res) => {
    console.log("someone pinged here");
    res.send("pong");
});
app.get("/api/diagnoses", (_req, res) => {
    res.send(diagnose_1.default.getAll());
});
app.get("/api/patients", (_req, res) => {
    res.send(patient_1.default.getAll());
});
app.get("/api/patients/:id", (req, res) => {
    res.send(patient_1.default.get(String(req.params.id)));
});
app.post("/api/patients", (req, res) => {
    res.send(patient_1.default.create((0, utils_1.toPatient)(req.body)));
});
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
