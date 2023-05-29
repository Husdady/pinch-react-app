import './styles.css';

// Components
import Profile from './components/Profile';
import AppContent from './components/AppContent/index';

export default function App() {
  return (
    <div className="app">
      <AppContent />
      {/* <Profile /> */}
    </div>
  );
}
