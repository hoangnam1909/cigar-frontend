import { Route, Routes } from "react-router-dom";
import Header from "./component/Header";
import Home from "~/page/Home";
import NewArrival from "~/page/NewArrival";
import Products from "~/page/Products";
import { Container } from "react-bootstrap";

export default function BaseLayout() {
  return (
    <>
      <Header />
      <Container className="py-4">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/new-arrival" element={<NewArrival />} />
          <Route path="/products" element={<Products />} />
        </Routes>
      </Container>
    </>
  );
}
