import { ManagementSummaryProps } from "../crops-models";

export default function ManagementSummary(summary: ManagementSummaryProps) {
  return (
    <div className="col-12 card p-2">
      <div className="row d-flex" style={{ alignItems: "center" }}>
        <p className="col-9 h3-bold primary-text crops-start-aligned-text mb-0">
          {summary.title}
        </p>

        <img
          src="/assets/images/edit.svg"
          alt="edit"
          style={{
            alignSelf: "center",
            height: "max-content",
            width: "max-content",
            cursor: "pointer",
          }}
          onClick={() => {
            if (summary.onActionRequired) {
              summary.onActionRequired();
            }
          }}
        />
      </div>

      <div className="col-12">
        {summary.items &&
          summary.items.length > 0 &&
          summary.items.map((item) => (
            <div className="row m-0 p-0 mb-1">
              <div className="col-6 p-0 m-0">
                <p className="col-12 my-0 py-0 crops-start-aligned-text body-regular secondary-text">
                  {item.label}
                </p>
              </div>
              <div className="col-6 p-0 m-0">
                <p className="crops-end-aligned-text col-12 my-0 py-0 body-bold primary-text">
                  {item.value}
                </p>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
}
