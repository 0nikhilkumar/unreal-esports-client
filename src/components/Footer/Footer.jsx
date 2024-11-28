import React from "react";
import { FaTwitter } from "react-icons/fa";
import { FaYoutube } from "react-icons/fa";
import { FaFacebook } from "react-icons/fa";
import { FaInstagram } from "react-icons/fa";


function Footer() {
  return (
    <footer className="footer footer-center bg-base-200 text-base-content rounded p-10">
      <nav className="grid grid-flow-col gap-4">
        <a className="link link-hover">About us</a>
        <a className="link link-hover">Contact</a>
        <a className="link link-hover">Career</a>
        <a className="link link-hover">Esport</a>
        <a className="link link-hover">FAQ</a>
      </nav>
      <nav>
        <div className="grid grid-flow-col gap-4">
          <a><FaTwitter className="text-xl"/></a>
          <a><FaYoutube className="text-xl"/></a>
          <a><FaFacebook className="text-xl"/></a>
          <a><FaInstagram className="text-xl"/></a>
        </div>
      </nav>
      <aside>
        <p>© {new Date().getFullYear()} - All right reserved by Battle Arena</p>
      </aside>
    </footer>
  );
}

export default Footer;
