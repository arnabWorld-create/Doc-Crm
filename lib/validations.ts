import { z } from 'zod';

export const reportFileSchema = z.object({
  url: z.string().url(),
  filename: z.string(),
  uploadedAt: z.string().datetime(),
});

export const medicationSchema = z.object({
  id: z.string(),
  name: z.string().min(1, { message: "Medicine name is required" }),
  dose: z.string().optional().nullable(),
  frequency: z.string().optional().nullable(),
  timing: z.string().optional().nullable(),
  duration: z.string().optional().nullable(),
  startFrom: z.string().optional().nullable(),
  instructions: z.string().optional().nullable(),
});

export const patientSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters." }),
  age: z.coerce.number().int().positive().optional().nullable(),
  gender: z.enum(["Male", "Female", "Other"]).optional().nullable(),
  contact: z.string().optional().nullable(),
  address: z.string().optional().nullable(),
  bloodGroup: z.string().optional().nullable(),
  allergies: z.string().optional().nullable(),
  chronicConditions: z.string().optional().nullable(),
  signs: z.string().optional().nullable(),
  investigations: z.string().optional().nullable(),
  diagnosis: z.string().optional().nullable(),
  chiefComplaint: z.string().optional().nullable(),
  bloodPressure: z.string().optional().nullable(),
  weight: z.coerce.number().optional().nullable(),
  temp: z.coerce.number().optional().nullable(),
  spo2: z.coerce.number().int().optional().nullable(),
  pulse: z.coerce.number().int().optional().nullable(),
  treatment: z.string().optional().nullable(),
  medicines: z.string().optional().nullable(),
  medications: z.array(medicationSchema).optional().nullable(),
  notes: z.string().optional().nullable(),
  history: z.string().optional().nullable(),
  reports: z.array(reportFileSchema).optional().nullable(),
  referredTo: z.string().optional().nullable(),
  consultationDate: z.string().optional().nullable(),
  followUpDate: z.string().optional().nullable(),
});

export const visitSchema = z.object({
  visitDate: z.string(),
  visitType: z.string(),
  chiefComplaint: z.string().optional(),
  signs: z.string().optional(),
  investigations: z.string().optional(),
  diagnosis: z.string().optional(),
  treatment: z.string().optional(),
  medicines: z.string().optional().nullable(),
  medications: z.array(medicationSchema).optional().nullable(),
  temp: z.string().optional(),
  spo2: z.string().optional(),
  pulse: z.string().optional(),
  bloodPressure: z.string().optional(),
  notes: z.string().optional(),
  followUpDate: z.string().optional(),
  followUpNotes: z.string().optional(),
  referredTo: z.string().optional(),
  reports: z.string().optional(),
});

export type PatientFormData = z.infer<typeof patientSchema>;
export type VisitFormData = z.infer<typeof visitSchema>;
