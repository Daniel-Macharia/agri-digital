import "./progress-bar.css";

interface ProgressBarProps{
    max: number,
    value: number
};

export default function ProgressBar({max, value}: ProgressBarProps){

    return (<>
    <div id="progress-bar-container" style={{width: `${max}%`}}>
        <div id="progress-bar-filler" style={{width: `${value}%`, height: `${100}%`}}></div>
    </div>
    </>);
}
