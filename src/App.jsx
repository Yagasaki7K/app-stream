import { useEffect, useState } from "react"
import styled from "styled-components"

function App() {
    const [inputChannel, setInputChannel] = useState('')
    const [channel, setChannel] = useState('gaules')
    const [isChat, setIsChat] = useState(false)
    const [windowSize, setWindowSize] = useState({
        width: undefined,
        height: undefined,
    })

    useEffect(() => {
        function handleResize() {
            setWindowSize({
                width: window.innerWidth,
                height: window.innerHeight,
            });
        }

        if (typeof window !== 'undefined') {
            window.addEventListener('resize', handleResize);
            handleResize();

            return () => window.removeEventListener('resize', handleResize);
        }
    }, []);

    const isProd = 'thetwitch.vercel.app'
    // const isProd = 'localhost'

    return (
        <AppDetails>
            <div className="overlay" />
            <div className="header">
                <input type="text" placeholder="Insert the stream channel" onChange={e => setInputChannel(e.target.value)} />
                <button onClick={() => setChannel(inputChannel)}>Search Channel</button>
                {windowSize && windowSize.width > 1024 ? <button onClick={() => setIsChat(!isChat)}>Show Chat</button> : null}
            </div>
            <div className="player">
                <iframe id="twitchPlayer" src={"https://player.twitch.tv/?channel=" + channel + "&muted=true&parent=" + isProd} allowFullScreen autoPlay />

                {isChat ?
                    <iframe id="twitchChat" className="chat" src={"https://www.twitch.tv/embed/" + channel + "/chat?darkpopout&parent=" + isProd} allowFullScreen />
                    : null
                }
            </div>
            <div className="copyright">
                ©&nbsp;2024 - {new Date().getFullYear()}&nbsp;<a href="https://github.com/Yagasaki7K/app-stream" target="_blank" rel="noreferrer">app-stream</a>&nbsp;by&nbsp;<a href="https://yagasaki.dev" target="_blank" rel="noreferrer">Yagasaki7K</a>&nbsp;<span>|</span>&nbsp;Todas as imagens são marcas registradas dos seus respectivos proprietários
            </div>
        </AppDetails>
    )
}

export default App

const AppDetails = styled.div`
    display: flex;
    flex-direction: column;
    min-height: 100vh;
    position: relative;

    input, button, iframe {
        border-radius: 15px;
    }

    a {
        text-decoration: none;
        color: var(--font-light);
        font-weight: bold;
    }

    .header {
        width: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
        flex-wrap: wrap;
        gap: 0.75rem;
        padding: clamp(0.75rem, 1vw, 1.5rem) clamp(1rem, 2vw, 2.5rem);
        max-width: 1600px;
        margin: 0 auto;

        input, button {
            border: 2px solid var(--border);
            outline: none;
            padding: 10px 20px;
            margin: 0;

            @media (max-width: 768px) {
                padding: 10px 10px;
            }
        }

        button {
            height: 50px;
            font-size: 18px;
            background: var(--purple);
            color: var(--font-light);
            flex: 0 0 auto;
            padding-inline: 1.5rem;

            &:hover {
                cursor: pointer;
                background-color: var(--background-alt);
            }
        }

        input {
            flex: 1 1 280px;
            height: 50px;
            font-size: 18px;
            color: white;
            background-color: transparent;
            min-width: 0;
        }
    }

    .player {
        display: flex;
        justify-content: center;
        align-items: stretch;
        flex-wrap: wrap;
        gap: 1rem;
        padding: clamp(0.5rem, 2vw, 3rem);
        margin: 0 auto;
        width: 100%;
        max-width: 1920px;

        iframe {
            flex: 1 1 720px;
            width: 100%;
            max-width: 1280px;
            aspect-ratio: 16 / 9;
            height: auto;
            border: none;
            box-shadow: 0 10px 30px rgb(0 0 0 / 0.2);

            @media (min-width: 1600px) {
                max-width: 1600px;
            }

            @media (max-width: 768px) {
                flex-basis: 100%;
            }
        }

        .chat {
            flex: 0 1 360px;
            max-width: 420px;
            min-width: 260px;
            aspect-ratio: 9 / 16;
            height: auto;
            border: none;
            margin-left: 0;

            @media (max-width: 768px) {
                max-width: none;
                width: 100%;
                aspect-ratio: 16 / 9;
            }
        }
    }

    .copyright {
        display: flex;
        justify-content: center;
        align-items: center;
        color: var(--font-light);
        padding: 1rem;

        @media (max-width: 768px) {
            padding: 1.5rem;
            flex-direction: column;
            text-align: center;

            span {
                display: none;
            }
        }
    }
`