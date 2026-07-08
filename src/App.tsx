import DocumentPage from "./components/DocumentPage";

function App() {
  return (
    <div
      data-theme="light"
      className="
        min-h-screen
        bg-base-200
      "
    >
      <div
        className="
          container
          mx-auto
          py-8
          px-4
        "
      >
        <DocumentPage />
      </div>
    </div>
  );
}

export default App;
