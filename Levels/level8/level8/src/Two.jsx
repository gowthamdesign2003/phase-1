import { useState, useEffect } from "react";

function fetchDataPromise() {//fething the some data
    return new Promise((resolve, reject) => {//create a promise function
        setTimeout(() => {
            const mockData = [
                { id: 1, name: "Alice" },
                { id: 2, name: "Bob" },
                { id: 3, name: "Charlie" }
            ];
            resolve(mockData);//resolve in promise data
        }, 2000);
    });
}

function Two() {//create a function
    const [data, setData] = useState([]);//set data for maping
    const [error, setError] = useState(null);//set error for fetching response 

    useEffect(() => {
        fetchDataPromise()
            .then(response => setData(response))
            .catch(err => setError("Faild to fetching the data"));
    }, []);

    return (
        <div>
            <h1>Fetched Data:</h1>
            {error ? <p style={{ color: "red" }}>{error}</p> : null}
            <ul>
                {data.map(item => (
                    <li key={item.id}>{item.name}</li>
                ))}
            </ul>
        </div>
    );
}

export default Two;
