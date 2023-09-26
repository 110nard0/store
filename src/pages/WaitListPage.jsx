import WaitListForm from "./comp/WaitListForm";
import "../assets/styles/pages/waitlist-page.scss";

import CustomLogo from "../components/CustomLogo";
import { BsArrowUpRight } from "react-icons/bs";

const WaitListPage = () => {
  return (
    <section className="landing_page">
      <header className="landing_page-header">
        <a href="/" className="landing_page-header-logo">
          <CustomLogo />
        </a>
        <p className="landing_page-header-text">LAUNCHING SOON</p>
      </header>
      <main className="landing_page-main">
        <div className="landing_display">
          <p className="landing_display-intro">TRYST + GENIUS = TRGST</p>

          <h2 className="landing_display-heading">
            pronounced{" "}
            <span className="landing_display-heading__highlight">
              &#x5B;trist&#x5D;
            </span>
          </h2>
          <p className="landing_display-subheading">
            We are an exclusive affair of the collective genius.
          </p>
        </div>
        <WaitListForm />
      </main>
      <footer className="landing_page-footer">
        <div className="footer-link">
          <a href="/">Follow us on Instagram</a>
          <BsArrowUpRight />
        </div>
      </footer>
    </section>
  );
};

export default WaitListPage;
