import { Timeline } from './components/timeline';
import { mockDailySchedule } from './data/mockEvents';
import './styles/global.css';
import './App.css';

/**
 * Main App Component
 *
 * Renders the daily schedule timeline with mock data
 */
function App() {
  return (
    <div className="container">
      <Timeline
        events={mockDailySchedule}
        title="Daily Schedule"
        subtitle="Your planned activities for today"
        showFooter={true}
      />
    </div>
  );
}

export default App;
