import {useEffect, useState} from "react";
import axios from "axios";

export default url => {
    const [isLoading, setIsLoading] = useState(false);
    const [response, setResponse] = useState(null);
    const [error, setError] = useState(null);
    const [options, setOptions] = useState({});

    const doFetch = (options = {}) => {
        setOptions(options);
        setIsLoading(true);
    };

    useEffect(() => {
        if (!isLoading) {
            return;
        }
        axios.post(url, options)
            .then((res) => {
                setResponse({
                    message: res.data.message,
                    class: res.status === 201 ? 'text-success' : 'text-warning'
                });
            })
            .catch((e) => {
                setError({
                    message: 'connecting fail, please try again:)',
                    class: 'text-danger'
                });
                console.log(e);
            })
            .finally(() => {
                setTimeout(() => {
                    setResponse(null);
                    setError(null);
                    setIsLoading(false);
                }, 5000);
            });
    }, [isLoading]);

    return [{isLoading, response, error}, doFetch]
};
