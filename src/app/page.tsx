import Link from "next/link";

export default function Home() {
  return (
    <div className="p-4 bg-neutral-100 min-h-screen mt-16">
      <div className="max-w-7xl mx-auto text-center py-16">
        <h1 className="text-5xl font-bold text-gray-800 mb-4">
          Generate Flashcards With Ease
        </h1>
        <p className="text-lg text-gray-600 mb-8">
          Create, manage, and study flashcards effortlessly with our intuitive platform.
        </p>
        <div className="flex justify-center space-x-4">
          <button className="bg-neutral-500 text-white px-6 py-3 rounded-md shadow-md hover:bg-neutral-600 transition duration-300">
            <Link href="/flashcard">
              Get Started
            </Link>
          </button>
          <button className="bg-gray-200 text-gray-800 px-6 py-3 rounded-md shadow-md hover:bg-gray-300 transition duration-300">
            Learn More
          </button>
        </div>
      </div>
      <div className="max-w-7xl mx-auto py-16 px-4">
        <h2 className="text-3xl font-semibold text-gray-800 mb-6">
          Features
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-white p-6 rounded-lg shadow-md hover:scale-105 transition-transform duration-300">
            <h3 className="text-xl font-semibold text-gray-800 mb-2">
              Easy to Use
            </h3>
            <p className="text-gray-600">
              Our platform is designed with simplicity in mind, making it easy for anyone to create and manage flashcards.
            </p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md hover:scale-105 transition-transform duration-300">
            <h3 className="text-xl font-semibold text-gray-800 mb-2">
              Customizable
            </h3>
            <p className="text-gray-600">
              Customize your flashcards with tags for different topics to make studying more engaging.
            </p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md hover:scale-105 transition-transform duration-300">
            <h3 className="text-xl font-semibold text-gray-800 mb-2">
              Study Anywhere
            </h3>
            <p className="text-gray-600">
              Access your flashcards from any device, so you can study on the go.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}