import { z } from "zod";

const creatAdmin = z.object({
  password: z.string({ required_error: "Password is require" }),
  admin: z.object({
    name: z.string({ required_error: "Name is required" }),
    email: z.string({ required_error: "email is required" }),
    contactNumber: z.string({ required_error: "contactNumber is required" }),
  }),
});

export const UserValidation = {
  creatAdmin,
};
