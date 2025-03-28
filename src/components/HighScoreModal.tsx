import { useEffect } from 'react';
import styles from '../styles/HighScoreModal.module.css'

interface HighScoreModalProps {
    pontos: number;
    highscore: number;
    respostaCerta: string;
    jogo: "GuessTheCode" | "GuessTheColor";
    handleModalClose: () => void;
}

function HighScoreModal(props: HighScoreModalProps) {

    useEffect(() => {
        const close = (e: KeyboardEvent) => {
            if (e.key === "Escape") {
                props.handleModalClose()
            }
        }

        window.addEventListener("keydown", close)
        return () => window.removeEventListener("keydown", close)
    })

    return (
        <div className={styles["modal-bg"]} onClick={() => props.handleModalClose()}>
            <div className={styles["modal-container"]} onClick={e => e.stopPropagation()}>

                <div className={styles["title-container"]}>
                    <h1 className={styles.title}>Você perdeu</h1>
                    <button onClick={() => props.handleModalClose()} className={styles["close-btn"]} aria-label="Fechar"> X </button>
                </div>

                <div className={styles.body}>
                    <p>A resposta certa era</p>
                    {props.jogo === "GuessTheCode" ? <p>{props.respostaCerta}</p> : <div style={{ backgroundColor: props.respostaCerta, width: "75px", height: "75px", borderRadius: "50%" }}></div>}
                    <p>Você fez {props.pontos} pontos</p>
                    <p>Sua maior pontuação foi {props.highscore} pontos</p>
                </div>

                <div className={styles.footer}>
                    <button onClick={() => props.handleModalClose()}>Jogar novamente</button>
                </div>

            </div>
        </div>
    )
}

export default HighScoreModal
