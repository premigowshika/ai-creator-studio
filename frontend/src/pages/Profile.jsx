import { useEffect, useState } from "react";

function Profile() {

    const [userEmail, setUserEmail] = useState("");

    useEffect(() => {

        const token = localStorage.getItem("token");

        if (token) {

            try {

                const payload = JSON.parse(atob(token.split(".")[1]));

                // eslint-disable-next-line react-hooks/set-state-in-effect
                setUserEmail(payload.sub);

            } catch (error) {

                console.log(error);

            }

        }

    }, []);

    return (

        <div className="container mt-5">

            <div className="card shadow p-5">

                <h2 className="mb-4">👤 My Profile</h2>

                <table className="table">

                    <tbody>

                        <tr>
                            <th>Email</th>
                            <td>{userEmail}</td>
                        </tr>

                        <tr>
                            <th>Account Type</th>
                            <td>User</td>
                        </tr>

                        <tr>
                            <th>Status</th>
                            <td>
                                <span className="badge bg-success">
                                    Active
                                </span>
                            </td>
                        </tr>

                    </tbody>

                </table>

            </div>

        </div>

    );

}

export default Profile;