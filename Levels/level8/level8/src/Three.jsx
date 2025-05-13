import { useState, useEffect } from "react";

function fetchDataPromise() {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            const mockData = [
                { id: 1, name: "Alice" },
                { id: 2, name: "Bob" },
                { id: 3, name: "Charlie" }
            ];
            resolve(mockData);
        }, 2000);
    });
}

async function fetchDataAsync() {
    try {
        const data = await fetchDataPromise();
        return data;
    } catch (error) {
        throw new Error("Failed to fetch data");
    }
}

function Three() {
    const [data, setData] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetchDataAsync();
                setData(response);
            } catch (err) {
                setError(err.message);
            }
        };
        fetchData();
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

export default Three;
