import Daygrid from './test'
import json_activities from './Zeitplan.json'


function App() {
  // const activities= [
  //   { id: 1, name: "Activity 1", start: 10, end: 11, topic: "Relax" },
  //   { id: 2, name: "Activity 2", start: 13.5, end: 15.5, topic: "Meeting" },
  //   { id: 3, name: "Activity 3", start: 16, end: 19, topic: "Workshop" },
  //   { id: 4, name: "Activity 4", start: 13, end: 14.5, topic: "Workshop" },
  //   { id: 5, name: "Activity 5", start: 14, end: 15, topic: "Meeting" },
  // ];
  // const totalDayCount = 3;

  // const json_activities = JSON.parse(jsonData)
  console.log(`Dings\n ${json_activities.ConferenceDays}`)
  // const totalDayCount = json_activities.ConferenceDays.length


  return (
    <div>
      {json_activities.ConferenceDays.map((day, index) => (
        <Daygrid
          key={index}
          activities={day.Activities}
          totalDayCount={json_activities.ConferenceDays.length}
          dayCount={index + 1}
        />
      ))}
    </div>
  );
  // return (
  //   <div className="App">
  //     <Daygrid activities={activities} totalDayCount={totalDayCount} dayCount={1}/>
  //     <Daygrid activities={activities} totalDayCount={totalDayCount} dayCount={2}/>
  //   </div>
  // );
}

export default App;
