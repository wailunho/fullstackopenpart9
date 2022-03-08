"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.toPatient = void 0;
const toPatient = (obj) => {
    return {
        name: obj.name,
        dateOfBirth: obj.dateOfBirth,
        ssn: obj.ssn,
        gender: obj.gender,
        occupation: obj.occupation,
        entries: [],
    };
};
exports.toPatient = toPatient;
