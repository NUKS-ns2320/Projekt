import PhotosUploader from "../PhotosUploader";
import Perks from '../Perks';
import { useState, useEffect } from "react";
import axios from "axios";
import AccountNav from "./AccountNav";
import { Navigate, useParams} from "react-router-dom";

export default function PlacesFormPage(){

    // To je stran za obrazec, kadar želi uporabnik objaviti nepremičnino za najem
    const {id} = useParams();
    const [title, setTitle] = useState('');
    const [address, setAddress] = useState('');
    const [addedPhotos, setAddedPhotos] = useState([]);
    const [description, setDescription] = useState('');
    const [perks, setPerks] = useState([]);
    const [extrainfo, setExtraInfo] = useState('');
    const [checkIn, setCheckIn] = useState('');
    const [checkOut, setCheckOut] = useState('');
    const [maxGuests, setMaxGuests] = useState(1);
    const [redirect, setRedirect] = useState(false);
    useEffect(()=>{

        if(!id){
            return;
        }
        else{
            axios.get('/places' + id).then(
                response => {
                    const {data} = response;
                    setTitle(data.title);
                    setAddress(data.address);
                    setAddedPhotos(data.photos);
                    setDescription(data.description);
                    setPerks(data.perks);
                    setExtraInfo(data.extraInfo);
                    setCheckIn(data.checkIn);
                    setCheckOut(data.checkOut);
                    setMaxGuests(data.maxGuests);

                }
            );
        }

    }, [id]);

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
            // Pomožne funkcije, ki naredijo kodo bolj jedrnato in berljivo
            <>
            {inputHeader(header)}
            {inputDescription(description)}
            </>
        );
    }

    async function savePlace(ev){
        ev.preventDefault();
        const placeData = {title, address, addedPhotos, 
            description, perks, extrainfo, checkIn, 
            checkOut, maxGuests};
        if(id){
            //update

           
            await axios.put('/places', {
                id, 
                ...placeData
            } );
            console.log("dsalnfl");
            setRedirect(true);
        }
        else{

            
            await axios.post('/places', placeData );
            console.log("dsalnfl");
            setRedirect(true);

        }
        
    }

    if (redirect) {

        return <Navigate to={'/account/places'} />
    }

    return(
        // Obrazec
        <div>
            <AccountNav />
                    <form onSubmit = {savePlace}>
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
                                placeholder="14"></input>
                            </div>
                            <div>
                                <h3 className="mt-2 -mb-1">Check out time</h3>
                                <input type="text"
                                value={checkOut}
                                onChange={ev => setCheckOut(ev.target.value)} 
                                placeholder="11"></input>
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
    );
}