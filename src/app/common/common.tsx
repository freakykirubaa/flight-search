
import Airways from "../../../assets/airlogo.png"

export const AIRWAYS=Airways

export const originOptions = [
  { value: "JFK", label: "JFK" },
  { value: "DEL", label: "DEL" },
  { value: "SYD", label: "SYD" },
  { value: "BOM", label: "BOM" },
  { value: "BNE", label: "BNE" },
  { value: "BLR", label: "BLR" },
];

export const destinationOptions = [
  { value: "JFK", label: "JFK" },
  { value: "DEL", label: "DEL" },
  { value: "SYD", label: "SYD" },
  { value: "LHR", label: "LHR" },
  { value: "CDG", label: "CDG" },
  { value: "DOH", label: "DOH" },
  { value: "SIN", label: "SIN" },
];

export const cabinOptions = [
  { value: "Economy", label: "Economy" },
  { value: "Business", label: "Business" },
  { value: "First", label: "First" },
];

export const customStyles = {
  control: (provided: any) => ({
    ...provided,
    backgroundColor: "#1F2937",
    color: "#FFFFFF",
    borderRadius: "0.375rem",
    padding: "0.5rem",
  }),
  menu: (provided: any) => ({
    ...provided,
    backgroundColor: "#1F2937",
    color: "#FFFFFF",
  }),
  singleValue: (provided: any) => ({
    ...provided,
    color: "#FFFFFF",
  }),
  option: (provided: any, state: any) => ({
    ...provided,
    backgroundColor: state.isFocused ? "#2D3748" : "#1F2937",
    color: "#FFFFFF",
  }),
};
