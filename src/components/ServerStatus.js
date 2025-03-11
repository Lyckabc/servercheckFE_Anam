import React, { useState, useEffect } from "react";
import LogViewer from "./LogViewer";
import "./ServerStatus.css";

const ServerStatus = () => {
  const [servers, setServers] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchServerStatus = () => {
    setLoading(true);
    fetch("http://localhost:8000/check_server_all/")
      .then((response) => response.json())
      .then((data) => {
        setServers(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchServerStatus();
  }, []);

  if (loading) return <p>Loading...</p>;

  return (
    <div className="server-status">
      <button onClick={fetchServerStatus} className="refresh-button">🔄 서버 상태 확인</button>
      {servers.map((server, index) => (
        <div key={index} className="server-container">
          <h2>{server.server}</h2>
          <p>IP: {server.ip}</p>
          <p>Ping: {server.status.ping === "OK" ? "✅ 정상" : "❌ 오류"}</p>
          {server.status.windows && (
            <p>Windows: {server.status.windows.hw_status ? "✅ 정상" : "❌ 오류"}</p>
          )}
          {server.status.linux && (
            <p>Linux: {server.status.linux.hw_status ? "✅ 정상" : "❌ 오류"}</p>
          )}
          {server.status.nas && (
            <p>NAS: {server.status.nas.connection_status ? "✅ 정상" : "❌ 오류"}</p>
          )}
          <LogViewer logs={server.status.event_logs} />
        </div>
      ))}
    </div>
  );
};

export default ServerStatus;