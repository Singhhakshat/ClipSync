import { useState } from "react";
import SettingsOpt from "../components/SettingsOpt";
import localforage from 'localforage';
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";


export default function Settings(){
    const navigate = useNavigate();
    const [newName, setNewName] = useState('');
    let room;
    localforage.getItem('roomId').then((roomId) => {
        room = roomId;
    });

    const renameUser = (ev) => {
        ev.preventDefault();
        alert('UserName changed!');
        localforage.setItem('name', newName);
        setNewName('');
    }    

    const clearData = () => {
        localforage.removeItem('data').then(() => {
            alert('data cleared!');
        })
    }

    const logout = () => {
        localforage.removeItem('name');
        localforage.removeItem('roomId').then(() => {
            clearData();
            alert('logged out!');
            navigate('/Join');
        })
    }

    return(
        <div className="settings">
            <Link to={"/"} className="settingsBack">back</Link>
            <h5>The room Id is {room}</h5>
            {/* <h4>Rename</h4> */}
            <form>
                    <input 
                        type="text" 
                        placeholder="Enter New Name"
                        value={newName} 
                        onChange={(ev) => setNewName(ev.target.value)}
                    />
                    <button onClick={renameUser}>Rename</button>
                </form>
            <SettingsOpt clickFunction={clearData} title={'ClearData'}/>
            <SettingsOpt clickFunction={logout} title={'Logout'}/>
            <h6>logging out will clear the clipboard.</h6>
        </div>
    );
}