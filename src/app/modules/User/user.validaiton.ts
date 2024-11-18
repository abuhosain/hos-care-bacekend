import { Gender, UserStatus } from "@prisma/client";
import { z } from "zod";

const creatAdmin = z.object({
  password: z.string({ required_error: "Password is require" }),
  admin: z.object({
    name: z.string({ required_error: "Name is required" }),
    email: z.string({ required_error: "email is required" }),
    contactNumber: z.string({ required_error: "contactNumber is required" }),
  }),
});

const createDoctor = z.object({
  password: z.string({ required_error: "Password is require" }),
  doctor: z.object({
    name: z.string({ required_error: "Name is required" }),
    email: z.string({ required_error: "email is required" }),
    contactNumber: z.string({ required_error: "contactNumber is required" }),
    address: z.string({ required_error: "address is required" }),
    registrationNumber: z.string({
      required_error: "registrationNumber is required",
    }),
    experience: z.number().optional(),
    gender: z.enum([Gender.MALE, Gender.FEMALE]),
    appoinmentFee: z.number({
      required_error: "appoinmentFee is required",
    }),
    qualification: z.string({
      required_error: "qualification is required",
    }),
    currentWorkingPlace: z.string({
      required_error: "currentWorkingPlace is required",
    }),
    designation: z.string({
      required_error: "designation is required",
    }),
  }),
});

const createPatient = z.object({
  password: z.string(),
  patient: z.object({
    email: z
      .string({
        required_error: "Email is required!",
      })
      .email(),
    name: z.string({
      required_error: "Name is required!",
    }),
    contactNumber: z.string({
      required_error: "Contact number is required!",
    }),
    address: z.string({
      required_error: "Address is required",
    }),
  }),
});

const updateStatus = z.object({
  body: z.object({
    status: z.enum([UserStatus.ACTIVE, UserStatus.BLOCKED, UserStatus.DELETED]),
  }),
});

export const UserValidation = {
  creatAdmin,
  createDoctor,
  createPatient,
  updateStatus,
};
