import { useEffect, useState } from 'react'
import GuessTheCode from './components/GuessTheCode'
import GuessTheColor from './components/GuessTheColor'
import { ChangeFavicon } from './utils/ChangeFavicon'


function App() {
  const [jogo, setJogo] = useState<"Adivinhe o Código" | "Adivinhe a Cor">("Adivinhe o Código")

  function outroJogo() {
    return jogo === "Adivinhe o Código" ? "Adivinhe a Cor" : "Adivinhe o Código"
  }
  function handleNewGame(cor: string) {
    ChangeFavicon(cor)
  }

  useEffect(() => {
    localStorage.getItem("jogo") && setJogo(localStorage.getItem("jogo") as "Adivinhe o Código" | "Adivinhe a Cor")
  }, [])

  function mudarJogo() {
    localStorage.setItem("jogo", outroJogo())
    setJogo(outroJogo())
  }

  return (
    <>
      <button
        style={{ marginTop: "15px" }} onClick={() => mudarJogo()}>Jogar {outroJogo()}</button>
      {jogo === "Adivinhe o Código" ? <GuessTheCode handleNewGame={handleNewGame} /> : <GuessTheColor />}
    </>
  )
}

export default App
