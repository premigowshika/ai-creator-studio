import { Link } from "react-router-dom";

function Hero() {
  return (
    <section className="py-5 text-center bg-primary text-white rounded-4 shadow">
      <div className="container">

        <h1 className="display-4 fw-bold">
          Create Stunning AI Content
        </h1>

        <p className="lead mt-3">
          Generate Images, Videos and Speech using Artificial Intelligence.
        </p>

        <div className="mt-4">

          <Link
            to="/register"
            className="btn btn-light btn-lg me-3"
          >
            Get Started
          </Link>

          <Link
            to="/login"
            className="btn btn-outline-light btn-lg"
          >
            Login
          </Link>

        </div>

      </div>
    </section>
  );
}

export default Hero;