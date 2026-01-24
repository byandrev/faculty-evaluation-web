import Analysis from "./components/Analysis";
import Feedback from "./components/Feedback";
import Header from "./components/Header";

export function App() {
  return (
    <div>
      <Header />

      <div className="p-6 grid gap-4 md:grid-cols-2 container mx-auto">
        <Feedback />
        <Analysis />
      </div>
    </div>
  );
}

export default App;
