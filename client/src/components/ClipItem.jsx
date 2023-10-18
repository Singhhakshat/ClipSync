export default function ClipItem(props){
    function copyToClipboard(){
        navigator.clipboard.writeText(props.content.input);
    }

    return(
        <div>
            <p className="clipUserName">{props.content.name}</p>
            <div className="clipItem">
                <p> {props.content.input} </p>
                <button onClick={copyToClipboard}>Copy Text</button>
                </div>
        </div>
    );
}