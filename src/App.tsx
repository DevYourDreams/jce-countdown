import React from 'react';
import './App.css';
import {Countdown} from "./countdown/countdown";
import jce from './assets/jce-cannes.png';
import qrCode from './assets/qr_code.jpeg'

function App() {
  return (
    <div className="App">
        <header className="App-header">
            <img src={jce} alt='JCE Cannes' width="800px" className="mt-20"/>
            {/*<AudioComponent source={'./assets/metal_gong.mp3'} play={true} />*/}
            <div>
                <Countdown/>
            </div>
            <div className="qr-code">
                <img src={qrCode} width="300" height="300" alt='QR Code' className="mb-1"/>
                <div className="text-blue-500 text-opacity-80 text-lg mb-3">Scannez moi pour poser vos questions</div>
            </div>
        </header>
    </div>
  );
}

export default App;
