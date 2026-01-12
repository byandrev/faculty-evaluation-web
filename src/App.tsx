import Analysis from "./components/Analysis";
import Feedback from "./components/Feedback";

export function App() {

  return <div>
    <header className="p-4 bg-gray-800 text-white text-center text-xl font-bold">
      Feedback Analyzer
    </header>

    <div className="p-6 grid gap-4
  md:grid-cols-2
  ">
    <Feedback />
    <Analysis />
  </div>
  </div>

}

export default App;
