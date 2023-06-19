import { useState } from "react";

import './LaunchItem.scss';

const LaunchItem = ({item}) => {
    
    const [imageNumber, setImageNumber] = useState(0);
    const [zoomed, setZoomed] = useState(false);

    const getReadableLaunchDate = () => {
        const responseDate = item.date_utc;

        const dateObject = new Date(responseDate);

        const dateDay = dateObject.getDate() < 10 ? "0" + dateObject.getDate() : dateObject.getDate();
        const dateMonth = dateObject.getMonth() < 10 ? "0" + (dateObject.getMonth() + 1) : dateObject.getMonth();
        const dateYear = dateObject.getFullYear();

        const dateString = dateDay + "/" + dateMonth + "/" + dateYear;

        return dateString;
    }

    const handleImageChanger = (control) => {
        if(control === -1 && imageNumber > 0){
            setImageNumber(imageNumber - 1);
        }
        if(control === -1 && imageNumber === 0){
            setImageNumber(item.links.flickr.original.length - 1);
        }
        if(control === 1 && imageNumber < item.links.flickr.original.length - 1){
            setImageNumber(imageNumber + 1);
        }
        if(control === 1 && imageNumber === item.links.flickr.original.length - 1){
            setImageNumber(0);
        }
    }

    const handleRandomImageChanger = () => {
        const maxLimit = item.links.flickr.original.length - 1;

        const randomNum = Math.floor(Math.random() * maxLimit);

        setImageNumber(randomNum);
    }

    const handleZoom = () => {
        setZoomed(!zoomed);
    }

    return(
        <div className="launch__container">
            <div className="launch__data__container">
                <div className="launch__data">
                    <p>Launch Name:</p>
                    <p className="bold">{item.name}</p>
                </div>
                <div className="launch__data">
                    <p>Date of Launch:</p>
                    <p className="bold">{getReadableLaunchDate()}</p>
                </div>
                <div className="launch__data">
                    <p>Flight Number:</p>
                    <p className="bold">{item.flight_number}</p>
                </div>
            </div>
            <div className="launch__images">
                <div className={!zoomed ? "launch__image-in" : "launch__image-out"} onClick={() => handleZoom()}>
                    <img alt={item.id} src={item.links.flickr.original[imageNumber]} />
                </div>
                <div className="image__controller">
                    <div className="arrow previous" onClick={() => handleImageChanger(-1)}></div>
                    <div className="arrow random" onClick={() => handleRandomImageChanger()}></div>
                    <div className="arrow next" onClick={() => handleImageChanger(1)}></div>
                </div>
            </div>
        </div>
    )
}

export default LaunchItem;