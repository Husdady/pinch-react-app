// Librarys
import { memo } from "react";
// import PropTypes from "prop-types";

function JobFooter() {
  return (
    <div className="job-footer px-4 py-4">
      <button id="generate-job" type="submit" className="d-block w-100 border-0 py-2">Generate Job</button>
    </div>
  );
}

export default memo(JobFooter);
