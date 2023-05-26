// Librarys
import { memo } from "react";
import PropTypes from "prop-types";

// Components
import Spinner from "./Spinner";

function Button({ title, icon, isLoading, ...props }) {
  return (
    <button {...props} disabled={isLoading || props.disabled}>
      {isLoading && <Spinner />}
      {icon}
      {!isLoading && <span>{title}</span>}
    </button>
  );
}

Button.propTypes = {
  icon: PropTypes.node,
  isLoading: PropTypes.bool,
  title: PropTypes.string.isRequired,
};

export default memo(Button, (prevProps, nextProps) => {
  return (
    prevProps.title === nextProps.title &&
    prevProps.isLoading === nextProps.isLoading &&
    prevProps.disabled === nextProps.disabled
  );
});
