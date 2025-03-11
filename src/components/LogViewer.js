import React, { useState } from "react";
import "./LogViewer.css";

const LogViewer = ({ logs }) => {
  const [showLogs, setShowLogs] = useState(false);

  return (
    <div className="log-viewer">
      <button onClick={() => setShowLogs(!showLogs)}>
        {showLogs ? "📉 로그 숨기기" : "📈 로그 보기"}
      </button>
      {showLogs && (
        <div className="log-container">
          {logs && logs.length > 0 ? (
            logs.map((log, index) => <p key={index}>{log}</p>)
          ) : (
            <p>로그가 없습니다.</p>
          )}
        </div>
      )}
    </div>
  );
};

export default LogViewer;