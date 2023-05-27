// Librarys
import { memo } from "react";

// Utils
import createList from "../../../../../utils/createList";

// Constants
import { MAX_LOADING_ITEMS } from "./constants";

function LoadingAppointments() {
  return (
    <>
      {createList(MAX_LOADING_ITEMS).map((_, i) => (
        <li key={i} className="appointment px-3">
          <div className="d-flex align-items-center">
            <div className="field-client skeleton-animation text"></div>
            <div className="field-property skeleton-animation text"></div>
            <div className="field-date skeleton-animation text"></div>

            <div className="ms-4 field-status skeleton-animation select"></div>
          </div>
        </li>
      ))}
    </>
  );
}

export default memo(LoadingAppointments);
