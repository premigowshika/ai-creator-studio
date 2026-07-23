import Hero from "../components/Hero";
import FeatureCard from "../components/FeatureCard";

import {
  FaImage,
  FaVideo,
  FaMicrophone
} from "react-icons/fa";

function Home() {

  return (
    <>

      <Hero />

      <div className="container mt-5">

        <h2 className="text-center mb-5">
          AI Features
        </h2>

        <div className="row g-4">

          <FeatureCard
            icon={<FaImage color="#0d6efd" />}
            title="Text to Image"
            description="Generate amazing AI images using simple prompts."
          />

          <FeatureCard
            icon={<FaVideo color="#198754" />}
            title="Image to Video"
            description="Turn images into stunning cinematic AI videos."
          />

          <FeatureCard
            icon={<FaMicrophone color="#dc3545" />}
            title="Text to Speech"
            description="Convert text into realistic human voices."
          />

        </div>

      </div>

      <section className="container text-center mt-5">

        <h2>Why Choose AI Creator Studio?</h2>

        <div className="row mt-4">

          <div className="col-md-3">
            <h4>⚡ Fast</h4>
          </div>

          <div className="col-md-3">
            <h4>🔒 Secure</h4>
          </div>

          <div className="col-md-3">
            <h4>🆓 Free APIs</h4>
          </div>

          <div className="col-md-3">
            <h4>🎨 Beautiful UI</h4>
          </div>

        </div>

      </section>

    </>
  );

}

export default Home;