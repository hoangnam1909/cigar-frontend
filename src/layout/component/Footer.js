import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";
import { faFacebookF, faTiktok } from "@fortawesome/free-brands-svg-icons";
import {
  faEnvelope,
  faGem,
  faHouse,
  faPhone,
} from "@fortawesome/free-solid-svg-icons";
import { Container } from "react-bootstrap";

export default function Footer() {
  return (
    <footer className="text-center text-lg-start bg-light text-muted mt-4">
      <Container className="d-flex justify-content-center justify-content-lg-between p-4 border-bottom">
        <div className="me-5 d-none d-lg-block">
          <span>Get connected with us on social networks:</span>
        </div>
        <div>
          <a href="" className="mx-2 text-reset">
            <FontAwesomeIcon icon={faFacebookF} />
          </a>
          <a href="" className="mx-2 text-reset">
            <FontAwesomeIcon icon={faTiktok} />
          </a>
        </div>
      </Container>
      <section className="">
        <div className="container text-center text-md-start mt-4">
          <div className="row mt-3">
            <div className="col-md-3 col-lg-4 col-xl-3 mx-auto mb-4">
              <h6 className="text-uppercase fw-bold mb-4">
                <FontAwesomeIcon icon={faGem} className="me-2" />
                Cigar For Boss
              </h6>
              <p>
                Here you can use rows and columns to organize your footer
                content. Lorem ipsum dolor sit amet, consectetur adipisicing
                elit.
              </p>
            </div>
            <div className="col-md-2 col-lg-2 col-xl-2 mx-auto mb-4">
              <h6 className="text-uppercase fw-bold mb-4">Products</h6>
              <p>
                <a href="#!" className="text-reset">
                  Angular
                </a>
              </p>
              <p>
                <a href="#!" className="text-reset">
                  React
                </a>
              </p>
              <p>
                <a href="#!" className="text-reset">
                  Vue
                </a>
              </p>
              <p>
                <a href="#!" className="text-reset">
                  Laravel
                </a>
              </p>
            </div>
            <div className="col-md-3 col-lg-2 col-xl-2 mx-auto mb-4">
              <h6 className="text-uppercase fw-bold mb-4">Useful links</h6>
              <p>
                <a href="#!" className="text-reset">
                  Pricing
                </a>
              </p>
              <p>
                <a href="#!" className="text-reset">
                  Settings
                </a>
              </p>
              <p>
                <a href="#!" className="text-reset">
                  Orders
                </a>
              </p>
              <p>
                <a href="#!" className="text-reset">
                  Help
                </a>
              </p>
            </div>
            <div className="col-md-4 col-lg-3 col-xl-3 mx-auto mb-md-0 mb-4">
              <h6 className="text-uppercase fw-bold mb-4">Contact</h6>
              <p>
                <FontAwesomeIcon icon={faHouse} className="me-2" />
                New York, NY 10012, US
              </p>
              <p>
                <FontAwesomeIcon icon={faEnvelope} className="me-2" />
                info@example.com
              </p>
              <p>
                <FontAwesomeIcon icon={faPhone} className="me-2" />
                0123 456 789
              </p>
            </div>
          </div>
        </div>
      </section>

      <div
        className="text-center p-4"
        style={{ backgroundColor: "rgba(0, 0, 0, 0.05)" }}
      >
        &copy; 2023 Copyright:&nbsp;
        <a as={Link} className="text-reset text-decoration-none fw-bold" to="/">
          Cigar For Boss
        </a>
      </div>
    </footer>
  );
}
