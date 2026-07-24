import { useState } from "react";
import { useEffect } from "react";
import api from "../services/api";
import { useNavigate } from "react-router-dom";
import DashboardNavbar from "../components/DashboardNavbar";
import StatsCards from "../components/StatsCards";
import PromptForm from "../components/PromptForm";
import GeneratedImage from "../components/GeneratedImage";
import HistorySection from "../components/HistorySection";
import ImageModal from "../components/ImageModal";

function Dashboard() {
  const [prompt, setPrompt] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [history, setHistory] = useState([]);
  const [userEmail, setUserEmail] = useState("");
  const [search, setSearch] = useState("");
  const [showFavoritesOnly, setShowFavoritesOnly] = useState(false);
  const [sortBy, setSortBy] = useState("newest");
  const [currentPage, setCurrentPage] = useState(1);
  const imagesPerPage = 6;
  const [darkMode, setDarkMode] = useState(() => {
    return localStorage.getItem("darkMode") === "true";
  });
  const [selectedImage, setSelectedImage] = useState(null);

  const generateImage = async () => {
    if (!prompt.trim()) {
      alert("Please enter a prompt.");
      return;
    }

    try {
      setLoading(true);

      const response = await api.post("/ai/generate-image", {
        prompt: prompt,
      });

      setImageUrl(response.data.imageUrl);

      // Refresh history
      loadHistory();
    } catch (error) {
      console.error(error);

      alert("Image generation failed.");
    } finally {
      setLoading(false);
    }
  };
  const downloadImage = async () => {
    if (!imageUrl) {
      alert("No image available to download.");
      return;
    }

    try {
      const response = await fetch(imageUrl);

      const blob = await response.blob();

      const url = window.URL.createObjectURL(blob);

      const link = document.createElement("a");

      link.href = url;
      link.download = "ai-image.png";

      document.body.appendChild(link);

      link.click();

      document.body.removeChild(link);

      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error(error);

      alert("Failed to download image.");
    }
  };
  const deleteImage = async (id) => {
    if (!window.confirm("Delete this image?")) return;

    try {
      await api.delete(`/ai/history/${id}`);

      loadHistory();
    } catch (error) {
      console.log(error);

      alert("Delete failed.");
    }
  };
  const loadHistory = async () => {
    try {
      const response = await api.get("/ai/history");

      setHistory(response.data);
    } catch (error) {
      console.log(error);
    }
  };
  const loadUser = () => {
    const token = localStorage.getItem("token");

    if (!token) return;

    try {
      const payload = JSON.parse(atob(token.split(".")[1]));

      setUserEmail(payload.sub);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    loadHistory();
    // eslint-disable-next-line react-hooks/set-state-in-effect
    loadUser();
  }, []);
  useEffect(() => {
    localStorage.setItem("darkMode", darkMode);
  }, [darkMode]);
  const logout = () => {
    localStorage.removeItem("token");
    window.location.href = "/login";
  };
  const navigate = useNavigate();
  const filteredHistory = history
    .filter((item) => item.prompt.toLowerCase().includes(search.toLowerCase()))
    .filter((item) => (showFavoritesOnly ? item.favorite : true))
    .sort((a, b) => {
      if (sortBy === "newest") {
        return new Date(b.createdAt) - new Date(a.createdAt);
      }

      if (sortBy === "oldest") {
        return new Date(a.createdAt) - new Date(b.createdAt);
      }

      if (sortBy === "favorites") {
        return Number(b.favorite) - Number(a.favorite);
      }

      return 0;
    });
  const toggleFavorite = async (id) => {
    try {
      await api.put(`/ai/history/${id}/favorite`);

      loadHistory();
    } catch (error) {
      console.log(error);

      alert("Failed to update favorite.");
    }
  };
  const indexOfLastImage = currentPage * imagesPerPage;
  const indexOfFirstImage = indexOfLastImage - imagesPerPage;

  const currentImages = filteredHistory.slice(
    indexOfFirstImage,
    indexOfLastImage,
  );

  const totalPages = Math.ceil(filteredHistory.length / imagesPerPage);
  return (
    <div className={`container mt-5 ${darkMode ? "bg-dark text-white" : ""}`}>
      <DashboardNavbar
        userEmail={userEmail}
        darkMode={darkMode}
        setDarkMode={setDarkMode}
        navigate={navigate}
        logout={logout}
      />
      <StatsCards history={history} />
      <PromptForm
        prompt={prompt}
        setPrompt={setPrompt}
        generateImage={generateImage}
        loading={loading}
        darkMode={darkMode}
      />

      <GeneratedImage
        imageUrl={imageUrl}
        downloadImage={downloadImage}
        darkMode={darkMode}
      />
      <HistorySection
        search={search}
        setSearch={setSearch}
        sortBy={sortBy}
        setSortBy={setSortBy}
        showFavoritesOnly={showFavoritesOnly}
        setShowFavoritesOnly={setShowFavoritesOnly}
        currentImages={currentImages}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        totalPages={totalPages}
        darkMode={darkMode}
        toggleFavorite={toggleFavorite}
        deleteImage={deleteImage}
        setSelectedImage={setSelectedImage}
        history={history}
      />
      <ImageModal
        selectedImage={selectedImage}
        setSelectedImage={setSelectedImage}
      />
    </div>
  );
}

export default Dashboard;
