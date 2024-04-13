import React, { useState, useEffect } from 'react';

const Booking = () => {
    const [resp, setResp] = useState(null);
    const [input1, setInput1] = useState('');
    const [input2, setInput2] = useState('');
    const [matchingFlights, setMatchingFlights] = useState([]);

    useEffect(() => {
        fetchData();
    }, []);

    async function fetchData() {
        try {
            const response = await fetch('https://6098f0d799011f001713fbf3.mockapi.io/techcurators/products/flights/1');
            if (!response.ok) {
                throw new Error('Please check url and refresh the page');
            }
            const data = await response.json();
            setResp(data);
        } catch (error) {
            console.log('There was a problem with the server', error);
        }
    }

    // Take the inputs from source and destination
    const takeInput1 = (event) => {
        setInput1(event.target.value);
    };

    const takeInput2 = (event) => {
        setInput2(event.target.value);
    };

    // Filter flights based on input1 (source) and input2 (destination)
    const handleSearch = () => {
        const filteredFlights = resp && resp.filter(element => element.source === input1 && element.destination === input2);
        setMatchingFlights(filteredFlights);
    };

    return (
        <div className='outer-div'>
            <h1>Flight Search</h1>
            <div className='inner-div'>
                <form>
                    <input type="text" placeholder='Source' className='input' value={input1} onChange={takeInput1} />
                    <br />
                    <input type="text" placeholder='Destination' className='input' value={input2} onChange={takeInput2} />
                    <br />
                    <button onClick={(e) => { e.preventDefault(); handleSearch(); }}>Search</button>
                </form>
            </div>
            <div className='result'>
                {
                    matchingFlights && matchingFlights.length > 0 ? (
                        matchingFlights.map((element, id) => (
                            <React.Fragment key={id}>
                                <table>
                                    <thead>
                                        <tr>
                                            <th>DEPARTURE</th>
                                            <th>DURATION</th>
                                            <th>ARRIVAL</th>
                                            <th>PRICE</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td>{element.departure}</td>
                                            <td>{element.duration}</td>
                                            <td>{element.arrival}</td>
                                            <td>{element.price}</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </React.Fragment>
                        ))
                    ) : (
                        <h1>No flights available</h1>
                    )
                }
            </div>
        </div>
    );
};

export default Booking;
