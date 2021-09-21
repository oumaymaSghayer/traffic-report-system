import {
  Checkbox,
  FormControl,
  FormControlLabel,
  Radio,
  RadioGroup,
  Select,
} from "@mui/material";
import { useEffect, useState } from "react";
import { TrafficInterface } from "../interfaces/traffic.interface";
import "./../App.css";

function App(props: {
  trafficData: TrafficInterface[];
  displayedData: TrafficInterface[];
  handleDisplayedData: any;
  handlePeakHourChange: any;
}) {
  const [selectedValue, setSelectedValue] = useState("All Vehicles");
  const [dateValue, setDateValue] = useState("July 30, 2010 (Wed)");
  const [peakHoursActive, setPeakHoursActive] = useState(false);
  useEffect(() => {
    updateDataByTypeRoad(props.trafficData, "All Vehicles");
  }, []);

  const handleRoadTypeChange = (event: any) => {
    setSelectedValue(event.target.value);
    updateDataByTypeRoad(props.trafficData, event.target.value);
    props.handlePeakHourChange(true);
    setPeakHoursActive(false);
  };

  const filterByRoadType = (arr: TrafficInterface[], road_type: string) => {
    return arr.filter((e) => e.road_user_type === road_type);
  };

  const updateDataByTypeRoad = (arr: TrafficInterface[], road_type: string) => {
    let filtered_data = filterByRoadType(arr, road_type);
    props.handleDisplayedData(filtered_data);
  };
  const onPeakHoursActive = () => {
    setPeakHoursActive(!peakHoursActive);
    props.handlePeakHourChange(peakHoursActive);
  };

  const handleDateChange = () => {
    console.log("Here filter by date");
  };

  return (
    <div className="header-component">
      <div className="filter-section">
        <div className="header-title">Count table</div>
        <div className="filter-radio-group">
          <div className="filter-radio-section">
            <FormControl>
              <RadioGroup value={selectedValue} onChange={handleRoadTypeChange}>
                <div className="filter-radio-group">
                  <FormControlLabel
                    value="All Vehicles"
                    control={<Radio color="primary" />}
                    label="All Vehicles"
                  />
                  <FormControlLabel
                    value="Bikes"
                    control={<Radio color="primary" />}
                    label="Bikes"
                  />
                  <FormControlLabel
                    value="Motorcycles"
                    control={<Radio color="primary" />}
                    label="Motorcycles"
                  />
                  <FormControlLabel
                    value="Cars"
                    control={<Radio color="primary" />}
                    label="Cars"
                  />
                  <FormControlLabel
                    value="Light Goods Vehicles"
                    control={<Radio color="primary" />}
                    label="Light Goods Vehicles"
                  />
                </div>
              </RadioGroup>
            </FormControl>
          </div>
          <div className="filter-checkbox-section">
            <FormControlLabel
              control={
                <Checkbox
                  checked={peakHoursActive}
                  onChange={onPeakHoursActive}
                  name="checkedB"
                  color="primary"
                />
              }
              label="Show Peak Hours Only"
            />
          </div>
        </div>
      </div>
      <div className="date-section">
        <div className="header-title">Report Date</div>
        <FormControl variant="outlined">
          <Select native value={dateValue} onChange={handleDateChange}>
            <option value={10}>{dateValue}</option>
          </Select>
        </FormControl>
      </div>
    </div>
  );
}

export default App;
