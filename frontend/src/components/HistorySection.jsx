import ImageCard from "./ImageCard";

function HistorySection({
    search,
    setSearch,
    sortBy,
    setSortBy,
    showFavoritesOnly,
    setShowFavoritesOnly,
    currentImages,
    currentPage,
    setCurrentPage,
    totalPages,
    darkMode,
    toggleFavorite,
    deleteImage,
    setSelectedImage,
    history
}) {

    return (

        <div
            className={`card shadow mt-4 p-4 ${
                darkMode ? "bg-dark text-white border-light" : ""
            }`}
        >

            <input
                type="text"
                className="form-control mb-4"
                placeholder="Search by prompt..."
                value={search}
                onChange={(e) => {
                    setSearch(e.target.value);
                    setCurrentPage(1);
                }}
            />

            <select
                className="form-select mb-3"
                value={sortBy}
                onChange={(e) => {
                    setSortBy(e.target.value);
                    setCurrentPage(1);
                }}
            >
                <option value="newest">Newest First</option>
                <option value="oldest">Oldest First</option>
                <option value="favorites">Favorites First</option>
            </select>

            <button
                className={
                    showFavoritesOnly
                        ? "btn btn-warning mb-3"
                        : "btn btn-outline-warning mb-3"
                }
                onClick={() => {
                    setShowFavoritesOnly(!showFavoritesOnly);
                    setCurrentPage(1);
                }}
            >
                {showFavoritesOnly
                    ? "⭐ Showing Favorites"
                    : "Show Favorites Only"}
            </button>

            <h4 className="mb-4">Previous Images</h4>

            <div className="row">

                {history.length === 0 ? (

                    <p>No images generated yet.</p>

                ) : (

                    currentImages.map((item) => (

                        <ImageCard
                            key={item.id}
                            item={item}
                            darkMode={darkMode}
                            toggleFavorite={toggleFavorite}
                            deleteImage={deleteImage}
                            setSelectedImage={setSelectedImage}
                        />

                    ))

                )}

            </div>

            <div className="d-flex justify-content-center mt-4">

                {Array.from({ length: totalPages }, (_, index) => (

                    <button
                        key={index}
                        className={`btn me-2 ${
                            currentPage === index + 1
                                ? "btn-primary"
                                : "btn-outline-primary"
                        }`}
                        onClick={() => setCurrentPage(index + 1)}
                    >
                        {index + 1}
                    </button>

                ))}

            </div>

        </div>

    );

}

export default HistorySection;