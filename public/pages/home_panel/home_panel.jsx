import './home_panel.scss';

export default function HomePanel() {
    return (
        <>
            <div className={"backdrop"}>
                <div className={"title"}>
                    <img></img>
                    <h1 className={"web-title"}>OtoWave</h1>
                </div>
                <div className={"buttons"}>
                    <button>Главная</button>
                    <button>Навигатор</button>
                </div>
            </div>
        </>
    );
}