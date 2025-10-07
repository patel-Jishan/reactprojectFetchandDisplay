import { useState, useEffect } from "react";

export function Stopwatch() {
  let [seconds, setSeconds] = useState(0);
  let [isRunning, setIsRunning] = useState(false);
  let [targetTime, setTargetTime] = useState(10);

  const playSound = () => {
    const audio = new Audio("/audio.mp3");
    audio.play().catch((err) => {
      console.warn("Playback prevented:", err);
    });
  };

  useEffect(() => {
    let timer;
    if (isRunning) {
      timer = setInterval(() => {
        setSeconds((prev) => prev + 1);
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [isRunning]);

  useEffect(() => {
    if (seconds === targetTime) {
      playSound();
      console.log("🎯 Target Reached!");
    }
  }, [seconds, targetTime]);

  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      {/* ---- Internal CSS with Cyberpunk animation ---- */}
      <style>{`
        body {
          background: #5b79baff;
        }
        .stopwatch-wrap {
          font-family: 'Orbitron', sans-serif;
          color: #e6f1ff;
          text-shadow: 0 0 10px rgba(0,224,255,0.5);
        }

        h1 {
          margin-bottom: 6px;
          font-size: 2.2rem;
          letter-spacing: 2px;
          animation: glowText 2s infinite alternate;
        }
        h2 {
          margin-top: 0;
          font-weight: 600;
          color: #b8d9ff;
        }

        /* Cyberpunk button */
        .cyber-btn {
          position: relative;
          padding: 12px 28px;
          margin: 10px;
          font-size: 16px;
          font-weight: 700;
          letter-spacing: 1px;
          color: #fff;
          border: 2px solid #00e0ff;
          border-radius: 10px;
          background: linear-gradient(90deg, #0f1724, #1a2338);
          cursor: pointer;
          overflow: hidden;
          transition: transform 0.2s ease, box-shadow 0.2s ease;
          animation: neonPulse 2.2s infinite;
        }

        .cyber-btn:hover {
          transform: translateY(-3px) scale(1.05);
          box-shadow: 0 0 20px #00e0ff, 0 0 40px #ff2d95;
        }

        .cyber-btn:active {
          transform: scale(0.92);
          box-shadow: 0 0 25px #ff2d95 inset, 0 0 35px #00e0ff inset;
        }

        /* Ripple effect */
        .cyber-btn::after {
          content: "";
          position: absolute;
          left: 50%;
          top: 50%;
          width: 10px;
          height: 10px;
          background: rgba(0,224,255,0.8);
          border-radius: 50%;
          transform: translate(-50%, -50%) scale(0);
          opacity: 0;
          pointer-events: none;
        }
        .cyber-btn:active::after {
          animation: ripple 0.6s ease-out forwards;
        }

        /* Keyframes */
        @keyframes glowText {
          from { text-shadow: 0 0 8px #00e0ff, 0 0 20px #ff2d95; }
          to { text-shadow: 0 0 20px #ff2d95, 0 0 40px #00e0ff; }
        }

        @keyframes neonPulse {
          0%, 100% { box-shadow: 0 0 10px #00e0ff, 0 0 20px #ff2d95 inset; }
          50% { box-shadow: 0 0 20px #ff2d95, 0 0 40px #00e0ff inset; }
        }

        @keyframes ripple {
          0% { transform: translate(-50%, -50%) scale(0.2); opacity: 0.9; }
          70% { transform: translate(-50%, -50%) scale(3); opacity: 0.3; }
          100% { transform: translate(-50%, -50%) scale(4); opacity: 0; }
        }

        /* Input styling */
        .time-input {
          margin-left: 10px;
          padding: 8px 10px;
          border-radius: 6px;
          border: 1px solid #00e0ff;
          background: #111827;
          color: #e6f1ff;
          outline: none;
          box-shadow: 0 0 8px #00e0ff inset;
        }
        .time-input:focus {
          box-shadow: 0 0 12px #ff2d95 inset, 0 0 12px #00e0ff;
        }
      `}</style>

      <div className="stopwatch-wrap">
        <h1>⏱ Stopwatch</h1>
        <h2>Elapsed Time: {seconds} sec</h2>

        <div>
          <button className="cyber-btn" onClick={() => setIsRunning(true)}>Start</button>
          <button className="cyber-btn" onClick={() => setIsRunning(false)}>Stop</button>
          <button
            className="cyber-btn"
            onClick={() => {
              setIsRunning(false);
              setSeconds(0);
            }}
          >
            Reset
          </button>
        </div>

        <div style={{ marginTop: "15px" }}>
          <label>
            Set Target Time (sec):{" "}
            <input
              type="number"
              className="time-input"
              value={targetTime}
              onChange={(e) => setTargetTime(Number(e.target.value))}
            />
          </label>
        </div>
      </div>
    </div>
  );
}
