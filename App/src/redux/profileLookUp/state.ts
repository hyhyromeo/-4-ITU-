export type profileAndPoints = {
  profile?: Profile;
  record: Point_record[];
  addPoint: {
    agent: Agent;
  };
};

export type Agent = {
  id: number | null
  name: string | null
  membership_no: any | null
  is_agent: boolean  | null
  phone_number: number  | null
};

export type Profile = {
  user_id: number;
  name: string;
  membership_no: string;
  phone_number: string;
  email?: string;
  gender?: string | null;
  birthday?: string;
  icon?: string;
  roles?: string;
  agent?: string | null;
  availablePts: number;
};
export type Point_record = {
  id: number;
  user_id: number;
  medical_services_id: number;
  points_gained: number;
  points_gained_date: any;
  points_expiry_date: any;
  created_by: string;
  point: number;
};

export type profileLookUpState = {
  profiles: profileAndPoints;
  error: string | null;
  qrCode: string | null;
  timeDiff: number | null;
};

export type qrTextState = {
  qrPw: string | null;
};

export const initialProfileLookUpState: profileLookUpState = {
  profiles: {
    record: [],
    addPoint: {
      agent: {
        id: null ,
        name: " ",
        membership_no: null,
        is_agent: null,
        phone_number: null,
      },
    },
  },
  error: null,
  qrCode: null,
  timeDiff: null,
};
