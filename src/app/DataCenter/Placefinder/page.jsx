// 'use client'
// import React, { useEffect, useState } from 'react';
// import axios from '../../../../utils/axios';

// function Placefinder() {
//     const [data, setData] = useState(null);

//     useEffect(() => {
//         const fetchData = async () => {
//             try {
//                 const response = await axios.get('/countries/positions');
//                 console.log('Response data:', response.data);

//                 // Assuming the array is nested within the 'data' property
//                 setData(response.data.data);
//             } catch (error) {
//                 console.error('Error fetching data:', error);
//             }
//         };

//         fetchData();
//     }, []);

//     // Check if data is an array before mapping
//     if (!Array.isArray(data)) {
//         console.error('Data is not an array:', data);
//         return <div>Error loading data</div>;
//     }


//     // useEffect(() => {
//     //     const fetchData = async () => {
//     //         try {
//     //             const response = await axios.get('/countries/positions');
//     //             setData(response.data);
//     //         } catch (error) {
//     //             console.error('Error fetching data:', error);
//     //         }
//     //     };

//     //     fetchData();
//     // }, []);

//     return (
//         <div>
//             <h1>My Next.js App</h1>
//             {/* {data && <pre>{JSON.stringify(data, null, 2)}</pre>} */}
//             <ul>
//                 {data.map((country, index) => (
//                     <li key={index}>
//                         <strong>Name:</strong> {country.name} <br />
//                         <strong>ISO2:</strong> {country.iso2} <br />
//                         <strong>Longitude:</strong> {country.long} <br />
//                         <strong>Latitude:</strong> {country.lat} <br />
//                         <hr />
//                     </li>
//                 ))}
//             </ul>
//         </div>
//     )
// }

// export default Placefinder