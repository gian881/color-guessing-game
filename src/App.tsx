import { useEffect, useState } from 'react'
import GuessTheCode from './components/GuessTheCode'
import GuessTheColor from './components/GuessTheColor'


function App() {
  const [jogo, setJogo] = useState<"GuessTheCode" | "GuessTheColor">("GuessTheCode")

  function outroJogo() {
    return jogo === "GuessTheCode" ? "GuessTheColor" : "GuessTheCode"
  }

  useEffect(() => {
    localStorage.getItem("jogo") && setJogo(localStorage.getItem("jogo") as "GuessTheCode" | "GuessTheColor")
  }, [])

  function mudarJogo() {
    localStorage.setItem("jogo", outroJogo())
    setJogo(outroJogo())
  }

  return (
    <>
      <button
        style={{ marginTop: "15px" }} onClick={() => mudarJogo()}>Jogar {outroJogo()}</button>
      {jogo === "GuessTheCode" ? <GuessTheCode /> : <GuessTheColor />}
    </>
  )
}

export default App
