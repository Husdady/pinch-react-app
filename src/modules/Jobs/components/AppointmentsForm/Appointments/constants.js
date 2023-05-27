// Utils
import getArrayItems from "../../../../../utils/getArrayItems";

// Constants
export const MAX_LOADING_ITEMS = 20;

export const fields = [
  { id: "0001", name: "Client", className: "field-client" },
  { id: "0002", name: "Property", className: "field-property" },
  { id: "0003", name: "Date", className: "field-date" },
  { id: "0004", name: "Status", className: "field-status" },
];

export const appointmentStatus = [
  { value: "pending", label: "Pending" },
  { value: "progress", label: "In Progress" },
  { value: "scheduled", label: "Scheduled" },
  { value: "completed", label: "Completed" },
  { value: "cancelled", label: "Cancelled" },
  { value: "rebook", label: "Rebook" },
];

export const filterAppointmentStatus = [
  { value: "all", label: "All" },
  ...appointmentStatus.filter((item) => item.value !== "rebook"),
];

export const statusOptions = {
  // Filter 'pending' status options
  pending: getArrayItems({
    field: "value",
    data: appointmentStatus,
    items: ["pending", "scheduled", "cancelled"],
  }),

  // Filter 'scheduled' status options
  scheduled: getArrayItems({
    field: "value",
    data: appointmentStatus,
    items: ["scheduled", "progress", "cancelled", "rebook"],
  }),

  // Filter 'completed' status options
  completed: getArrayItems({
    field: "value",
    data: appointmentStatus,
    items: ["completed", "rebook"],
  }),

  // Filter 'cancelled' status options
  cancelled: getArrayItems({
    field: "value",
    data: appointmentStatus,
    items: ["cancelled", "rebook"],
  }),

  // Filter 'progress' status options
  progress: getArrayItems({
    field: "value",
    data: appointmentStatus,
    items: ["progress", "completed"],
  }),

  // Filter 'rebook' status options
  rebook: getArrayItems({
    field: "value",
    data: appointmentStatus,
    items: ["rebook"],
  }),
};
