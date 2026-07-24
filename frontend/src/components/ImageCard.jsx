function ImageCard({
    item,
    darkMode,
    toggleFavorite,
    deleteImage,
    setSelectedImage
}) {

    return (

        <div className="col-md-4 mb-4">

            <div
                className={`card h-100 shadow-sm ${
                    darkMode ? "bg-secondary text-white" : ""
                }`}
            >

                <img
                    src={item.imageUrl}
                    alt={item.prompt}
                    className="card-img-top"
                    style={{
                        height: "250px",
                        objectFit: "cover",
                        cursor: "pointer"
                    }}
                    onClick={() => setSelectedImage(item)}
                />

                <div className="card-body">

                    <h6>{item.prompt}</h6>

                    <small className="text-muted">
                        {new Date(item.createdAt).toLocaleString()}
                    </small>

                    <div className="mt-3 d-flex gap-2">

                        <button
                            className={
                                item.favorite
                                    ? "btn btn-warning btn-sm"
                                    : "btn btn-outline-warning btn-sm"
                            }
                            onClick={() => toggleFavorite(item.id)}
                        >
                            {item.favorite
                                ? "⭐ Favorited"
                                : "☆ Favorite"}
                        </button>

                        <button
                            className="btn btn-danger btn-sm"
                            onClick={() => deleteImage(item.id)}
                        >
                            🗑 Delete
                        </button>

                    </div>

                </div>

            </div>

        </div>

    );

}

export default ImageCard;