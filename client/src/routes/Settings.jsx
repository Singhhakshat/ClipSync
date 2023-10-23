import { useState } from "react";
import SettingsOpt from "../components/SettingsOpt";
import localforage from 'localforage';

export default function Settings(){
    const [newName, setNewName] = useState('');

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

    return(
        <div className="settings">
            <h2>Rename</h2>
            {<form>
                    <input 
                        type="text" 
                        placeholder="Enter New Name"
                        value={newName} 
                        onChange={(ev) => setNewName(ev.target.value)}
                    />
                    <button onClick={renameUser}>Rename</button>
                </form>}
            <SettingsOpt clickFunction={clearData} title={'ClearData'}/>
            <SettingsOpt title={'Logout'}/>
        </div>
    );
}