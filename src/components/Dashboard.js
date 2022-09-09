import React, { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useNavigate } from "react-router-dom";
import "../css/Dashboard.css";
import Message from "./Message";
import { auth, db, logout } from "../firebase";
import {
  query,
  collection,
  getDocs,
  where,
  setDoc,
  doc,
  getDoc,
} from "firebase/firestore";
function Dashboard() {
  const [user, loading, error] = useAuthState(auth);
  const [name, setName] = useState("");
  const [messages, setMessages] = useState("");
  const [msgBody, setMsgBody] = useState("");
  const navigate = useNavigate();

  let date = new Date();
  let time = date.toLocaleTimeString();

  const fetchUserName = async () => {
    try {
      const usersRef = collection(db, "users");
      const q = query(usersRef, where("uid", "==", user?.uid));
      const doc = await getDocs(q);
      const data = doc.docs[0].data();

      setName(data.name);
    } catch (err) {
      console.error(err);
      alert("An error occured while fetching user data");
    }
  };

  const fetchMessages = async () => {
    const initMessages = async () => {
      const msgRef = doc(db, "users", "messages");
      const docSnap = await getDoc(msgRef);
      const data = docSnap.data();

      if (docSnap.exists) {
        setMessages(data.chat);
      } else {
        await setDoc(doc(db, "users", "messages"), { chat: [] });
        setMessages(data.chat);
      }
    };

    initMessages();
  };

  const addMsg = async () => {
    let newMsg = {
      userID: user?.uid,
      msgID: time,
      body: msgBody,
    };

    // query the messages to find chat
    // spread the messages that exist and add the newMsg --> [...chat,newMsg]
  };

  useEffect(() => {
    if (loading) return;
    if (!user) return navigate("/");
    fetchMessages();

    fetchUserName();
  }, [user, loading]);

  return (
    <div className="container">
      <div className="row">
        <div className="dashboard__container">
          Welcome back, {name}!<div>{user?.email}</div>
          <button
            className="dashboard__btn btn btn-primary border-warning"
            onClick={logout}
          >
            Logout
          </button>
          <hr />
          <div className="row">
            <Message userName={name} msg={"test message"} />
            <p></p>
          </div>
        </div>
      </div>
      <div className=" d-flex align-items-end">
        <div className="input-group mb-3">
          <input
            type="text"
            className="form-control"
            placeholder="What do you want to say?"
            value={msgBody}
            onChange={(e) => {
              setMsgBody(e.target.value);
            }}
          />
          <button
            className="input-group-text"
            id="basic-addon2"
            onClick={() => {
              console.log("send new message");
            }}
          >
            Send
          </button>
        </div>
      </div>
    </div>
  );
}
export default Dashboard;
