export default function Docs() {
  return (
    <div className="p-4 mt-16 min-h-screen">
      <div className="max-w-4xl mx-auto mt-4">
        <h1 className="font-bold text-3xl mb-8">Flashcard Project Documentation</h1>
        
        <section className="mb-8">
          <h1 className="font-semibold text-2xl mb-4">Introduction</h1>
          <p className="text-gray-700">
            Welcome to the documentation for the Flashcard Project. This project allows users to upload Markdown files, generate flashcards, and download the generated flashcards as a CSV file.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="font-semibold text-2xl mb-4">Installation</h2>
          <pre className="bg-gray-100 p-4 rounded">
            <code className="text-sm text-gray-800">
              {`git clone https://github.com/keanteng/flashcard \nnpm run dev`}
            </code>
          </pre>
        </section>

        <section className="mb-8">
          <h2 className="font-semibold text-2xl mb-4">Usage</h2>
          <p className="text-gray-700 mb-4">
            Follow these steps to use the Flashcard Project:
          </p>
          <ol className="list-decimal list-inside text-gray-700">
            <li>Upload a Markdown file using the dropzone.</li>
            <li>Click the "Generate Flashcards" button to generate flashcards.</li>
            <li>Download the generated flashcards as a CSV file.</li>
          </ol>
        </section>

        <section className="mb-8">
          <h2 className="font-semibold text-2xl mb-4">Example</h2>
          <pre className="bg-gray-100 p-4 rounded">
            <code className="text-sm text-gray-800">
              {`# Example Markdown File

                ## Question 1
                What is Next.js?

                ## Answer 1
                Next.js is a React framework for production.

                ## Question 2
                What is TypeScript?

                ## Answer 2
                TypeScript is a typed superset of JavaScript.`}
            </code>
          </pre>
        </section>

        <section className="mb-8">
          <h2 className="font-semibold text-2xl mb-4">Contributing</h2>
          <p className="text-gray-700">
            Contributions are welcome! Please open an issue or submit a pull request on GitHub.
          </p>
        </section>
      </div>
    </div>
  );
}