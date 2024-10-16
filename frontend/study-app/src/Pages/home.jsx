import React from "react";
import "./home.css";
import { Link } from "react-router-dom";

function Home() {
  return (
    <div className="home">
      <section className="hero">
        <h1>Welcome to ScholarSpace</h1>
        <p>Your ultimate study companion for collaborative learning.</p>
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
              Join or create study rooms with peers to share notes and
              resources.
            </p>
          </li>
          <li>
            <h3>Interactive Tools</h3>
            <p>
              Utilize tools for live discussions, Q&A, and sharing materials in
              real-time.
            </p>
          </li>
          <li>
            <h3>Resource Library</h3>
            <p>
              Access a library of resources tailored for your classes and
              subjects.
            </p>
          </li>
        </ul>
      </section>

      <section className="how-it-works">
        <h2>How It Works</h2>
        <ol>
          <li>Create an account to access all features.</li>
          <li>Join or create a study room for your course.</li>
          <li>Collaborate with classmates and ace your studies together!</li>
        </ol>
      </section>

      <section className="testimonials">
        <h2>What Our Users Say</h2>
        <blockquote>
          <p>
            "ScholarSpace has transformed the way I study! Collaborating with my
            peers has never been easier."
          </p>
          <footer>- Sarah L.</footer>
        </blockquote>
        <blockquote>
          <p>
            "The resource library is a lifesaver for finding study materials!"
          </p>
          <footer>- James T.</footer>
        </blockquote>
      </section>

      <section className="cta">
        <h2>Ready to Elevate Your Learning?</h2>
        <Link to="/register">
          <button className="cta-button">Join Now</button>
        </Link>
      </section>
    </div>
  );
}

export default Home;
