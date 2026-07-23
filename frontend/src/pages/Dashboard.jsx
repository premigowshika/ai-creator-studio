import { useState } from "react";
import { useEffect } from "react";
import api from "../services/api";

function Dashboard() {

    const [prompt, setPrompt] = useState("");
    const [imageUrl, setImageUrl] = useState("");
    const [loading, setLoading] = useState(false);
    const [history, setHistory] = useState([]);
    
    const generateImage = async () => {

    if (!prompt.trim()) {
        alert("Please enter a prompt.");
        return;
    }

    try {

        setLoading(true);

        const response = await api.post("/ai/generate-image", {
    prompt: prompt
});

setImageUrl(response.data.imageUrl);

// Refresh history
loadHistory();

    } catch (error) {

        console.error(error);

        alert("Image generation failed.");

    } finally {

        setLoading(false);

    }

};

const loadHistory = async () => {

    try {

        const response = await api.get("/ai/history");

        setHistory(response.data);

    } catch (error) {

        console.log(error);

    }

};

useEffect(() => {

    loadHistory();

}, []);

    return (

        <div className="container mt-5">

            <h1 className="text-center mb-4">
                🚀 AI Creator Studio
            </h1>

            <div className="card shadow p-4">

                <h3>🖼 Text to Image</h3>

                <p>
                    Describe the image you want AI to generate.
                </p>

                <textarea
                    className="form-control"
                    rows="4"
                    placeholder="Example: A futuristic city at sunset..."
                    value={prompt}
                    onChange={(e) => setPrompt(e.target.value)}
                />

                <button
    className="btn btn-primary mt-3"
    onClick={generateImage}
    disabled={loading}
>

    {loading ? "Generating..." : "Generate Image"}

</button>

            </div>

            <div className="card shadow mt-4 p-4">

                <h4>Generated Image</h4>

                <div
                    style={{
                        height: "400px",
                        border: "2px dashed #ccc",
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center"
                    }}
                >

                    {imageUrl ? (

    <img
        src={imageUrl}
        alt="Generated"
        className="img-fluid rounded"
        style={{ maxHeight: "500px" }}
    />

) : (

    <p>Your AI image will appear here</p>

)}

                </div>

            </div>
            <div className="card shadow mt-4 p-4">

    <h4 className="mb-4">Previous Images</h4>

    <div className="row">

        {history.length === 0 ? (

            <p>No images generated yet.</p>

        ) : (

            history.map((item) => (

                <div className="col-md-4 mb-4" key={item.id}>

                    <div className="card h-100 shadow-sm">

                        <img
                            src={item.imageUrl}
                            alt={item.prompt}
                            className="card-img-top"
                            style={{
                                height: "250px",
                                objectFit: "cover"
                            }}
                        />

                        <div className="card-body">

                            <h6>{item.prompt}</h6>

                            <small className="text-muted">
                                {new Date(item.createdAt).toLocaleString()}
                            </small>

                        </div>

                    </div>

                </div>

            ))

        )}

    </div>

</div>

        </div>

    );

}

export default Dashboard;