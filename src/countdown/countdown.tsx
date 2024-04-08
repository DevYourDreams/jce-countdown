import React, {useEffect, useState} from "react";
import {useForm} from "react-hook-form";

const Button: React.FC<{value: string, onClick?: () => void, isSubmit?: boolean}> = ({value, onClick, isSubmit}) => {
    const type = isSubmit ? 'submit' : 'button';
    return (
        <button type={type}
                onClick={onClick}
                className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">
            {value}
        </button>
    );
}

interface CountdownProps {
    onSubmit: (time: number) => void;
    onPause: (isPause: boolean) => void;
}

const CountdownSetup: React.FC<CountdownProps> = (props) => {
    const {register, handleSubmit} = useForm();
    const [isPause, setIsPause] = useState<boolean>(false);

    const togglePause = () => {
        setIsPause(!isPause);
        props.onPause(!isPause);
    }

    return (
        <form onSubmit={handleSubmit((data) => props.onSubmit(data.time))}>
            <div>
                <input type="number" placeholder="Temps de parole" {...register('time')} />
            </div>
            <div>
                <Button value="Pause" onClick={togglePause} />
                <Button value="Lancer" isSubmit={true}/>
            </div>
        </form>
    );
}

const CountdownDisplay: React.FC<{time: number, isPause: boolean}> = ({time, isPause}) => {
    const [remainingTime, setRemainingTime] = useState<number>(time);
    const rayonPx = 30;
    const circonference = 2 * Math.PI * rayonPx;


    useEffect(() => {
        setRemainingTime(time);

        const intervalId = setInterval(() => {
            setRemainingTime((currentTime) => {
                if (currentTime <= 1) {
                    clearInterval(intervalId);
                    return 0;
                }
                return currentTime - 1;
            })
        }, 1000);

        return () => clearInterval(intervalId);
    }, [time]);

    const progression = ((time - remainingTime) / time) * circonference;

    return (
        <div>
            <svg width="50" height="50" viewBox="0 0 50 50">
                <circle
                    cx="25"
                    cy="25"
                    r={rayonPx}
                    fill="none"
                    stroke="lightgrey"
                    strokeWidth="5"
                />
                <circle
                    cx="25"
                    cy="25"
                    r={rayonPx}
                    fill="none"
                    stroke="blue"
                    strokeWidth="5"
                    strokeDasharray={circonference}
                    strokeDashoffset={circonference - progression}
                    transform="rotate(-90 25 25)"
                />
                <text x="50%" y="50%" textAnchor="middle" stroke="#51c5cf" strokeWidth="1px" dy=".3em">
                    {remainingTime}
                </text>
            </svg>
        </div>
    );
}

export const Countdown: React.FC = () => {
    const [time, setTime] = React.useState<number | undefined>(undefined);
    const [isPause, setIsPause] = React.useState<boolean>(false);

    return (
        <div>
            <CountdownSetup onSubmit={setTime} onPause={setIsPause}/>
            {time && <div>
                <CountdownDisplay time={time} isPause={isPause}/>
            </div>}
        </div>
    );

}
