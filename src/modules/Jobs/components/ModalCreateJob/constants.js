// Constants
export const STATUS = "pending";
export const PAYMENT_TYPE = "cash";
export const imageStyle = { marginLeft: "3px", marginBottom: "7px" };
export const optionalStyle = { color: "#828282", letterSpacing: "0.15px" };

export const options = [
  { value: "sms", label: "SMS" },
  { value: "email", label: "Email" },
];

export const DEFAULT_VALUES = {
  notifications: true,
  confirmation: true,
  confirmationBy: options[0].value,
};
