import React, { useEffect, useState } from 'react';
import '../styles/Jogo.css'
import { GerarCor } from '../utils/GerarCor';
import HighScoreModal from './HighScoreModal';

interface GuessTheCodeProps {
    handleNewGame: (cor: string) => void
}

function GuessTheCode(props: GuessTheCodeProps) {
    const [pontos, setPontos] = useState(0)
    const [cor, setCor] = useState<string>("#FF0000")
    const [cores, setCores] = useState<string[]>(["#FF0000", "#00FF00", "#0000FF"])
    const [modalOpened, setModalOpened] = useState<boolean>(false)
    const [highScore, setHighScore] = useState<number>(0)

    useEffect(() => {
        gerarNovoJogo()
        localStorage.getItem("guessTheCodeHighScore") && setHighScore(Number(localStorage.getItem("guessTheCodeHighScore")))
        localStorage.getItem("guessTheCodePontos") && setPontos(Number(localStorage.getItem("guessTheCodePontos")))
    }, [])

    function handleHexCodeClick(event: React.MouseEvent<HTMLButtonElement>) {
        if (cor === event.currentTarget.textContent) {
            gerarNovoJogo()
            localStorage.setItem("guessTheCodePontos", String(pontos + 1))
            setPontos(pontos + 1)
        } else {
            if (pontos > highScore) {
                setHighScore(pontos)
                localStorage.setItem("guessTheCodeHighScore", pontos.toString())
            }
            setModalOpened(true)
        }
    }

    function handleModalClose() {
        setModalOpened(false)
        setPontos(0)
        gerarNovoJogo()
    }

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
        props.handleNewGame(corCerta)
    }

    return (<>
        <div className="wrapper">
            <h1>{pontos}</h1>
            <div className="cor" style={{ backgroundColor: cor }}></div>
            <div className="buttons">
                {cores.map((cor) => {
                    return <button onClick={handleHexCodeClick} key={cor}>{cor}</button>
                })}
            </div>

        </div>
        {modalOpened ? <HighScoreModal handleModalClose={handleModalClose} highscore={highScore} jogo="GuessTheCode" pontos={pontos} respostaCerta={cor} /> : null}
    </>
    )
}

export default GuessTheCode
