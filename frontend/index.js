import { useEffect, useState } from "react";
import axios from "axios";

export default function Home() {
    const [deployments, setDeployments] = useState([]);

    useEffect(() => {
        axios.get("http://localhost:5000/deployments")
            .then(res => setDeployments(res.data))
            .catch(err => console.error(err));
    }, []);

    return (
        <div>
            <h1>DevOps Dashboard</h1>
            <table>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Service Name</th>
                        <th>Status</th>
                        <th>Timestamp</th>
                    </tr>
                </thead>
                <tbody>
                    {deployments.map((dep) => (
                        <tr key={dep.id}>
                            <td>{dep.id}</td>
                            <td>{dep.service_name}</td>
                            <td>{dep.status}</td>
                            <td>{dep.timestamp}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}
