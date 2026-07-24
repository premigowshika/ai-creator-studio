function DashboardNavbar({
    userEmail,
    darkMode,
    setDarkMode,
    navigate,
    logout
}) {

    return (

        <nav className="navbar navbar-expand-lg navbar-dark bg-dark rounded shadow px-4 mb-4">

            <div className="container-fluid">

                <span className="navbar-brand fs-3 fw-bold">
                    🤖 AI Creator Studio
                </span>

                <div className="d-flex align-items-center">

                    <span className="text-white me-4">
                        👋 {userEmail}
                    </span>

                    <button
                        className="btn btn-secondary me-2"
                        onClick={() => setDarkMode(!darkMode)}
                    >
                        {darkMode ? "☀️ Light" : "🌙 Dark"}
                    </button>

                    <button
                        className="btn btn-primary me-2"
                        onClick={() => navigate("/profile")}
                    >
                        👤 Profile
                    </button>

                    <button
                        className="btn btn-danger"
                        onClick={logout}
                    >
                        Logout
                    </button>

                </div>

            </div>

        </nav>

    );

}

export default DashboardNavbar;