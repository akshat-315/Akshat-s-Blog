import React, { useEffect, useState } from "react";
import { DashSidebar } from "../components/DashSidebar";
import { useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import DashProfile from "../components/DashProfile";
import { DashPosts } from "../components/DashPosts";

const Dashboard = () => {
  const location = useLocation();
  const dispatch = useDispatch();
  const { currentUser } = useSelector((state) => state.user);
  const [tab, setTab] = useState("");

  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const tabFromUrl = urlParams.get("tab");
    if (tabFromUrl) {
      setTab(tabFromUrl);
    }
  }, [location.search]);

  return (
    <div className="min-h-screen flex flex-col md:flex-row">
      <div className="md:w-56">
        <DashSidebar />
      </div>
      {tab === "profile" && <DashProfile />}
      {tab === "posts" && <DashPosts />}
    </div>
  );
};

export default Dashboard;
