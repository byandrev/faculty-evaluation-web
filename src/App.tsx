import Analysis from "./components/Analysis";
import Feedback from "./components/Feedback";
import Header from "./components/Header";

export function App() {
  return (
    <div>
      <Header />

      <main className="py-8">
        <div className="p-6 grid gap-4 max-w-3xl mx-auto">
          {/* <Hero /> */}
          <Feedback />
          <Analysis />
        </div>
      </main>
    </div>
  );
}

export default App;
