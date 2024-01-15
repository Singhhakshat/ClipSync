import { useState } from "react";
import localforage from 'localforage';
import { useNavigate } from "react-router-dom";


export default function Join(){
    const navigate = useNavigate();

    const [name, setName] = useState('');
    const [room, setRoom] = useState('');
    const [click, setClick] = useState(false);

    const generateCode = (event) => {
        event.preventDefault();
        const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz1234567890"
        let code = '';

        for(let i = 1; i <= 10; i++){
            const randomIndex = Math.floor(Math.random()*characters.length);
            code+=characters.charAt(randomIndex);
        }
        setRoom(code);
        setClick(true);
    }

    const joinRoom = (event) => {
        event.preventDefault();
        localforage.setItem('roomId', room);
        localforage.setItem('name', name);
        navigate('/');
    }

    return(
        <div className="join">
            <h2>Let's get started!</h2>
            <form>
                    <input 
                        type="text" 
                        placeholder="Enter Device Name"
                        value={name} 
                        onChange={(ev) => setName(ev.target.value)}
                    />
                    <input
                        type="text" 
                        placeholder="Enter Clip-Sync Room Code"
                        value={room} 
                        onChange={(ev) => setRoom(ev.target.value)}
                    />
                    <h3>New here?</h3>
                    <button onClick={generateCode}>Generate your room code</button>
                    {click && <h6>You need this code to connect other devices</h6>}
                    <button onClick={joinRoom}>Take me there!</button>
                </form>
        </div>
    );
}