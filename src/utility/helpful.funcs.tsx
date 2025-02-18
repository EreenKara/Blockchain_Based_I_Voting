const calculateTimeRemaining = (endDate: string) => {
  const now = new Date();
  const end = new Date(endDate);
  const diff = end.getTime() - now.getTime();

  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));

  return `${days} gün ${hours} saat ${minutes} dakika`;
};
const calculateTimeToStart = (startDate: string) => {
  const now = new Date();
  const start = new Date(startDate);
  const diff = start.getTime() - now.getTime();

  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));

  return `${days} gün ${hours} saat ${minutes} dakika`;
};
interface IHelpfulFuncs {
  calculateTimeRemaining: (endDate: string) => string;
  calculateTimeToStart: (startDate: string) => string;
}

export const HelpfulFuncs: IHelpfulFuncs = {
  calculateTimeRemaining,
  calculateTimeToStart,
};
