export type Analytic = {
  current: number;
  previous: number;
};

export type Order = {
  user: { name: string; image: string };
  date: string;
  amount: string;
  status: "paid" | "refund";
};

export type Platform = {
  name: string;
  amount: number;
  current: number;
  previous: number;
};

export type Sales = {
  name: string;
  amount: number;
};
