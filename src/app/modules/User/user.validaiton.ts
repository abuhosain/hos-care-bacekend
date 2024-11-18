import { Gender } from "@prisma/client";
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
export const UserValidation = {
  creatAdmin,
  createDoctor,
};
