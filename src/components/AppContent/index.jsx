// Librarys
import PropTypes from "prop-types";

// Components
import JobsContainer from "../../modules/Jobs/components/JobsContainer";

// Services
import ApiProfile from "../../services/ApiProfile";

export default function AppContent({ api, wixResponse }) {
  return (
    <div className="app-content p-3 px-sm-5 py-sm-5">
      <JobsContainer api={api} wixResponse={wixResponse} />
    </div>
  );
}

AppContent.propTypes = {
  wixResponse: PropTypes.object.isRequired,
  api: PropTypes.instanceOf(ApiProfile).isRequired,
};
