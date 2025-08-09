import { FormikErrors, useFormikContext } from "formik";
import { Fragment, useMemo } from "react";
import {
  CropExpenseEstimateFormPayload,
  CropJourneyInitFormPayload,
} from "../../../../../lib/model/CropJourneyModel";
import { SystemWideSelectString } from "../../../../../lib/model/Model";
import { extractFormErrorMessage } from "../../../../../lib/utils/Helpers";

interface Props {
  index: number;
  fieldName: keyof CropExpenseEstimateFormPayload;
}
const ExpenseErrorMessageArray: React.FC<Props> = ({ index, fieldName }) => {
  const { errors } = useFormikContext<CropJourneyInitFormPayload>();

  const errorMessage = useMemo(() => {
    if (!errors.cropExpenseEstimates) {
      return;
    }

    const errorsAtIndex = errors.cropExpenseEstimates[
      index
    ] as FormikErrors<CropExpenseEstimateFormPayload>;

    if (!errorsAtIndex || Object.keys(errorsAtIndex).length === 0) {
      return;
    }

    if (!errorsAtIndex[fieldName]) {
      return;
    }

    if (
      typeof errorsAtIndex[fieldName] === "object" &&
      errorsAtIndex[fieldName] !== null &&
      "label" in errorsAtIndex[fieldName]
    ) {
      const item = errorsAtIndex[fieldName] as SystemWideSelectString;
      return extractFormErrorMessage(item.value);
    }

    return errorsAtIndex[fieldName];
  }, [fieldName, index, errors.cropExpenseEstimates]);

  return <Fragment>{errorMessage && <span>{errorMessage}</span>}</Fragment>;
};
export default ExpenseErrorMessageArray;
