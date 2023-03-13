export type coupon = {
  id: number;
  gift_item: string;
  description: string;
  cost: string;
  mode: string;
  status: string;
};

export type pointAddition = {
  userId: string;
  medicalServiceId: string;
  points: number;
};

export type CouponState = {
  coupons: coupon[];
  status: string;
};

export const initialCouponState: CouponState = {
  coupons: [],
  status: "",
};
