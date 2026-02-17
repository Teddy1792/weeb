import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Blog from "./pages/Blog";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import ArticlePage from "./pages/ArticlePage";
import AddArticle from "./pages/AddArticle";
import PasswordResetRequest from "./pages/PasswordResetRequest";
import PasswordResetConfirm from "./pages/PasswordResetConfirm";
import Footer from "./components/Footer";
import Nav from "./components/Nav";
import ProtectedRoute from "./components/ProtectedRoute";

function App() {
  return (
    <main className="flex flex-col">
      <Nav />
      <div className="mt-30 lg:mt-40">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/blog/:id" element={<ArticlePage />} />
          <Route
            path="/add-article"
            element={
              <ProtectedRoute>
                <AddArticle />
              </ProtectedRoute>
            }
          />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/reset-password" element={<PasswordResetRequest />} />
          <Route
            path="/reset-password/:uid/:token"
            element={<PasswordResetConfirm />}
          />
        </Routes>
      </div>
      <Footer />
    </main>
  );
}

export default App;
