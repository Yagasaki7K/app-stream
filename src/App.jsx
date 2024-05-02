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
                    <iframe id="twitchChat" className="chat" src={"https://www.twitch.tv/embed/" + channel + "/chat?parent=" + isProd} allowFullScreen />
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

        input, button {
            border: 2px solid var(--border);
            outline: none;
            padding: 10px 20px;
            margin: 1rem 0;

            @media (max-width: 768px) {
                padding: 10px 10px;
            }
        }

        button {
            height: 50px;
            font-size: 18px;
            background: var(--purple);
            color: var(--font-light);
            margin-right: 1rem;

            &:hover {
                cursor: pointer;
                background-color: var(--background-alt);
            }
        }

        input {
            width: 50%;
            height: 50px;
            font-size: 18px;
            color: white;
            background-color: transparent;
            margin-right: 1rem;
        }
    }

    .player {
        display: flex;
        justify-content: center;
        align-items: center;
        padding: 0 2rem;

        iframe {
            width: 90%;
            height: 51.4rem;
            border: none;

            @media (max-width: 768px) {
                height: 30rem;
            }
        }

        .chat {
            width: 20%;
            height: 51.4rem;
            border: none;
            margin-left: 1rem;

            @media (max-width: 768px) {
                height: 30rem;
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