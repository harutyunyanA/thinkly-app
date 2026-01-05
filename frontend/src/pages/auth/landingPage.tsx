import { Link } from "react-router-dom";

export function LandingPage() {
  return (
    <div className="min-h-screen flex flex-col bg-linear-to-b from-white via-gray-50 to-gray-100 text-gray-800">
      <header className="flex justify-between items-center py-5 px-10 shadow-sm bg-white/70 backdrop-blur-md">
        <div className="flex items-center gap-2">
          <img src="/main-logo.svg" className="w-7 h-7" alt="logo" />
          <Link to={""} className="text-xl font-bold text-indigo-600">
            Thinkly
          </Link>
        </div>

        <nav className="flex items-center gap-8 text-sm font-medium">
          <a
            href="#quiz-categories"
            className="hover:text-indigo-600 transition"
          >
            Quiz
          </a>
          <a href="#why-thinkly" className="hover:text-indigo-600 transition">
            Why Thinkly
          </a>
          <a href="#footer" className="hover:text-indigo-600 transition">
            About
          </a>
        </nav>

        <div className="flex items-center gap-3">
          <Link
            to={"/login"}
            className="px-4 py-2 text-gray-700 border border-gray-300 rounded-md hover:bg-gray-100 transition cursor-pointer"
          >
            Sign In
          </Link>
          <Link
            to={"/signup"}
            className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition cursor-pointer"
          >
            Register
          </Link>
        </div>
      </header>

      <main className="flex flex-col items-center justify-center grow text-center px-6 py-20">
        <div
          className="
            inline-flex items-center gap-2 px-5 py-2 
            bg-white border border-gray-300 
            text-gray-700 rounded-full shadow-sm
            transition-all duration-300 
            hover:shadow-md hover:-translate-y-1px hover:bg-gray-50
            animate-softPulse
          "
        >
          <img src="/icons/star.svg" className="w-4 h-4" alt="icon" />
          <span className="text-sm font-medium">
            The ultimate quiz experience
          </span>
        </div>

        <h1 className="text-5xl sm:text-6xl font-extrabold text-gray-900 leading-tight mb-6">
          Think you're the <span className="text-indigo-600">smartest?</span>
        </h1>

        <p className="max-w-2xl text-gray-600 text-lg mb-10">
          Join thousands of curious minds on the ultimate quiz platform.
          Challenge yourself, sharpen your knowledge, and compete with others
          from around the world.
        </p>

        <div className="flex flex-wrap justify-center gap-4 mb-24">
          <Link
            to={"login"}
            className="px-6 py-3 rounded-md text-white bg-indigo-600 hover:bg-indigo-700 transition font-medium"
          >
            Get Started
          </Link>
          <button className="px-6 py-3 rounded-md border border-gray-300 hover:bg-gray-100 transition font-medium text-gray-700">
            Explore Quizzes
          </button>
        </div>

        <div
          id="quiz-categories"
          className="inline-flex items-center gap-2 px-4 py-1 bg-white border border-gray-300 text-gray-700 rounded-full shadow-sm mb-3"
        >
          <img
            src="/icons/book-open.svg"
            className="w-4 h-4"
            alt="categories"
          />
          <span className="text-sm font-medium">Categories</span>
        </div>

        <h2 className="text-4xl font-extrabold text-gray-900 mb-3">
          Explore <span className="text-indigo-600">Quiz Categories</span>
        </h2>

        <p className="text-gray-600 mb-12 max-w-xl">
          Discover quizzes across various subjects to test and expand your
          knowledge.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 w-full max-w-6xl mb-20">
          {[
            {
              name: "Science & Tech",
              desc: "Test your knowledge in science & tech.",
              icon: "/icons/science.svg",
              border: "border-blue-500",
              linkColor: "text-blue-600",
            },
            {
              name: "Mathematics",
              desc: "Sharpen your math skills with quizzes.",
              icon: "/icons/math.svg",
              border: "border-green-500",
              linkColor: "text-green-600",
            },
            {
              name: "Chemistry",
              desc: "Challenge your chemistry knowledge.",
              icon: "/icons/chem.svg",
              border: "border-purple-500",
              linkColor: "text-purple-600",
            },
            {
              name: "Biology",
              desc: "Explore quizzes on biology topics.",
              icon: "/icons/bio.svg",
              border: "border-pink-500",
              linkColor: "text-pink-600",
            },
            {
              name: "General Knowledge",
              desc: "Improve your general awareness.",
              icon: "/icons/global.svg",
              border: "border-yellow-500",
              linkColor: "text-yellow-600",
            },
            {
              name: "Current Affairs",
              desc: "Stay updated with recent events.",
              icon: "/icons/news.svg",
              border: "border-red-500",
              linkColor: "text-red-600",
            },
          ].map((cat) => (
            <div
              key={cat.name}
              className={`border ${cat.border} rounded-2xl p-6 bg-white shadow-sm hover:shadow-md transition`}
            >
              <div className="flex items-center gap-4 mb-3">
                <img src={cat.icon} className="w-10 h-10" />
                <h3 className="text-lg font-semibold">{cat.name}</h3>
              </div>
              <p className="text-gray-600 mb-4">{cat.desc}</p>
            </div>
          ))}
        </div>

        <div
          id="why-thinkly"
          className="w-full bg-white py-24 px-6 flex flex-col items-center text-center"
        >
          <div className="inline-flex items-center gap-2 px-4 py-1 bg-white border border-gray-300 text-gray-700 rounded-full shadow-sm mb-4">
            <img src="/icons/star.svg" className="w-4 h-4" />
            <span className="text-sm font-medium">Features</span>
          </div>

          <h2 className="text-4xl font-extrabold text-gray-900 mb-3">
            Why <span className="text-indigo-600">Thinkly</span>
          </h2>

          <p className="text-gray-600 max-w-xl mb-16">
            Discover how Thinkly helps you learn faster, stay motivated, and
            enjoy the quiz experience.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 w-full max-w-6xl">
            {[
              {
                title: "Personalized Learning",
                desc: "Adaptive quizzes tailored to your level and learning pace.",
                icon: "/icons/brain.svg",
                color: "text-purple-600",
              },
              {
                title: "Progress Tracking",
                desc: "Track your performance, statistics, and improvements.",
                icon: "/icons/chart.svg",
                color: "text-green-600",
              },
              {
                title: "Competitive Leaderboards",
                desc: "Compete globally and see how you rank among others.",
                icon: "/icons/trophy.svg",
                color: "text-yellow-600",
              },
            ].map((f) => (
              <div
                key={f.title}
                className="p-6 bg-white border border-gray-200 rounded-2xl shadow-sm hover:shadow-md transition text-left"
              >
                <div className="flex items-center gap-3 mb-4">
                  <img src={f.icon} className="w-10 h-10" />
                  <h3 className="text-lg font-semibold">{f.title}</h3>
                </div>
                <p className="text-gray-600">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </main>

      <footer
        id="footer"
        className="w-full bg-white border-t border-gray-200 py-12 px-6"
      >
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-10">
          <div>
            <div className="flex items-center gap-2 mb-3">
              <img src="/main-logo.svg" className="w-7 h-7" alt="logo" />
              <span className="text-xl font-semibold text-gray-900">
                Thinkly
              </span>
            </div>

            <p className="text-gray-600 text-sm max-w-xs">
              A modern quiz platform to learn, challenge yourself, and grow
              smarter every day.
            </p>

            <div className="flex items-center gap-4 mt-4">
              <a
                href="https://www.instagram.com/_harutyunyan"
                target="_blank"
                className="text-gray-600 hover:text-indigo-600 transition"
              >
                <img
                  src="/icons/instagram.svg"
                  alt="instagram"
                  className="w-6 h-6"
                />
              </a>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              Contacts
            </h3>

            <ul className="space-y-3 text-gray-700 text-sm">
              <li className="flex items-center gap-2">
                <img src="/icons/mail.svg" className="w-5 h-5" />
                quizzes@thinkly.fun
              </li>

              <li className="flex items-center gap-2">
                <img src="/icons/phone.svg" className="w-5 h-5" />
                +374 55 08 08 98
              </li>

              <li className="flex items-start gap-2">
                <img src="/icons/location.svg" className="w-5 h-5 mt-0.5" />
                <span>1625 Plymouth St, Mountain View, CA 94043, USA</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-10 text-center text-gray-500 text-sm">
          © 2025 Thinkly. All rights reserved.
        </div>
      </footer>
    </div>
  );
}
