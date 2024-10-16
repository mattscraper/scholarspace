import React from "react";
import "./about.css"; // Reuse the home.css for styling consistency
import { Link } from "react-router-dom";

function About() {
  return (
    <div className="home">
      {" "}
      {/* Keep the base class same for consistency */}
      <section className="hero">
        <h1>Welcome to ScholarSpace!</h1>
        <p>Your space for collaboration and learning.</p>
        <Link to="/register">
          <button className="cta-button">Get Started</button>
        </Link>
      </section>
      <section className="features">
        <h2>Key Features</h2>
        <ul>
          <li>
            <h3>Collaborative Study Rooms</h3>
            <p>
              Connect with peers, share notes, and collaborate in real-time.
            </p>
          </li>
          <li>
            <h3>Customizable Study Rooms</h3>
            <p>
              Personalize your study rooms to suit your preferences and
              subjects.
            </p>
          </li>
          <li>
            <h3>Resource Sharing</h3>
            <p>Easily share notes, study guides, and resources with others.</p>
          </li>
          <li>
            <h3>Invite Friends</h3>
            <p>Invite classmates and friends to join your study sessions.</p>
          </li>
        </ul>
      </section>
      <section className="team">
        <h2>Meet the Team</h2>
        <div className="team-member">
          <h3>Jane Doe</h3>
          <p>Co-Founder & CEO</p>
        </div>
        <div className="team-member">
          <h3>John Smith</h3>
          <p>Lead Developer</p>
        </div>
        <div className="team-member">
          <h3>Alice Johnson</h3>
          <p>UX/UI Designer</p>
        </div>
      </section>
      <section className="testimonials">
        <h2>What Our Users Say</h2>
        <blockquote>
          <p>
            "ScholarSpace has transformed my studying experience!" - Student A
          </p>
        </blockquote>
        <blockquote>
          <p>
            "Collaborating with classmates has never been easier." - Student B
          </p>
        </blockquote>
      </section>
      <section className="cta">
        <h2>Ready to Join Us?</h2>
        <p>Sign up today and start collaborating with classmates!</p>
        <Link to="/register">
          <button className="cta-button">Get Started</button>
        </Link>
      </section>
    </div>
  );
}

export default About;
