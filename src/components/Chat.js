import "../css/Chat.css";
const Chat = (props) => {
  let currentDate = new Date();
  let time = currentDate.toLocaleTimeString();
  return (
    <div>
      {/* <div className="continer">
        <div className="row">
          <div className="col-lg"> */}
      <div className="card mb-3 chat-color" style={{ maxWidth: "18rem" }}>
        <div className="card-header">{props.userName}</div>
        <div className="card-body">
          <p className="card-text">{props.msg}</p>
          <p className="card-text">
            <small>Sent at {time}</small>
          </p>
        </div>
      </div>
    </div>
    //     </div>
    //   </div>
    // </div>
  );
};

export default Chat;
