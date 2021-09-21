import { useEffect, useMemo, useState } from "react";

import "./App.css";
import { TrafficInterface } from "./interfaces/traffic.interface";
import Header from "./components/Header";
import DataTable from "./components/DataTable";

const REACT_APP_SERVER_URL: string | undefined =
  process.env["REACT_APP_SERVER_URL"]!;

function App() {
  const turnsCols = ["T", "L", "R", "U"];
  const roadTypes = ["NB", "SB", "EB", "WB"];
  const amTimeList: string[] = [
    "01:00",
    "01:15",
    "01:30",
    "01:45",
    "02:00",
    "02:15",
    "02:30",
    "02:45",
    "03:00",
    "03:15",
    "03:30",
    "03:45",
    "04:00",
    "04:15",
    "04:30",
    "04:45",
  ];
  const pmTimeList: string[] = [
    "12:00",
    "12:15",
    "12:30",
    "12:45",
    "13:00",
    "13:15",
    "13:30",
    "13:45",
    "14:00",
    "14:15",
    "14:30",
    "14:45",
    "15:00",
    "15:15",
    "15:30",
    "15:45",
  ];
  const [trafficData, setTrafficData] = useState<TrafficInterface[]>([]);
  const [amTime, setAmTime] = useState<string[]>(amTimeList);
  const [pmTime, setPmTimes] = useState<string[]>(pmTimeList);
  const [peakHoursActive, setPeakHoursActive] = useState(true);
  const [displayedData, setDisplayedData] =
    useState<TrafficInterface[]>(trafficData);

  useEffect(() => {
    loadData();
    handleDisplayedData(
      trafficData.filter((e) => e.road_user_type == "All Vehicles")
    );
  }, []);

  const loadData = async () => {
    const response = await fetch(`${REACT_APP_SERVER_URL}`);
    const data: TrafficInterface[] = await response.json();
    setTrafficData(data);
    return data;
  };
  let fetchedData = useMemo(() => {
    setDisplayedData(trafficData);
  }, [trafficData]);
  const handleDisplayedData = (data: TrafficInterface[]) => {
    setDisplayedData(data);
  };

  const handlePeakHourChange = (value: boolean) => {
    setPeakHoursActive(value);
  };

  return (
    <div className="App">
      {trafficData.length === 0 ? (
        <p>Could not load data</p>
      ) : (
        <div>
          <Header
            trafficData={trafficData}
            displayedData={displayedData}
            handleDisplayedData={handleDisplayedData}
            handlePeakHourChange={handlePeakHourChange}
          />
          <DataTable
            roadTypes={roadTypes}
            amTime={amTime}
            pmTime={pmTime}
            displayedData={displayedData}
            peakHoursActive={peakHoursActive}
          />
        </div>
      )}
    </div>
  );
}

export default App;
