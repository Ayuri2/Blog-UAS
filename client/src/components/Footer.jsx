import React from "react";

const Footer = () => {
  return (
    <footer style={{ textAlign: "center", padding: "1em 0", backgroundColor: "#f1f1f1" }}>
      <span>
        <b>Copyright © 2025 All Rights Reserved</b>
      </span>
      <br />
      <a 
        href="https://github.com/" // ganti pakai repository github
        target="_blank" 
        rel="noopener noreferrer"
        style={{ textDecoration: "none", color: "#007bff" }}
      >
        Visit Our Github Repository
      </a>
    </footer>
  );
};

export default Footer;