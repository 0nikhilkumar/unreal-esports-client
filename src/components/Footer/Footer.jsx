import { FaTwitter } from "react-icons/fa";
import { FaYoutube } from "react-icons/fa";
import { FaFacebook } from "react-icons/fa";
import { FaInstagram } from "react-icons/fa";
import { Link } from "react-router-dom";

function Footer() {
  return (
    <footer className="footer footer-center bg-base-200 text-base-content rounded p-10 block">
      <nav className="grid grid-flow-col gap-4">
        <Link to={"/about"} className="link link-hover">
          About us
        </Link>
        <Link to={"/tournament"} className="link link-hover">
          Tournament
        </Link>
        <Link to={"/faq"} className="link link-hover">
          FAQ
        </Link>
      </nav>
      <nav>
        <div className="grid grid-flow-col gap-4">
          <a>
            <FaTwitter className="text-xl" />
          </a>
          <a>
            <FaYoutube className="text-xl" />
          </a>
          <a>
            <FaFacebook className="text-xl" />
          </a>
          <a>
            <FaInstagram className="text-xl" />
          </a>
        </div>
      </nav>
      <aside>
        <p>© {new Date().getFullYear()} - All right reserved by Unreal Esports</p>
      </aside>
    </footer>
  );
}

export default Footer;
