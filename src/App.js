import Daygrid from './Daygrid'
import json_activities from './data/Zeitplan.json'


function App() {

  const startEnd = 25-8

  return (
    <div>
      {json_activities.ConferenceDays.map((day, index) => (
        <Daygrid
          key={index}
          activities={day.Activities}
          totalDayCount={json_activities.ConferenceDays.length}
          dayCount={index + 1}
          startEnd={startEnd}
        />
      ))}
    </div>
  );
}

export default App;
