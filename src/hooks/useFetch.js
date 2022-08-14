import {useEffect, useState} from "react";
import axios from "axios";

export default () => {
    const [isLoading, setIsLoading] = useState(false);
    const [response, setResponse] = useState(null);
    const [error, setError] = useState(null);
    const [url, setUrl] = useState('');
    const [config, setConfig] = useState({});
    const [payload, setPayload] = useState({});
    const defaultFetchConfig = { method: 'post' };

    const doFetch = (url, config = defaultFetchConfig, payload = {}) => {
        setUrl(url);
        setConfig(config);
        setPayload(payload);
        setIsLoading(true);
    };

    useEffect(() => {
        if (!isLoading) {
            return;
        }

        const handleRequest = (promise) => promise
            .then((res) => {
                setResponse(res);
            })
            .catch((error) => {
                if (error.response.status === 404) {
                    setError({
                        message: 'connecting fail, please try again:)',
                    })
                }
            })
            .finally(() => {
                setTimeout(() => {
                    setError(null);
                    setIsLoading(false);
                }, 5000);
            });

        switch (config.method) {
            case 'get': {

                handleRequest(axios.get(url));
                break;
            }
            default: {

                handleRequest(axios.post(url, payload));
            }
        }
    }, [isLoading]);

    return [{ isLoading, response, error }, doFetch]
};
