import httpStatus from "http-status";
import catchAsynch from "../../../shared/catchAsynch";
import sendResponse from "../../../shared/sendResponse";
import { SpecialtiesService } from "./speacialities.services";

const inserIntoDB = catchAsynch(async (req, res) => {
  const result = await SpecialtiesService.inserIntoDB(req);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Specialties created successfully!",
    data: result,
  });
});

export const SpecialtiesController = {
  inserIntoDB,
};
