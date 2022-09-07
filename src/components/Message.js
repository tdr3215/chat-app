import "../css/Message.css";
const Message = (props) => {
  let currentDate = new Date();
  let time = currentDate.toLocaleTimeString();
  return (
    <div>
      <div className="card mb-3 chat-color">
        <div className="card-title px-3 mt-4">
          {props.userName}
          <p className="card-text">
            <small>Sent at {time}</small>
          </p>
        </div>
        <div className="card-body mb-4">{props.msg}</div>
      </div>
    </div>
  );
};

export default Message;
