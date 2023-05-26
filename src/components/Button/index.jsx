// Librarys
import { memo } from "react";
import PropTypes from "prop-types";

// Components
import Spinner from "./Spinner";

function Button({ title, isLoading, ...props }) {
  return (
    <button {...props} disabled={isLoading || props.disabled}>
      {isLoading && <Spinner />}
      {!isLoading && <span>{title}</span>}
    </button>
  );
}

Button.propTypes = {
  isLoading: PropTypes.func,
  title: PropTypes.string.isRequired,
};

export default memo(Button, (prevProps, nextProps) => {
  return (
    prevProps.title === nextProps.title &&
    prevProps.isLoading === nextProps.isLoading &&
    prevProps.disabled === nextProps.disabled
  );
});
