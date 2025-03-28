import React, { useEffect, useState } from 'react';
import styles from '../styles/GuessTheColor.module.css'
import { GerarCor } from '../utils/GerarCor';
import { trocarTitulo } from '../utils/TrocarTitulo';
import HighScoreModal from './HighScoreModal';

function GuessTheColor() {
    const [pontos, setPontos] = useState(0)
    const [cor, setCor] = useState<string>("#FF0000")
    const [cores, setCores] = useState<string[]>(["#FF0000", "#00FF00", "#0000FF"])
    const [highScore, setHighScore] = useState<number>(0)
    const [modalOpened, setModalOpened] = useState<boolean>(false)


    function gerarNovoJogo() {
        let corCerta = GerarCor()
        setCor(corCerta)
        setCores(shuffleArray([corCerta, GerarCor(), GerarCor()]))
    }


    function handleColorClick(event: React.MouseEvent<HTMLButtonElement>) {
        const rgb2hex = (rgb: string) => `#${rgb.match(/^rgb\((\d+),\s*(\d+),\s*(\d+)\)$/)?.slice(1).map(n => parseInt(n, 10).toString(16).padStart(2, '0')).join('')}`

        if (cor === rgb2hex(event.currentTarget.style.backgroundColor).toUpperCase()) {
            gerarNovoJogo()
            localStorage.setItem("guessTheColorPontos", String(pontos + 1))
            setPontos(pontos + 1)
        } else {
            if (pontos > highScore) {
                setHighScore(pontos)
                localStorage.setItem("guessTheColorHighScore", pontos.toString())
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

    useEffect(() => {
        gerarNovoJogo()
        localStorage.getItem("guessTheColorHighScore") && setHighScore(Number(localStorage.getItem("guessTheColorHighScore")))
        localStorage.getItem("guessTheColorPontos") && setPontos(Number(localStorage.getItem("guessTheColorPontos")))
        trocarTitulo("Adivinhe a Cor")
    }, [])


    return (
        <>
            <div className={styles.wrapper}>
                <h1>{pontos}</h1>
                <h1>{cor}</h1>
                <div className={styles.buttons}>
                    {cores.map((cor, index) => {
                        return (<button
                            onClick={handleColorClick}
                            style={{ backgroundColor: cor }}
                            className={styles["btn-color"]}
                            key={cor}
                            aria-label={`Opção ${index + 1}`}
                        >

                        </button>)
                    })}
                </div>
            </div>
            {modalOpened ? <HighScoreModal handleModalClose={handleModalClose} highscore={highScore} jogo="GuessTheColor" pontos={pontos} respostaCerta={cor} /> : null}
        </>
    )
}

export default GuessTheColor
