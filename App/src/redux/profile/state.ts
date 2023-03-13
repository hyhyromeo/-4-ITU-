export type profileAndPoints = {
  profile?: Profile;
  record: Point_record[];
  availablePts: number;
};

export type Profile = {
  id: number;
  name: string;
  membership_no: string;
  email: string;
  phone_number: string;
  gender: string | null;
  birthday: string;
  icon: string;
  roles: string;
  agent: string | null;
};
export type Point_record = {
  id: number;
  service: string;
  user_id: number;
  medical_services_id: number;
  points_gained: number;
  points_gained_date: any;
  points_expiry_date: any;
  created_by: string;
  point: number;
};

export type claimed = {
  gift_item: string;
  description: string;
  cost_at_date: number;
};

export type profileState = {
  profiles: profileAndPoints;
  claims: claimed[];
};
export const initialProfileState: profileState = {
  profiles: {
    record: [],
    availablePts: 0,
  },
  claims: [],
};
