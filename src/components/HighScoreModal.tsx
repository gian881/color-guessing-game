import styles from './HighScoreModal.css'

interface HighScoreModalProps {
    pontos: number;
    highscore: number;
    respostaCerta: string;
    jogo: "GuessTheCode" | "GuessTheColor";
    handleModalClose: () => void;
}

function HighScoreModal(props: HighScoreModalProps) {
    return (
        <div className="modal-bg">
            <div className='modal-container'>

                <div className="title-container">
                    <h1 className='title'>Você perdeu</h1>
                    <button onClick={() => props.handleModalClose()} className='close-btn'> X </button>
                </div>

                <div className="body">
                    <p>A resposta certa era</p>
                    {props.jogo === "GuessTheCode" ? <p>{props.respostaCerta}</p> : <div style={{ backgroundColor: props.respostaCerta, width: "50px", height: "50px" }}></div>}
                    <p>Você fez {props.pontos} pontos</p>
                    <p>Sua maior pontuação foi {props.highscore} pontos</p>
                </div>

                <div className="footer">
                    <button onClick={() => props.handleModalClose()}>Jogar novamente</button>
                </div>

            </div>
        </div>
    )
}

export default HighScoreModal
