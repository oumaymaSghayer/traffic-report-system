import { useEffect, useMemo, useState } from "react";
import { TrafficInterface } from "../interfaces/traffic.interface";
import "./../App.css";

function TurnTable(props: {
  displayedData: TrafficInterface[];
  timeList: string[];
  roadTypes: string[];
  peakHoursActive: boolean;
  isAm: boolean;
}) {
  const turnsCols = ["T", "L", "R", "U"];
  const [tableHeaders, setTableHeaders] = useState<string[]>([]);
  const [displayedTimeList, setDisplayedTimeList] = useState<string[]>([]);
  const [calculationTimeList, setCalculationTimeList] = useState<string[]>([]);
  const [data, setData] = useState<number[][]>([]);
  const [volumes, setVolumes] = useState<number[]>([]);

  useEffect(() => {
    getTableHeaders();
    setDisplayedTimeList(props.timeList);
    buildTimeList(displayedTimeList);
  }, []);

  useEffect(() => {
    buildTableData(props.timeList);
  });

  const getTableHeaders = () => {
    let allRoadsAndTurns: string[] = [];
    props.roadTypes.forEach((road) => {
      turnsCols.forEach((turn) => {
        allRoadsAndTurns.push(road + turn);
      });
    });
    setTableHeaders(allRoadsAndTurns);
    return allRoadsAndTurns;
  };

  const buildTableData = (timeList: string[]): number[][] => {
    let tableData: number[][] = [];
    timeList.forEach((time) => {
      let row_data = props.displayedData.filter((e) =>
        e.timestamp.includes(time)
      );
      let time_row: number[] = [];
      props.roadTypes.forEach((dir) => {
        turnsCols.forEach((turn) => {
          let obj = row_data.find(
            (e) => e.direction === dir && e.turn === turn
          );
          if (obj) time_row.push(obj.count);
          else time_row.push(0);
        });
      });
      tableData.push(time_row);
    });
    return tableData;
  };
  const calculateVolume = (dataTable: number[][]) => {
    let sum = 0;
    let volumeTable: number[] = [];
    for (let col = 0; col < tableHeaders.length; col++) {
      sum = 0;
      for (let row = 0; row < dataTable.length; row++) {
        sum += dataTable[row][col];
      }
      volumeTable.push(Math.round(sum / dataTable.length));
    }
    return volumeTable;
  };
  let tableData = useMemo(() => {
    let tab = buildTableData(props.timeList);
    setData(tab);
    return tab;
  }, [props.displayedData, props.timeList]);

  const renderTableRow = (table_row: number[]) => {
    return table_row.map((count, i) => (
      <td className="turn-table-td" key={i}>
        {count}
      </td>
    ));
  };

  let volumeTable = useMemo(() => {
    let v = calculateVolume(data);
    setVolumes(v);
    return v;
  }, [data, props.peakHoursActive]);

  const getTableFootData = () => {
    if (volumes.length === 0) return;
    return volumes.map((vol, i) => (
      <td className="turn-table-td header-title" key={i}>
        {" "}
        {vol}{" "}
      </td>
    ));
  };

  const calculatePeakHour = (dataTable: number[][]) => {
    let hour_volumes: number[] = [];
    for (let row = 0; row < dataTable.length - 4; row++) {
      let hour_table = dataTable.slice(row, row + 4);
      hour_volumes.push(calculateVolume(hour_table).reduce((a, b) => a + b, 0));
    }
    let max = hour_volumes.reduce(
      (indexMax, x, i, hour_volumes) =>
        x > hour_volumes[indexMax] ? i : indexMax,
      0
    );
    return max;
  };
  const buildTimeList = (timeList: string[]) => {
    let times: string[] = [];
    for (let i = 0; i < timeList.length - 1; i++) {
      times.push(timeList[i] + "-" + timeList[i + 1]);
    }
    times.push(timeList[timeList.length - 1]);
    setCalculationTimeList(times);
  };
  const togglePeakHour = () => {
    if (!props.peakHoursActive) {
      let index = calculatePeakHour(tableData);
      setData(tableData.slice(index, index + 4));
      setDisplayedTimeList(displayedTimeList.slice(index, index + 4));
      setCalculationTimeList(calculationTimeList.slice(index, index + 4));
    } else {
      setDisplayedTimeList(props.timeList);
      setData(tableData);
    }
  };

  const peakHour = useMemo(() => {
    togglePeakHour();
    return true;
  }, [props.peakHoursActive]);

  const calculateTimeList = useMemo(() => {
    if (props.peakHoursActive) buildTimeList(displayedTimeList);
    return true;
  }, [displayedTimeList]);

  return (
    <div className="turn-table-component">
      <table className="turn-table">
        <thead className="turn-table-header">
          <tr className="turn-table-tr">
            <td className="turn-table-td" style={{ width: "21%" }}></td>
            {tableHeaders.map((r, index) => {
              return (
                <td className="turn-table-td" key={index}>
                  {r}
                </td>
              );
            })}
          </tr>
        </thead>

        <tbody>
          {data.map((table_row, index) => (
            <tr className="turn-table-tr" key={index}>
              <td className="turn-table-td time-td">
                {calculationTimeList[index]} {props.isAm ? " AM" : " PM"}
              </td>
              {renderTableRow(table_row)}
            </tr>
          ))}
        </tbody>

        <tfoot>
          <tr>
            <td className="turn-table-td header-title time-td">Volume</td>
            {getTableFootData()}
          </tr>
        </tfoot>
      </table>
    </div>
  );
}

export default TurnTable;
