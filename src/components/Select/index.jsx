// Librarys
import { memo } from "react";
import PropTypes from "prop-types";

// Hooks
import useSelect from "./useSelect";

// Utils
import classnames from "../../utils/classnames";

// Constants
import { CHEVRON_DOWN } from "../../assets/data/constants";

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
  noSelectValues = [],
  noSelectionLabel = "Select",
  activeAutoScrollbar = false,
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
    noSelectValues: noSelectValues,
    noSelectionLabel: noSelectionLabel,
    activeAutoScrollbar: activeAutoScrollbar,
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
            <ul className="list-unstyled mb-0 user-select-none options-wrapper">
              {options.map((option, i) => (
                <li
                  key={option.value || i}
                  role="button"
                  onClick={() => handleOnChange(option)}
                  className={classnames([
                    "p-2 option-item",
                    value === option.value ? "active" : null,
                    value !== option.value && option.disabled
                      ? "disabled"
                      : null,
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

      {isLoading && (
        <div className="select-loader skeleton-animation mt-1"></div>
      )}
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
  noSelectValues: PropTypes.arrayOf(PropTypes.string),
  options: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default memo(Select, (prevProps, nextProps) => {
  return (
    prevProps.options === nextProps.options &&
    prevProps.isLoading === nextProps.isLoading &&
    prevProps.arrayDeps === nextProps.arrayDeps &&
    prevProps.selectedValue === nextProps.selectedValue
  );
});
