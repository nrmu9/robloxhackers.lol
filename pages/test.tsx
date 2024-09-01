import React, { useState, useEffect } from 'react';
import axios from 'axios';

// Define the type for Exploit directly in this file
interface Exploit {
    title: string;
    updateStatus: boolean;
}

const ExploitStatus: React.FC = () => {
    const [exploits, setExploits] = useState<Exploit[]>([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get<Exploit[]>('https://whatexpsare.online/api/status/exploits', {
                    headers: {
                        'User-Agent': 'WEAO-3PService'
                    }
                });
                setExploits(response.data.map(exploit => ({
                    title: exploit.title,
                    updateStatus: exploit.updateStatus
                })));
            } catch (error) {
                console.error('Error fetching the exploit status:', error);
            }
        };

        fetchData(); // Fetch data initially

        const interval = setInterval(fetchData, 5 * 60 * 1000); // Fetch data every 5 minutes

        return () => clearInterval(interval); // Clean up interval on unmount
    }, []);

    // Function to determine the color based on updateStatus
    const getStatusColor = (status: boolean) => {
        if (status === true) return 'green';
        if (status === false) return 'red';
        return 'default'; // or any other color you want for the default state
    };

    return (
        <div>
            <ul>
                {exploits.map((exploit, index) => (
                    <li key={index} style={{ color: getStatusColor(exploit.updateStatus) }}>
                        {exploit.title}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default ExploitStatus;
