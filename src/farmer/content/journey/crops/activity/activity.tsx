import React, { useCallback, useMemo } from "react";
import { toast } from "react-toastify";
import { ApiClient } from "../../../../../lib/api/ApiClient";
import { useCropJourney } from "../../../../../lib/context/CropJourneyContext";
import {
  CropJourneyStageType,
  HUMAN_DATE_FORMAT,
  TOASTIFY_AUTO_CLOSE_TIMEOUT,
  TodoPayload,
  TodoStatus,
} from "../../../../../lib/model/Model";
import { API_ROUTES } from "../../../../../lib/Routes";
import {
  dateStringToFormattedDate,
  extractErrorMessage,
  parseValidActivityTypes,
  todoStatusIsComplete,
} from "../../../../../lib/utils/Helpers";
import ActivityForm from "./ActivityForm";
import ManagementActivity from "./management-activity";
const apiClient = new ApiClient();

interface Props {
  cropJourneyStageType: CropJourneyStageType;
}
export const ActivityAddAndReview: React.FC<Props> = ({
  cropJourneyStageType,
}) => {
  const {
    transactionId,
    cropManagementDetails,
    setCropManagementDetails,
    postHarvestDetails,
    setPostHarvestDetails,
    activityTypesListItems,
  } = useCropJourney();

  const validActivityListItems = useMemo(
    () =>
      parseValidActivityTypes(
        activityTypesListItems,
        true,
        cropJourneyStageType
      ),
    [activityTypesListItems, cropJourneyStageType]
  );

  const todos: TodoPayload[] = useMemo(() => {
    if (
      cropJourneyStageType === CropJourneyStageType.MANAGEMENT &&
      cropManagementDetails &&
      cropManagementDetails.todos &&
      cropManagementDetails.todos.length > 0
    ) {
      return cropManagementDetails.todos;
    }

    if (
      cropJourneyStageType === CropJourneyStageType.POST_HARVEST &&
      postHarvestDetails &&
      postHarvestDetails.todos &&
      postHarvestDetails.todos.length > 0
    ) {
      return postHarvestDetails.todos;
    }

    return [];
  }, [cropJourneyStageType, cropManagementDetails, postHarvestDetails]);

  const updateTodoState = useCallback(
    (data: TodoPayload[]) => {
      if (cropJourneyStageType === CropJourneyStageType.MANAGEMENT) {
        setCropManagementDetails({
          ...cropManagementDetails,
          todos: data,
        });
      } else if (cropJourneyStageType === CropJourneyStageType.POST_HARVEST) {
        setPostHarvestDetails({ ...postHarvestDetails, todos: data });
      }
    },
    [
      cropJourneyStageType,
      cropManagementDetails,
      postHarvestDetails,
      setCropManagementDetails,
      setPostHarvestDetails,
    ]
  );

  const modifyActivityStatus = useCallback(
    async (status: boolean, todoId: string) => {
      try {
        if (!transactionId) return;

        const dataResponse = await apiClient.patch<TodoPayload[]>({
          url: API_ROUTES.CROP_JOURNEY.STAGE_ACTIVITY_STATUS_UPDATE.replace(
            ":transactionId",
            transactionId
          )
            .replace(":cropJourneyStage", cropJourneyStageType)
            .replace(":todoId", todoId)
            .replace(
              ":todoStatus",
              status ? TodoStatus.COMPLETED : TodoStatus.PENDING
            ),
        });
        updateTodoState(dataResponse);
      } catch (err) {
        const errorMessage = extractErrorMessage(err);
        toast.error(errorMessage || "Activity status change failed", {
          autoClose: TOASTIFY_AUTO_CLOSE_TIMEOUT,
        });
      }
    },
    [transactionId, cropJourneyStageType, updateTodoState]
  );

  return (
    <>
      <div
        className="row p-2"
        style={{ backgroundColor: "white", borderRadius: "8px" }}
      >
        <div className="col-12 col-md-6 pe-md-4">
          <ActivityForm
            isCropJourney={true}
            transactionId={transactionId || ""}
            stage={cropJourneyStageType}
            activityTypes={validActivityListItems}
            onDone={(todos: TodoPayload[]) => updateTodoState(todos)}
            actionTitle="Add New Activity"
            buttonActionTitle="Add Activity"
            todoTitle="Crop Management"
          />
        </div>

        {todos.length > 0 && (
          <div className="col-12 col-md-6 ps-md-4">
            <h3 className="h3-bold primary-text crops-start-aligned-text">
              Upcoming Activities
            </h3>

            <div className="row ps-md-3">
              {todos.map((activity) => (
                <ManagementActivity
                  activityName={
                    activity.activityType
                      ? activity.activityType.name
                      : activity.title
                  }
                  activityDescription={activity.description}
                  activityCompletionDate={activity.status}
                  activityCompletionTime={dateStringToFormattedDate(
                    activity.dueDate,
                    HUMAN_DATE_FORMAT
                  )}
                  activityCompleted={todoStatusIsComplete(activity.status)}
                  onStatusChanged={(status) =>
                    modifyActivityStatus(status, activity.id)
                  }
                />
              ))}
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default ActivityAddAndReview;
