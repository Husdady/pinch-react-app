// Librarys
import { memo } from "react";
import PropTypes from "prop-types";

// Components
import Select from "../../../../components/Select";

// Constants
import { options, optionalStyle } from "./constants";
import classnames from "../../../../utils/classnames";

function Optional({
  notifications,
  confirmation,
  confirmationBy,
  onChangeConfirmationBy,
  onToggleCheckboxOption,
}) {
  return (
    <div className="optional-form d-flex align-items-center justify-content-between mb-3">
      <div>
        <span style={optionalStyle}>Optional</span>

        <ul className="list-unstyled optional-list">
          <li className="mb-2 d-flex align-items-center">
            <input
              role="button"
              id="request-confirmation"
              name="confirmation"
              type="checkbox"
              checked={confirmation}
              onChange={onToggleCheckboxOption}
            />

            <label role="button" htmlFor="request-confirmation" className="ps-2">
              Request Confirmation
            </label>
          </li>

          <li className="d-flex align-items-center">
            <input
              role="button"
              id="enable-notifications"
              type="checkbox"
              name="notifications"
              checked={notifications}
              onChange={onToggleCheckboxOption}
            />

            <label role="button" htmlFor="enable-notifications" className="ps-2">
              Enable Notifications
            </label>
          </li>
        </ul>
      </div>

      <div style={{ width: "29%" }}>
        <Select
          options={options}
          selectedValue={confirmationBy}
          onChange={onChangeConfirmationBy}
          className={classnames([confirmationBy === "sms" ? "mb-1" : "mb-3"])}
        />

        {confirmationBy === "sms" && (
          <span className="ms-3 d-block">(100 MSG)</span>
        )}
      </div>
    </div>
  );
}

Optional.propTypes = {
  notifications: PropTypes.bool.isRequired,
  confirmation: PropTypes.bool.isRequired,
  confirmationBy: PropTypes.string.isRequired,
  onChangeConfirmationBy: PropTypes.func.isRequired,
  onToggleCheckboxOption: PropTypes.func.isRequired,
};

export default memo(Optional, (prevProps, nextProps) => {
  return (
    prevProps.notifications === nextProps.notifications &&
    prevProps.confirmation === nextProps.confirmation &&
    prevProps.confirmationBy === nextProps.confirmationBy
  );
});
