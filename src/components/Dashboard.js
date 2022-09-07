import React, { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useNavigate } from "react-router-dom";
import "../css/Dashboard.css";
import Chat from "./Chat";
import { auth, db, logout } from "../firebase";
import { query, collection, getDocs, where } from "firebase/firestore";
function Dashboard() {
  const [user, loading, error] = useAuthState(auth);
  const [name, setName] = useState("");
  const [messages, setMessages] = useState([]);
  const navigate = useNavigate();
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

  // GET MSGS
  // const fetchMessages = async()=>{
  // try {

  // }catch(e){

  // }
  // }

  // ADD MSG
  // const addMsg = async ()=>{
  // try {

  // }catch(e){

  // }
  // }

  // DEL MSG
  // const delMsg = async () => {
  //   try {

  //   } catch (e) {

  //   }
  // };

  useEffect(() => {
    if (loading) return;
    if (!user) return navigate("/");
    fetchUserName();
  }, [user, loading]);

  return (
    <div className="container">
      <div className="row">
        <div className="dashboard__container">
          Logged in as
          <div>{name}</div>
          <div>{user?.email}</div>
          <button
            className="dashboard__btn btn btn-primary border-warning"
            onClick={logout}
          >
            Logout
          </button>
          <hr />
          <div className="row">
            <Chat userName={name} msg={"test message"} />
          </div>
        </div>
      </div>
    </div>
  );
}
export default Dashboard;
