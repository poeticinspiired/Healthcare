import HttpError from '@wasp/core/HttpError.js'

export const createAdmission = async (args, context) => {
  if (!context.user) { throw new HttpError(401) };

  const { userId, hospitalName, admissionDate, releaseDate, admissionType, primaryDiagnosis, coMorbidities, mortalityRate, readmissionRate, patientSatisfactionScore } = args;

  const admission = await context.entities.Admission.create({
    data: {
      userId,
      hospitalName,
      admissionDate,
      releaseDate,
      admissionType,
      primaryDiagnosis,
      coMorbidities,
      mortalityRate,
      readmissionRate,
      patientSatisfactionScore
    }
  });

  return admission;
}

export const updateAdmission = async (args, context) => {
  if (!context.user) { throw new HttpError(401) };

  const admission = await context.entities.Admission.findUnique({
    where: { id: args.id }
  });
  if (admission.userId !== context.user.id) { throw new HttpError(403) };

  let data = {};
  if (args.hospitalName) data.hospitalName = args.hospitalName;
  if (args.admissionDate) data.admissionDate = args.admissionDate;
  if (args.releaseDate) data.releaseDate = args.releaseDate;
  if (args.admissionType) data.admissionType = args.admissionType;
  if (args.primaryDiagnosis) data.primaryDiagnosis = args.primaryDiagnosis;
  if (args.coMorbidities) data.coMorbidities = args.coMorbidities;
  if (args.mortalityRate) data.mortalityRate = args.mortalityRate;
  if (args.readmissionRate) data.readmissionRate = args.readmissionRate;
  if (args.patientSatisfactionScore) data.patientSatisfactionScore = args.patientSatisfactionScore;

  return context.entities.Admission.update({
    where: { id: args.id },
    data
  });
}