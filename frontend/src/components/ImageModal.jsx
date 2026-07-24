function ImageModal({ selectedImage, setSelectedImage }) {

    if (!selectedImage) return null;

    return (

        <div
            className="modal fade show"
            style={{
                display: "block",
                backgroundColor: "rgba(0,0,0,0.7)"
            }}
            tabIndex="-1"
        >

            <div className="modal-dialog modal-lg modal-dialog-centered">

                <div className="modal-content">

                    <div className="modal-header">

                        <h5 className="modal-title">
                            🖼 Image Preview
                        </h5>

                        <button
                            className="btn-close"
                            onClick={() => setSelectedImage(null)}
                        ></button>

                    </div>

                    <div className="modal-body text-center">

                        <img
                            src={selectedImage.imageUrl}
                            alt={selectedImage.prompt}
                            className="img-fluid rounded"
                        />

                        <hr />

                        <h5>{selectedImage.prompt}</h5>

                        <p className="text-muted">
                            {new Date(selectedImage.createdAt).toLocaleString()}
                        </p>

                        <p>
                            {selectedImage.favorite
                                ? "⭐ Favorited"
                                : "☆ Not Favorite"}
                        </p>

                    </div>

                    <div className="modal-footer">

                        <button
                            className="btn btn-secondary"
                            onClick={() => setSelectedImage(null)}
                        >
                            Close
                        </button>

                    </div>

                </div>

            </div>

        </div>

    );

}

export default ImageModal;