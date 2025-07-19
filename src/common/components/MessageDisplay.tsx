import { Fragment } from "react/jsx-runtime";
import { FormMessageType, MessageTypeAlert } from "../../lib/model/Model";

interface Props {
  messageType?: FormMessageType;
}
const MessageDisplay: React.FC<Props> = ({ messageType }) => {
  return (
    <Fragment>
      {messageType && messageType.message && (
        <div
          className={`alert alert-${MessageTypeAlert[messageType.messageType]}`}
        >
          {messageType.message}
        </div>
      )}
    </Fragment>
  );
};
export default MessageDisplay;
