import { useState, useEffect } from "react";//useCallback can be call

function fetchData(callback) {
    setTimeout(() => {
        const mockData = [
            { id: 1, name: "Alice" },
            { id: 2, name: "Bob" },
            { id: 3, name: "Charlie" }
        ];
        callback(mockData);
    }, 2000);
}

function One() {
    const [data, setData] = useState([]);

    useEffect(() => {
        fetchData(setData); // Fetch data and update the state
    }, []);

    return (
        <div>
            <h1>Fetched Data:</h1>
            <ul>
                {data.map(item => (
                    <li key={item.id}>{item.name}</li>
                ))}
            </ul>
        </div>
    );
}

export default One;
