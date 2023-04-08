import "./App.css";
import { Route, Routes } from "react-router-dom";
import IndexPage from "./pages/IndexPage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import Layout from "./Layout";
import ProfilePage from "./pages/ProfilePage.jsx";
import PlacesPage from "./pages/PlacesPage.jsx";
import PlacesFormPage from "./pages/PlacesFormPage.jsx";
import axios from "axios";
import { UserContextProvider } from "./UserContext";
import BookingPage from "./pages/BookingPage";


axios.defaults.baseURL = "http://212.101.137.119:5000";
axios.defaults.withCredentials = true;

function App() {

     // Vse poti so definirane v tej datoteki. Vse poti uporabljajo skupni layout in header (ti so definirani z datotekama Layout.jsx in Header.jsx)

  return (
    <UserContextProvider>
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<IndexPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/account/" element ={<ProfilePage />} />
        <Route path="/account/places" element ={<PlacesPage />} />
        <Route path="/account/places/new" element ={<PlacesFormPage />} />
        <Route path="/account/places/:id" element ={<PlacesFormPage />} />
        <Route path="/account/bookings" element ={<BookingPage />} />
      </Route>
    </Routes>
    </UserContextProvider>
  );
}

export default App;
