import { useEffect, useState } from "react";
import { TrafficInterface } from "../interfaces/traffic.interface";
import "./../App.css";
import TurnTable from "./TurnTable";

function DataTable(props: {
  displayedData: TrafficInterface[];
  amTime: string[];
  pmTime: string[];
  roadTypes: string[];
  peakHoursActive: boolean;
}) {
  return (
    <div className="data-table-component">
      <table className="data-table" style={{ width: "100%" }}>
        <thead>
          <tr className="data-table-header">
            <th className="data-table-th"> </th>
            <th className="data-table-th">Time Interval </th>
            {props.roadTypes.map((e, i) => {
              return (
                <th className="data-table-th" key={i}>
                  {e}
                </th>
              );
            })}
          </tr>
        </thead>
        <tbody>
          <tr>
            <td className="header-title data-table-time-td">
              {" "}
              Traffic Volume (AM)
            </td>
            <td colSpan={props.roadTypes.length + 1}>
              {/** am table */}
              <TurnTable
                timeList={props.amTime}
                displayedData={props.displayedData}
                roadTypes={props.roadTypes}
                peakHoursActive={props.peakHoursActive}
                isAm={true}
              />
            </td>
          </tr>
          <tr>
            <td className="header-title data-table-time-td">
              {" "}
              Traffic Volume (PM)
            </td>
            <td colSpan={props.roadTypes.length + 1}>
              <TurnTable
                timeList={props.pmTime}
                displayedData={props.displayedData}
                roadTypes={props.roadTypes}
                peakHoursActive={props.peakHoursActive}
                isAm={false}
              />
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}

export default DataTable;
