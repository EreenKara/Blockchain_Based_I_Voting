export const calculateRemainingPercentage = (
  startDateStr: string,
  endDateStr: string,
) => {
  const now = new Date();
  const startDate = new Date(startDateStr);
  const endDate = new Date(endDateStr);

  if (startDate >= endDate) {
    throw new Error('Bitiş tarihi, başlangıç tarihinden sonra olmalıdır.');
  }

  const totalDuration = endDate.getTime() - startDate.getTime(); // ms cinsinden
  const elapsedDuration = now.getTime() - startDate.getTime(); // şu ana kadar geçen süre
  const remainingDuration = endDate.getTime() - now.getTime();

  const totalDays = Math.ceil(totalDuration / (1000 * 60 * 60 * 24));
  const remainingDays = Math.max(
    0,
    Math.ceil(remainingDuration / (1000 * 60 * 60 * 24)),
  );
  const elapsedPercentage = Math.min(
    100,
    Math.max(0, (elapsedDuration / totalDuration) * 100),
  );

  return {
    totalDays,
    remainingDays,
    elapsedPercentage: parseFloat(elapsedPercentage.toFixed(2)), // % olarak
  };
};

export default calculateRemainingPercentage;
