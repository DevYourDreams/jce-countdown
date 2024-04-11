import React, {useEffect} from 'react';
import './App.css';
import {Countdown} from "./countdown/countdown";
import jce from './assets/jce-cannes.png';
import qrCode from './assets/qr_code.jpeg'

export const JCE_COLOR = '#0284c7';

function App() {
    const names = ['Les Jeunes Républicains', 'Les Jeunes Écolos', 'Les Jeunes avec Macron', 'Rassemblement National de la Jeunesse']
    const [selectedName, setSelectedName] = React.useState<string | undefined>(undefined);
    const [isCountdownRunning, setIsCountdownRunning] = React.useState<boolean>(false);

    useEffect(() => {
        if(!isCountdownRunning) {
            console.log('reset selectedName')
            setSelectedName(undefined);
        }
    }, [isCountdownRunning]);

    console.log('selectedName', selectedName)

    return (
        <div className="App column-containers">
            <div className="left-column"></div>
            <div className="middle-column">
                <img src={jce} alt='JCE Cannes' width="800px" className="mt-14"/>
                {/*<AudioComponent source={'./assets/metal_gong.mp3'} play={true} />*/}
                {isCountdownRunning && selectedName && <div className="text-jceBlue text-opacity-80 m-5 font-bold">{selectedName}</div>}
                <div className="mb-3">
                    <Countdown names={names} onSelectedName={setSelectedName}
                               setCountdownRunning={setIsCountdownRunning}/>
                </div>
                <div className="qr-code">
                    <div className="text-jceBlue text-opacity-80 text-lg mb-3">
                        Posez-vos questions aux intervenants en cliquant sur le QR code :
                    </div>
                    <img src={qrCode} width="250" height="250" alt='QR Code' className="mb-1"/>
                </div>
            </div>
            <div className="right-column">
            </div>
        </div>
    );
}

export default App;
