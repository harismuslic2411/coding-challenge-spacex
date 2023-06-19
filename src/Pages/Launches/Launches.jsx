import React, { useEffect, useState } from "react";
import { LAUNCHES_URL } from "../../constants/constants";
import { useHttpClient } from "../../hooks/useHttp";

import Container from "../../Components/Container"
import ActivityIndicator from "../../Components/ActivityIndicator";
import LaunchItem from "../../Components/LaunchItem";
import ErrorComponent from "../../Components/ErrorComponent";

const Launches = () => {

    const { sendRequest, isLoading, error, clearError } = useHttpClient();

    const [launchData, setLaunchData] = useState(null);

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
            {launchData === null && isLoading && <ActivityIndicator />}
            {error &&  <ErrorComponent error={error} handleError={handleError}/>}
            {launchData !== null && !isLoading && <div className="launches__container">
                <LaunchItem key={launchData.id} item={launchData} />
            </div>}
        </Container>
    )
}

export default Launches;