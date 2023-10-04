import { Header } from "./components/header"
import { Conversion } from "./components/conversion"
import { About } from "./components/about"
import { Contact } from "./components/contact"

function App() {

  return (
    <div className="flex flex-col min-h-screen">
      <Header />

      <main className="max-w-6xl mx-auto flex-1 w-full py-8">

        <Conversion />

        <About />

        <Contact />
      </main>
    </div>
  )
}

export default App
