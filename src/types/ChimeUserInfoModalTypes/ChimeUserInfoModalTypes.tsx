export interface ChimeUserInfoFormData {
  country?: string;
  age?: string;
  gender?: string;
  phoneNumber?: string;
  relationshipStatus?: string;
  userName?: string;
  password? :string
}

export interface ChimeUserInfoModalProps {
  isOpen: boolean;
  onClose: () => void;
}

// Options for dropdowns
export const genders = ["Male", "Female", "Other"];
export const relationshipStatuses = [
  "Single",
  "In a relationship",
  "Married",
  "Prefer not to say",
];

export const countries: string[] = [
  'Nepal',
  'India',
  'United States',
  'United Kingdom',
  'Australia',
  'Canada',
  'Germany',
  'France',
  'Japan',
  'China',
];
