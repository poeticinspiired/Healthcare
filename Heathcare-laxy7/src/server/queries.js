import HttpError from '@wasp/core/HttpError.js'


export const getAdmissionById = async (args, context) => {
  if (!context.user) throw new HttpError(401);

  const admission = await context.entities.Admission.findUnique({
    where: { id: args.id, userId: context.user.id },
  });

  if (!admission) throw new HttpError(400);

  return admission;
}

export const getHospitalByName = async (args, context) => {
  const { name } = args;
  const hospital = await context.entities.Hospital.findUnique({
    where: { name }
  });

  if (!hospital) {
    throw new HttpError(400, 'Hospital not found.');
  }

  return hospital;
}
