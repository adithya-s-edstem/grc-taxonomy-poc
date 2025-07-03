import { useState } from "react";
import App2 from "./App2";
import App3 from "./App3";
import App4 from "./App4";

export const Navigate = () => {
  const [app, setApp] = useState(2);
  const apps = {
    0: App2,
    1: App3,
    2: App4,
  };

  const CurrentApp = apps[app];

  return (
    <div className="flex flex-col gap-2">
      <div className="flex items-center gap-4">
        <button
          onClick={() => setApp(0)}
          className={app === 0 ? "bg-amber-500" : ""}
        >
          Example 1
        </button>
        <button
          onClick={() => setApp(1)}
          className={app === 1 ? "bg-amber-500" : ""}
        >
          Example 2
        </button>
        <button
          onClick={() => setApp(2)}
          className={app === 2 ? "bg-amber-500" : ""}
        >
          Example 3
        </button>
      </div>
      <CurrentApp />
    </div>
  );
};
