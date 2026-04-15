import "./About.scss";

export default function About() {
  return (
    <div className="min-h-screen bg-white text-black">
      {/* Hero */}
      <section
        className="px-6 md:px-16 py-16"
        style={{ backgroundColor: "rgb(252 236 236)" }}
      >
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-10 items-center">
          <div>
            <p
              className="text-sm font-semibold tracking-widest uppercase mb-3"
              style={{ color: "#c62828" }}
            >
              About Our Brand
            </p>
            <h1 className="text-4xl md:text-5xl font-bold leading-tight mb-5">
              Building modern shopping experiences with style and speed.
            </h1>
            <p className="text-base leading-8 text-gray-700 mb-6">
              We focus on delivering a smooth digital experience, combining
              modern design, fast performance, and a user-first approach. Every
              section is crafted to make browsing simple and enjoyable.
            </p>
            <button
              className="px-6 py-3 rounded-2xl text-white font-semibold shadow-lg"
              style={{ backgroundColor: "#c62828" }}
            >
              Learn More
            </button>
          </div>

          <div
            className="rounded-3xl p-8 shadow-xl"
            style={{ backgroundColor: "rgb(224 241 241)" }}
          >
            <div className="grid grid-cols-2 gap-4">
              <div className="rounded-2xl p-6 bg-white shadow">
                <h3 className="text-3xl font-bold">10K+</h3>
                <p className="text-sm text-gray-600 mt-2">Happy Customers</p>
              </div>
              <div className="rounded-2xl p-6 bg-black text-white shadow">
                <h3 className="text-3xl font-bold">24/7</h3>
                <p className="text-sm text-gray-300 mt-2">Support</p>
              </div>
              <div className="rounded-2xl p-6 bg-white shadow">
                <h3 className="text-3xl font-bold">99%</h3>
                <p className="text-sm text-gray-600 mt-2">Satisfaction</p>
              </div>
              <div
                className="rounded-2xl p-6 text-white shadow"
                style={{ backgroundColor: "#c62828" }}
              >
                <h3 className="text-3xl font-bold">5 Years</h3>
                <p className="text-sm text-red-100 mt-2">Experience</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Story */}
      <section className="px-6 md:px-16 py-16 bg-white">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-10">
          <div>
            <h2 className="text-3xl font-bold mb-4">Our Story</h2>
            <p className="text-gray-700 leading-8">
              Started with a simple vision: create a digital store that feels
              premium, intuitive, and trustworthy. Our mission is to combine
              strong frontend design with clean user journeys that keep
              customers engaged.
            </p>
          </div>
          <div
            className="rounded-3xl p-8"
            style={{ backgroundColor: "rgb(252 236 236)" }}
          >
            <p className="leading-8 text-gray-700">
              From responsive layouts to polished interactions, every detail is
              built with performance and usability in mind.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
