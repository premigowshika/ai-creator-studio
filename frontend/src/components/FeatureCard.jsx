function FeatureCard({ icon, title, description }) {
  return (
    <div className="col-md-4">

      <div className="card shadow-lg border-0 h-100">

        <div className="card-body text-center">

          <div className="display-3 mb-3">
            {icon}
          </div>

          <h3>{title}</h3>

          <p className="text-muted">
            {description}
          </p>

        </div>

      </div>

    </div>
  );
}

export default FeatureCard;