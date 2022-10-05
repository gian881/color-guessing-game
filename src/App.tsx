import { useEffect, useState } from 'react'
import Jogo from './components/Jogo'
import { GerarCor } from './utils/GerarCor'

function App() {
  const [cor, setCor] = useState<string>("#FF0000")
  const [cores, setCores] = useState<string[]>(["#FF0000", "#00FF00", "#0000FF"])
  const [cheat, setCheat] = useState<boolean>(false)

  useEffect(() => {
    gerarNovoJogo()
  }, [])

  function shuffleArray(array: any[]) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      const temp = array[i];
      array[i] = array[j];
      array[j] = temp;
    }
    return array
  }

  function gerarNovoJogo() {
    let corCerta = GerarCor()
    setCor(corCerta)
    setCores(shuffleArray([corCerta, GerarCor(), GerarCor()]))
  }

  return (
    <>
      {/* Botão para cheat abaixo */}
      {/* <button className='cheat' onClick={() => setCheat(!cheat)}>Cheat</button> */}
      <Jogo cor={cor} cores={cores} novoJogoHandler={gerarNovoJogo} cheat={cheat} />
    </>
  )
}

export default App
