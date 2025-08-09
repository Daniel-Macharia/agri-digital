import { NavLink } from "react-router-dom";

interface Props {
  isExpectedYield: boolean;
  onChange: (isExpectedYield: boolean) => void;
}
const TabNavBar: React.FC<Props> = ({ isExpectedYield, onChange }) => {
  return (
    <>
      <div className="row justify-content-start px-0 mx-0">
        <NavLink
          to="#"
          // to={`..${CROP_ROUTES.CROP_HARVEST}${HARVEST_ROUTES.CROP_EXPECTED_YIELD}`}//"/farmer/projects/crops/harvesting"//"expected-yield"
          end
          className="col-6 col-md-2 nav-link body-medium primary-text crops-start-aligned-text"
          //   defaultChecked
          defaultChecked={isExpectedYield}
          onClick={() => {
            onChange(true);
          }}
        >
          Expected Yield
        </NavLink>
        <NavLink
          to="#"
          // to={`..${CROP_ROUTES.CROP_HARVEST}${HARVEST_ROUTES.CROP_ACTUAL_YIELD}`}//"/farmer/projects/crops/harvesting/actual-yield"
          end
          className="col-6 col-md-2 nav-link body-medium primary-text crops-start-aligned-text"
          defaultChecked={isExpectedYield}
          onClick={() => {
            onChange(false);
          }}
        >
          Actual Yield
        </NavLink>
      </div>
    </>
  );
};

export default TabNavBar;
