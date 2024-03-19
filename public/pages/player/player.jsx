import './player.css';

export default function Player({ music = undefined }) {
    return (
        <>
            <footer>
                <div className="playerContainer">
                    <p>{music === null ? "No music" : `Music name is ${music}`}</p>
                </div>
            </footer>
        </>
    );
}