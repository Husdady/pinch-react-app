// Librarys
import { memo } from "react";
import PropTypes from "prop-types";
import { Overlay, Tooltip } from "react-bootstrap";

// Hooks
import useInfo from "./useInfo";

// Utils
import classnames from "../../utils/classnames";

// Constants
import { DEFAULT_PLACEMENT } from "./constants";
import { INFO_CIRCLE_ICON } from "../../assets/data/constants";

// Styles
import './styles.css'

function Info({
  style,
  className,
  tooltipClassName,
  imageStyle,
  placement = DEFAULT_PLACEMENT,
  children
}) {
  const { show, target, toggleShow } = useInfo();

  return (
    <>
      <button
        ref={target}
        type="button"
        style={style}
        onClick={toggleShow}
        className={classnames(["bg-transparent p-0", className])}
      >
        <img src={INFO_CIRCLE_ICON} alt="info-circle-icon" style={imageStyle} />
      </button>

      <Overlay target={target.current} show={show} placement={placement}>
        {(props) => (
          <Tooltip
            {...props}
            className={classnames(["info-tooltip", tooltipClassName])}
          >
           {children}
          </Tooltip>
        )}
      </Overlay>
    </>
  );
}

Info.propTypes = {
  style: PropTypes.object,
  imageStyle: PropTypes.object,
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
  tooltipClassName: PropTypes.string,
  placement: PropTypes.string,
};

export default memo(Info, (prevProps, nextProps) => {
  return prevProps.children === nextProps.children;
});
