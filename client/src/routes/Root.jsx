import { useEffect, useState } from "react";
import ClipItem from "../components/ClipItem";
import localforage from 'localforage';

const { io } = require("socket.io-client");

const socket = io('http://localhost:4000');

localforage.setItem('roomId', '2234512');
localforage.setItem('name', 'Akshats Device');

socket.on('connect', () => {
    console.log('connected to server');
    localforage.getItem('roomId').then((id) => {
        socket.emit('join', id);
    });
});

export default function Root(){
    const [input, setInput] = useState('');
    const [dataBase, setDataBase] = useState([]);

    useEffect(() => {
        localforage.getItem('data').then((value) =>{
            if(value!=null)
            setDataBase(value);
        })
    }, [])

    useEffect(() => {
        localforage.setItem('data', dataBase);
    }, [dataBase])

    
    socket.on('getData', (data) => {
        setDataBase([data, ...dataBase]);
        // localforage.setItem('data', dataBase);
        // localforage.getItem('data').then((val) => {
        //     if(val != null) console.log(val);
        // });

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
        localforage.getItem('name').then((name) => {
            socket.emit('sendData', {name, input});
        });
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
        </>
    );
}