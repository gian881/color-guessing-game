import React, { useState } from 'react';
import '../styles/Jogo.css'

interface JogoProps {
    cor: string;
    cores: string[];
    novoJogoHandler: () => void;
    cheat?: boolean;
}

function Jogo(props: JogoProps) {

    const [acertou, setAcertou] = useState<boolean | undefined>(undefined)
    const [pontos, setPontos] = useState(0)

    function handleButtonClick(event: React.MouseEvent<HTMLButtonElement>) {
        if (props.cor === event.currentTarget.textContent) {
            setAcertou(true)
            props.novoJogoHandler()
            setPontos(pontos + 1)
        } else {
            setAcertou(false)
        }
    }

    return (
        <div className="wrapper">
            <h1>{pontos}</h1>
            <div className="cor" style={{ backgroundColor: props.cor }}></div>
            <div className="buttons">
                {props.cores.map((cor) => {
                    if (props.cheat) {
                        return <button onClick={handleButtonClick} key={cor} style={{ backgroundColor: cor }}>{cor}</button>
                    }
                    return <button onClick={handleButtonClick} key={cor}>{cor}</button>
                })}
            </div>
            {acertou === undefined ? null : acertou ? <h1 className='acertou'>Acertou</h1> : <h1 className='errou'>Errou</h1>}
        </div>
    )
}

export default Jogo
