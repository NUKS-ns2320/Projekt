import {Link, useParams} from "react-router-dom";
import { useState } from "react";
import Perks from '../Perks';
import axios from "axios";
import PhotosUploader from "../PhotosUploader";


export default function PlacesPage (){

    const {action} = useParams();
    const [title, setTitle] = useState('');
    const [address, setAddress] = useState('');
    const [addedPhotos, setAddedPhotos] = useState([]);
    const [description, setDescription] = useState('');
    const [perks, setPerks] = useState([]);
    const [extrainfo, setExtraInfo] = useState('');
    const [checkIn, setCheckIn] = useState('');
    const [checkOut, setCheckOut] = useState('');
    const [maxGuests, setMaxGuests] = useState(1);

    function inputHeader(text){

        return (
            <h2 className="text-2xl mt-4">{text}</h2>
        );
    }

    function inputDescription(text){

        return (
            <p className="text-gray-500 text-sm">{text}</p>
        );
    }

    function preInput (header, description){
        return(
            <>
            {inputHeader(header)}
            {inputDescription(description)}
            </>
        );
    }

    

    return(

        <div>
            {action !== 'new' && (

                <div className="text-center">
                    <Link className = "inline-flex gap-1 bg-primary text-white py-2 px-6 rounded-full" to= '/account/places/new'>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                        </svg>

                        Add new place
                    </Link>
                </div>
            )}
            
            { action === 'new' && (

                <div>
                    <form>
                        {preInput('Title', 'Title for your place should be short and catchy as in an advertisement')}
                        <input type="text" 
                        value={title} 
                        onChange={ev => setTitle(ev.target.value)}
                        placeholder="title"/>

                        {preInput('Address', 'Address to this place')}
                        <input type="text"
                        value={address}
                        onChange={ev => setAddress(ev.target.value)}
                        placeholder="address"/>

                        {preInput('Photos', 'more = better')}
                    
                        <PhotosUploader addedPhotos={addedPhotos} onChange={setAddedPhotos}/>
                        
                        {preInput('Description', 'Description of the place')}
                     
                        <textarea 
                        value={description}
                        onChange={ev => setDescription(ev.target.value)}>
                        </textarea>
                        {preInput('Perks', 'Select all of the perks of your place')}
                        
                        <Perks selected = {perks} onChange={setPerks}/>
                        

                        {preInput('Extra Info', 'House rules, etc.')}
                       
                        <textarea
                        value={extrainfo}
                        onChange={ev => setExtraInfo(ev.target.value)}>
                        </textarea>
                        {preInput('Check in&out times', 'Add check in and check out times, remember to have some times window for cleaning the room between guests')}
                     
                        <div className="grid gap-2 sm:grid-cols-3">

                            <div>
                                <h3 className="mt-2 -mb-1">Check in time</h3>
                                <input type="text" 
                                value={checkIn}
                                onChange={ev => setCheckIn(ev.target.value)}
                                placeholder="14:00"></input>
                            </div>
                            <div>
                                <h3 className="mt-2 -mb-1">Check out time</h3>
                                <input type="text"
                                value={checkOut}
                                onChange={ev => setCheckOut(ev.target.value)} 
                                placeholder="11:00"></input>
                            </div>
                            <div>
                                <h3 className="mt-2 -mb-1">Max number of guests</h3>
                                <input type="number"
                                value={maxGuests}
                                onChange={ev => setMaxGuests(ev.target.value)} 
                                placeholder="2"></input>

                            </div>
                        </div>

                      
                            <button className="primary my-4">Save</button>
                    
                    </form>
                </div>

            )}
            
            
        </div>
    );
}