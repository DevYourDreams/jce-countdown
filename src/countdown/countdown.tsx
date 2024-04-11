import React, {useEffect, useState} from "react";
import {useForm} from "react-hook-form";
import {Icon, IconName} from "./icon";

interface ButtonProps {
    value?: string;
    onClick?: () => void;
    isSubmit?: boolean;
    iconName?: IconName,
    disabled?: boolean;
    selected?: boolean;
    warning?: boolean;
}
const Button: React.FC<ButtonProps> = (props) => {
    const type = props.isSubmit ? 'submit' : 'button';
    let color = 'bg-blue-700 hover:bg-blue-800';
    if (props.warning) {
        color = 'bg-red-700 hover:bg-red-800';
    } else if (props.disabled) {
        color = 'bg-gray-400';
    } else if (props.selected) {
        color = 'bg-green-700 hover:bg-green-800';
    }

    const handleClick = () => {
        if (!props.disabled && props.onClick) {
            props.onClick();
        }
    }

    return (
        <button type={type}
                onClick={handleClick}
                className={`${color} text-white focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800`}>
            {props.iconName && <Icon iconName={props.iconName} />}
            {props.value && props.value}
        </button>
    );
}

interface CountdownProps {
    isStarted: boolean;
    isPaused: boolean;
    onSubmit: (time: number) => void;
    onPause: () => void;
    onReset: () => void;
}

const CountdownSetup: React.FC<CountdownProps> = (props) => {
    const {register, handleSubmit} = useForm();
    const [isPause, setIsPause] = useState<boolean>(false);
    const [started, setStarted] = useState<boolean>(false);

    useEffect(() => {
        setStarted(props.isStarted);
        setIsPause(props.isPaused);
    }, [props.isStarted, props.isPaused]);

    return (
        <form onSubmit={handleSubmit((data) => {
            props.onSubmit(data.time);
        })}>
            {!props.isStarted &&
                <div>
                    <input type="number" className="w-48 h-10 text-base rounded" placeholder="Temps de parole" {...register('time')} />
                </div>
            }
            <div>
                {started && <Button value="Reset" onClick={props.onReset} disabled={!isPause} />}
                {started && <Button onClick={props.onPause} value="Pause" warning={isPause}/>}
                {!started && <Button isSubmit={true} value="Start" selected={true} />}
            </div>
        </form>
    );
}

interface CountdownDisplayProps {
    time: number;
    isPause: boolean;
    onTimeEnded: () => void;
}
const CountdownDisplay: React.FC<CountdownDisplayProps> = ({time, isPause, onTimeEnded}) => {
    const [remainingTime, setRemainingTime] = useState<number>(time);
    const [isPaused, setIsPaused] = useState<boolean>(false);
    const [isEnded, setIsEnded] = useState<boolean>(false);
    const [islast30Secondes, setIsLast30Seconds] = useState<boolean>(false);
    const rayonPx = 150;
    const circonference = 2 * Math.PI * rayonPx;
    const strokeWidth = 15;


    useEffect(() => {
        setRemainingTime(time)
    }, [time]);

    useEffect(() => {
        setIsPaused(isPause);
    }, [isPause]);

    useEffect(() => {
        if(isEnded) {
            onTimeEnded();
        }
    }, [isEnded, onTimeEnded]);


    useEffect(() => {
        if(!isPaused) {
            const intervalId = setInterval(() => {
                setRemainingTime((currentTime) => {
                    if (currentTime <= 1) {
                        clearInterval(intervalId);
                        setIsEnded(true);
                        return 0;
                    }
                    if (currentTime <= 30) {
                        setIsLast30Seconds(true);
                    }
                    if (isPaused) {
                        return currentTime;
                    }
                    return currentTime - 1;
                })
            }, 1000);

            return () => clearInterval(intervalId);
        }
    }, [isPaused, remainingTime]);

    const progression = ((time - remainingTime) / time) * circonference;
    const viewSize = (rayonPx + strokeWidth) * 2;
    const view = `0 0 ${viewSize} ${viewSize}`;
    const color = islast30Secondes ? "red" : "#0284c7"

    return (
        <div className="flex justify-center">
            <svg width={viewSize} height={viewSize} viewBox={view}>
                <circle
                    cx={rayonPx + strokeWidth}
                    cy={rayonPx + strokeWidth}
                    r={rayonPx}
                    fill="none"
                    stroke="lightgrey"
                    strokeWidth={strokeWidth}
                />
                <circle
                    cx={rayonPx + strokeWidth}
                    cy={rayonPx + strokeWidth}
                    r={rayonPx}
                    fill="none"
                    stroke={color}
                    strokeWidth={strokeWidth}
                    strokeDasharray={circonference}
                    strokeDashoffset={circonference - progression}
                    transform={`rotate(-90 ${rayonPx + strokeWidth} ${rayonPx + strokeWidth})`}
                />
                <text x="50%" y="50%" fill={color} textAnchor="middle" strokeWidth="1px" dy="0.3em" fontSize="80">
                    {remainingTime}
                </text>
            </svg>
        </div>
    );
}

interface AudioProps {
    source: string;
    play: boolean;

}
export const AudioComponent: React.FC<AudioProps> = (props) => {
    const [audio] = useState(new Audio(props.source));

    useEffect(() => {
        if (props.play) {
            audio.play();
        }
    }, [audio, props.play]);

    return (
        <audio src="../assets/gong.mp3"></audio>
    );
}

interface ISelectPersonProps {
    names: string[];
    display: boolean;
    onSelected: (name: string) => void;
    selected?: string
}
const SelectPersonComponent: React.FC<ISelectPersonProps> = (props) => {
    return (
        <React.Fragment>
            {props.display &&
                props.names.map((name, index) => {
                    const background = name === props.selected ? 'bg-blue-200' : 'bg-white';
                    const id = `_${index}`;
                    return (
                        <React.Fragment key={index}>
                            <input id={id} type="radio" value="2" className="invisible"/>
                            <button value={name} onClick={() => props.onSelected(name)}
                                    className={`"px-4 py-2 text-sm font-medium text-gray-900 ${background} border border-gray-200 rounded-xl hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-2 focus:ring-blue-700 focus:text-blue-700 dark:bg-gray-800 dark:border-gray-700 dark:text-white dark:hover:text-white dark:hover:bg-gray-700 dark:focus:ring-blue-500 dark:focus:text-white"`}>
                                <label htmlFor={id}>{name}</label>
                            </button>
                        </React.Fragment>
                    )
                })
            }
        </React.Fragment>
    );
}

export interface ICountdownProps {
    names?: string[];
    onSelectedName?: (name: string) => void;
    setCountdownRunning: (isRunning: boolean) => void;
}
export const Countdown: React.FC<ICountdownProps> = (props) => {
    const [time, setTime] = React.useState<number | undefined>(undefined);
    const [isStarted, setIsStarted] = React.useState<boolean>(false);
    const [isPaused, setIsPaused] = React.useState<boolean>(false);
    const [isEnded, setIsEnded] = React.useState<boolean>(false);
    const audioRef = React.useRef(null);

    const setInitialTime = (time: number) => {
        resetTimeValues();
        setTime(time);
        setIsStarted(true);
        props.setCountdownRunning(true);
    }

    const resetTimeValues = () => {
        setIsStarted(false);
        setIsEnded(false);
        setIsPaused(false);
        setTime(undefined);
    }

    const reset = () => {
        resetTimeValues()
        setSelectedName(undefined)
        props.setCountdownRunning(false);
        props.onSelectedName!('');
    }

    const togglePause = () => {
        setIsPaused(!isPaused);
    }

    const handleEnded = () => {
        setIsEnded(true);
        setIsPaused(true);
    }

    const [selectedName, setSelectedName] = useState<string | undefined>(undefined);
    const handleSelected = (name: string) => {
        props.onSelectedName && props.onSelectedName(name);
        setSelectedName(name)
    }

    return (
        <div>
            {props.names && props.onSelectedName && <SelectPersonComponent names={props.names} display={!isStarted} onSelected={handleSelected} selected={selectedName}></SelectPersonComponent>}
            {time && <div>
                <CountdownDisplay time={time} isPause={isPaused} onTimeEnded={handleEnded}/>
            </div>}
            {<CountdownSetup onSubmit={setInitialTime} onPause={togglePause} onReset={reset} isPaused={isPaused}
                             isStarted={isStarted}/>}

        </div>
    );

}
