import React from "react";
const Landing = () => (
  <section className="landing">
    <h1 className="text-center mb-5">Turn the music up!</h1>

    <section className="card-deck mb-3 text-center">
      <div className="card box-shadow">
        <div className="card-header d-flex align-items-center h100">
          <h4 className="font-weight-normal mx-auto">Choose your music</h4>
        </div>
        <div className="card-body d-flex align-items-center h100">
          <p className="mx-auto">
            The world is full of music; why should you have to listen to music
            that somebody else chose?
          </p>
        </div>
      </div>
      <div className="card box-shadow">
        <div className="card-header d-flex align-items-center h100">
          <h4 className="font-weight-normal mx-auto">
            Unlimited, streaming, ad-free
          </h4>
        </div>
        <div className="card-body d-flex align-items-center h100">
          <p className="mx-auto">No arbitrary limits. No distractions.</p>
        </div>
      </div>
      <div className="card box-shadow">
        <div className="card-header d-flex align-items-center h100">
          <h4 className="font-weight-normal mx-auto">Mobile enabled</h4>
        </div>
        <div className="card-body d-flex align-items-center h100">
          <p className="mx-auto">
            Listen to your music on the go. This streaming service is available
            on all mobile platforms.
          </p>
        </div>
      </div>
    </section>
  </section>
);

export default Landing;
