import { useMemo } from "react";
import DataTable, { TableColumn } from "react-data-table-component";
import { Fragment } from "react/jsx-runtime";
import { useCropJourney } from "../../../../../lib/context/CropJourneyContext";
import { CropManagementHistory } from "../../../../../lib/model/CropJourneyModel";
import { HUMAN_DATE_FORMAT } from "../../../../../lib/model/Model";
import {
  dateStringToFormattedDate,
  parseNPKStatus,
} from "../../../../../lib/utils/Helpers";

const HistoricalRecords: React.FC = () => {
  const { cropManagementHistoricalRecords } = useCropJourney();

  const columns: TableColumn<CropManagementHistory>[] = useMemo(
    () => [
      {
        name: <span>Date</span>,
        cell: (data) => (
          <span className="text-capitalize">
            {data.date
              ? dateStringToFormattedDate(data.date, HUMAN_DATE_FORMAT)
              : "-"}
          </span>
        ),
      },
      {
        name: <span>pH</span>,
        cell: (data) => (
          <span className="text-capitalize">{data.ph || "-"}</span>
        ),
      },
      {
        name: <span>Moisture</span>,
        cell: (data) => (
          <span className="text-capitalize">{data.moisture || "-"}</span>
        ),
      },
      {
        name: <span>N-P-K Status</span>,
        cell: (data) => (
          <span className="text-capitalize">{parseNPKStatus(data)}</span>
        ),
      },
      {
        name: <span>Height</span>,
        cell: (data) => (
          <span className="text-capitalize">
            {data.height
              ? data.height +
                " " +
                (data.heightMeasurementUnit
                  ? data.heightMeasurementUnit.name
                  : ""
                ).trim()
              : "-"}
          </span>
        ),
      },
      {
        name: <span>Stage</span>,
        cell: (data) => (
          <span className="text-capitalize">
            {data.growthStage ? data.growthStage.name : "-"}
          </span>
        ),
      },
    ],
    []
  );

  return (
    <Fragment>
      {cropManagementHistoricalRecords &&
        cropManagementHistoricalRecords.length > 0 && (
          <div className="col-12 px-0 mx-0 mb-3">
            <DataTable
              responsive
              className="col-12 mx-0"
              title={"Historical Records"}
              columns={columns}
              data={cropManagementHistoricalRecords}
            />
          </div>
        )}
    </Fragment>
  );
};

export default HistoricalRecords;
