import { useEffect, useState } from 'react';
import HapticDriver from 'tact-js';
import Connection from './components/Connnection';
import MotorTestSection from './components/MotorTestSection';
import { EventKeySection } from './components/EventKeySection';
import VideoSection from './components/VideoSection';
import { Timer } from './utils/Timer';
import DotModeSection from './components/DotModeSection';
import PathModeSection from './components/PathModeSection';

const APP_ID = '67d0055d69fb8c79a66b1cb6';
const API_KEY = 'Sv3sOVOSeLFl8t8QTKpK';
// const REMOTE_ADDRESS = '192.168.100.102:15881';

export default function App() {
  const [connected, setConnected] = useState<boolean>(false);

  const init = async () => {
    const status = await HapticDriver.init({
      appId: APP_ID,
      apiKey: API_KEY,
      // remote: REMOTE_ADDRESS,
    });

    setConnected(status);
  };

  useEffect(() => {
    if (!connected) {
      init();
    }

    if ('serviceWorker' in navigator) {
      Timer.init().then(() => {});
    }
  }, [connected]);

  return (
    <main className="flex flex-col  items-center min-h-screen p-32">
      <div className="max-w-2xl">
        <div className="flex items-center flex-col gap-5 mb-10">
          <h1 className="text-4xl font-bold">tact-js</h1>
          <Connection connected={connected} />
        </div>

        <div className="grid grid-cols-1 gap-10 items-start ">
          <MotorTestSection />
          {/* If you want to use the Event Key Section, do not change the app id and api key. */}
          <EventKeySection />
          <DotModeSection />
          <PathModeSection />
          <VideoSection />
        </div>
      </div>
    </main>
  );
}
