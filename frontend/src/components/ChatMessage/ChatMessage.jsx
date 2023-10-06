import "./ChatMessage.css";
import userAvatar from "../../assets/images/user-avatar.svg";
import { chatMessageText } from "../../i18n/Components";
import Button from "@mui/material/Button";

function ChatMessage({ textMessage, isReply = false, citationsContent }) {
  return (
    <div className="message">
      <div className={`${isReply ? "reply-message" : ""} default-message`}>
        <div className="message-tile">
          <img src={userAvatar} alt="user-avatar" />
          <div className="text-message">
            <p>{textMessage}</p>
            {isReply && (
              <div className="reply-panel">
                <div className="d-flex flex-row align-items-end">
                  <p className="citations">{chatMessageText.citations}</p>
                  {citationsContent && (
                    <div className="citations-content">
                      <p>{citationsContent}</p>
                    </div>
                  )}
                </div>
                <Button variant="outlined">{chatMessageText.replaceTextBtn}</Button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default ChatMessage;
