import { useState } from "react";
import ClipItem from "../components/ClipItem";
const { io } = require("socket.io-client");

const socket = io('http://localhost:4000');

localStorage.setItem('roomId', '2234512');
localStorage.setItem('name', 'Akshats Device');

socket.on('connect', () => {
    console.log('connected to server');
    socket.emit('join', localStorage.getItem('roomId'));
});

export default function Root(){
    const [input, setInput] = useState('');
    const [dataBase, setDataBase] = useState([]);

    
    socket.on('getData', (data) => {
        setDataBase([data, ...dataBase]);
    });

    function pasteVal(event){
        event.preventDefault();
        navigator.clipboard.readText()
        .then((clipboardData) => {
            setInput(clipboardData);
        })
    }

    function sendVal(event){
        event.preventDefault();
        const name = localStorage.getItem('name');
        socket.emit('sendData', {name, input});
        setInput('');
    }

    return(
        <>
            <form className="inputForm">
                <input 
                    type="text" 
                    placeholder="Enter the data.."
                    value={input} 
                    onChange={(ev)=>setInput(ev.target.value)}
                />
                <div className="inputButton">
                    <button onClick={pasteVal} className="hover">Paste</button>
                    <button className="hover" onClick={sendVal}>Send</button>
                </div>
            </form>
            {dataBase.map((item) => {
                    return(<ClipItem content={item}/>);
            })}
            {/* <ClipItem content={'test'}/>
            <ClipItem content={'test2'}/> */}
            {/* {dataBase.forEach((element) => {
                <ClipItem content={element}/>
            })} */}
        </>
    );
}