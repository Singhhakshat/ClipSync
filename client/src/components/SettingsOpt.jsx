export default function SettingsOpt({title, clickFunction}){
    return(
        <>
            <button onClick={clickFunction} className="settingsOpt">{title}</button>
        </>
    );
}