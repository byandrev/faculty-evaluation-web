import Analysis from "./components/Analysis";
import DangerComparison from "./components/DangerComparison";
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
          <hr className="my-6 border-t" />
          <DangerComparison />
          <hr className="my-6 border-t" />
          <Analysis />
        </div>
      </main>
    </div>
  );
}

export default App;
