// Librarys
import { memo } from "react";
import PropTypes from "prop-types";

// Hooks
import useSelect from "./useSelect";

// Constants
import { CHEVRON_DOWN } from "./constants";

// Utils
import classnames from "../../utils/classnames";

// Styles
import "./styles.css";

function Select({
  textLabel,
  options,
  style,
  className,
  onChange,
  isLoading,
  arrayDeps,
  selectedValue,
  noSelectionLabel = "Select",
}) {
  const {
    ref,
    value,
    label,
    hideOptions,
    triggerOptions,
    isVisibleOptions,
    handleOnChange,
  } = useSelect({
    options: options,
    onChange: onChange,
    arrayDeps: arrayDeps,
    selectedValue: selectedValue,
    noSelectionLabel: noSelectionLabel,
  });

  return (
    <div
      ref={ref}
      style={style}
      onClick={isVisibleOptions ? hideOptions : undefined}
      className={classnames([className, "select position-relative"])}
    >
      {typeof textLabel === "string" && textLabel.length > 0 && (
        <label className="select-label">{textLabel}</label>
      )}

      {!isLoading && (
        <div
          role="button"
          onClick={triggerOptions}
          className="select-value mt-1 d-flex align-items-center justify-content-between py-2 ps-2 pe-3"
        >
          <span>{label}</span>

          <img
            src={CHEVRON_DOWN}
            alt="chevron-down"
            loading="lazy"
            className="ms-2 user-select-none img-fluid"
          />
        </div>
      )}

      {!isLoading &&
        isVisibleOptions &&
        Array.isArray(options) &&
        options.length > 0 && (
          <div className="bg-white select-options position-absolute w-100">
            <ul className="list-unstyled mb-0 user-select-none">
              {options.map((option, i) => (
                <li
                  key={option.value || i}
                  role="button"
                  onClick={() => handleOnChange(option)}
                  className={classnames([
                    "p-2",
                    value === option.value ? "active" : null,
                  ])}
                >
                  {option.label}
                </li>
              ))}
            </ul>
          </div>
        )}

      {!isLoading &&
        isVisibleOptions &&
        Array.isArray(options) &&
        options.length === 0 && (
          <div className="bg-white select-options empty-options position-absolute w-100">
            <span>No options</span>
          </div>
        )}

      {isLoading && <div className="select-loader mt-1"></div>}
    </div>
  );
}

Select.propTypes = {
  onChange: PropTypes.func,
  isLoading: PropTypes.bool,
  arrayDeps: PropTypes.array,
  textLabel: PropTypes.string,
  style: PropTypes.object,
  className: PropTypes.string,
  selectedValue: PropTypes.string,
  noSelectionLabel: PropTypes.string,
  options: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default memo(Select);
