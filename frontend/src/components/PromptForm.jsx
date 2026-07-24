function PromptForm({
    prompt,
    setPrompt,
    generateImage,
    loading,
    darkMode
}) {

    return (

        <div
            className={`card shadow p-4 ${
                darkMode ? "bg-dark text-white border-light" : ""
            }`}
        >

            <h3>🖼 Text to Image</h3>

            <p>Describe the image you want AI to generate.</p>

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

                {loading ? (
                    <>
                        <span
                            className="spinner-border spinner-border-sm me-2"
                            role="status"
                            aria-hidden="true"
                        ></span>

                        Generating...
                    </>
                ) : (
                    "🚀 Generate Image"
                )}

            </button>

        </div>

    );

}

export default PromptForm;