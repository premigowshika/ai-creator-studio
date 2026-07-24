function GeneratedImage({
    imageUrl,
    downloadImage,
    darkMode
}) {

    return (

        <div
            className={`card shadow mt-4 p-4 ${
                darkMode ? "bg-dark text-white border-light" : ""
            }`}
        >

            <h4>Generated Image</h4>

            <div
                style={{
                    minHeight: "350px",
                    border: "2px dashed #ccc",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                }}
            >

                {imageUrl ? (

                    <div className="text-center">

                        <img
                            src={imageUrl}
                            alt="Generated"
                            className="img-fluid rounded"
                            style={{
                                maxHeight: "500px"
                            }}
                        />

                        <button
                            className="btn btn-success mt-3"
                            onClick={downloadImage}
                        >
                            ⬇ Download Image
                        </button>

                    </div>

                ) : (

                    <div className="text-center">

                        <h1>🖼</h1>

                        <p>
                            Your generated image will appear here.
                        </p>

                        <small className="text-muted">
                            Enter a prompt and click
                            "Generate Image".
                        </small>

                    </div>

                )}

            </div>

        </div>

    );

}

export default GeneratedImage;