function StatsCards({ history }) {

    const totalImages = history.length;

    const favoriteImages = history.filter(
        (item) => item.favorite
    ).length;

    const todayImages = history.filter(
        (item) =>
            new Date(item.createdAt).toDateString() ===
            new Date().toDateString()
    ).length;

    return (

        <div className="row mb-4">

            <div className="col-md-4 mb-3">

                <div className="card bg-primary text-white shadow">

                    <div className="card-body text-center">

                        <h5>Total Images</h5>

                        <h1>{totalImages}</h1>

                    </div>

                </div>

            </div>

            <div className="col-md-4 mb-3">

                <div className="card bg-success text-white shadow">

                    <div className="card-body text-center">

                        <h5>Favorites</h5>

                        <h1>{favoriteImages}</h1>

                    </div>

                </div>

            </div>

            <div className="col-md-4 mb-3">

                <div className="card bg-warning text-dark shadow">

                    <div className="card-body text-center">

                        <h5>Today's Images</h5>

                        <h1>{todayImages}</h1>

                    </div>

                </div>

            </div>

        </div>

    );

}

export default StatsCards;