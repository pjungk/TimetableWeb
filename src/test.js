import React, { useEffect, useState, useRef } from "react";
import "./test.css";

function Daygrid({activities, totalDayCount, dayCount}) {
  const [activityData, setActivityData] = useState([]);

  const [selectedActivity, setSelectedActivity] = useState(null);
  const overlayRef = useRef(null);
  const totalWidth = window.innerWidth/totalDayCount;

  useEffect(() => {
    const sortedActivities = activities.sort((a, b) => {
      if (a.Start === b.Start) {
        return b.End - a.End; // Sort by descending end time if start times are equal
      }
      return a.Start - b.Start; // Sort by ascending start time
    });
  
    // Update activity data when activities prop changes
    setActivityData(activities);
    updateActivityStyles();
  }, [activities]);

  const updateActivityStyles = () => {
    const totalHeight = window.innerHeight;
    const totalHours = 22 - 8;
    // const totalWidth = window.innerWidth;
    const updatedActivities = activities.map((activity) => {
      const height = `${((activity.End - activity.Start) / totalHours) * totalHeight}px`;
      const top = `${((activity.Start - 8) / totalHours) * totalHeight}px`;
      const width = `${getActivityWidth(activity, totalWidth)}px`;
      const left = `${getActivityOffset(activity, totalWidth, dayCount)}px`;
      return { ...activity, height, top, width, left };
    });
    setActivityData(updatedActivities);
  };


  const getActivityOffset = (activity, totalWidth) => {
    const simultaneousActivities = activities.filter(
      (a) => a !== activity && a.Start < activity.End && a.End > activity.Start
    );
    const totalSimultaneous = simultaneousActivities.length + 1;
    const activityIndex = activities.findIndex((a) => a === activity);
    let offset = 0;
    for (let i = 0; i < activityIndex; i++) {
      const a = activities[i];
      if (a.Start < activity.End && a.End > activity.Start) {
        offset += (1 / totalSimultaneous) * totalWidth;
      }
    }

    return offset + (dayCount-1)*totalWidth;
  };
  
  const getActivityWidth = (activity, totalWidth) => {
    const simultaneousActivities = activities.filter(
      (a) => a !== activity && a.Start < activity.End && a.End > activity.Start
    );
    const totalSimultaneous = simultaneousActivities.length + 1;
    return 1 / totalSimultaneous * totalWidth;
  };


  const getActivityColor = (Category = "") => {
    switch (Category) {
      case "Feierei":
        return { backgroundColor: "red", borderColor: "darkred" };
      case "Spiritualität":
        return { backgroundColor: "green", borderColor: "darkgreen" };
      case "Relax":
        return { backgroundColor: "blue", borderColor: "darkblue" };
      default:
        return { backgroundColor: "purple", borderColor: "black" };
    }
  };


  const handleActivityClick = (activity) => {
    setSelectedActivity(activity);
  };

  const handleOverlayClick = (event) => {
    if (event.target === overlayRef.current) {
      setSelectedActivity(null);
    }
  };

  const renderOverlay = () => {
    if (!selectedActivity) return null;

    return (
      <div className="overlay" ref={overlayRef} onClick={handleOverlayClick}>
        <div className="modal">
          <h3>{selectedActivity.Topic}</h3>
          <p>
            Start: {selectedActivity.Start} | End: {selectedActivity.End} | Category: {selectedActivity.Category}
          </p>
          <button onClick={() => setSelectedActivity(null)}>Close</button>
        </div>
      </div>
    );
  };


  return (
    <div className="daygrid">
      {activityData.map((activity) => (
        <button
          key={activity.id}
          className={`activity ${activity.Topic}`}
          style={{
            height: activity.height,
            top: activity.top,
            width: activity.width,
            left: activity.left,
            ...getActivityColor(activity.Category),
          }}
          onClick={() => handleActivityClick(activity)}
        >
          {activity.Topic}
        </button>
      ))}
      {renderOverlay()}
    </div>
  );
}

export default Daygrid;
