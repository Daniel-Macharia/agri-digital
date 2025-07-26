interface ProgressBarProps{
    max: number,
    value: number,
    fillColor: string,
    backColor: string
};

export default function ProgressBar({max, value, fillColor, backColor}: ProgressBarProps){

    return (<>
    <div className="col-12 m-0 p-0" 
    style={{width: `${max}%`, 
    backgroundColor: backColor, 
    borderStyle: "none", 
    borderRadius: "4px",
    height: "10px"}}>

        <div className="col-12 m-0" 
        style={{width: `${value}%`, 
        height: `${100}%`, 
        backgroundColor: fillColor, 
        borderStyle: "none", 
        borderRadius: "4px"}}></div>

    </div>
    </>);
}
