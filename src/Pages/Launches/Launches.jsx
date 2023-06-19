import React, { useEffect, useState } from "react";
import { LAUNCHES_URL } from "../../constants/constants";
import { useHttpClient } from "../../hooks/useHttp";

import Container from "../../Components/Container"
import ActivityIndicator from "../../Components/ActivityIndicator";
import LaunchItem from "../../Components/LaunchItem";
import ErrorComponent from "../../Components/ErrorComponent";

const Launches = () => {

    const { sendRequest, isLoading, error, clearError } = useHttpClient();

    const [launchData, setLaunchData] = useState([]);

    const handleError = async () => {
        clearError();
    }

    useEffect(() => {
        const fetchLaunchesData = async () => {
            const response = await sendRequest(LAUNCHES_URL);
            setLaunchData(response);
        }

        fetchLaunchesData();
    }, [error, sendRequest]);

    return(
        <Container>
            {launchData.length > 0 && isLoading && <ActivityIndicator />}
            {error &&  <ErrorComponent error={error} handleError={handleError}/>}
            <div className="launches__container">
                {launchData.length > 1 && launchData.map((item) => {
                    return item.links.flickr.original.length >= 4 && <LaunchItem key={item.id} item={item}/>
                })}
            </div>
        </Container>
    )
}

export default Launches;