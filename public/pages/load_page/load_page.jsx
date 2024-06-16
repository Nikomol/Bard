import './load_page.scss';

export default function ProgressBar({ progress }) {
    return (
        <>
            <div className='main_progress-bar-container'>
                <div className="loading_progress-bar">
                    <div className="loading_progress-bar__filler" style={{ width: `${progress}%` }}></div>
                </div>
            </div>
        </>
    );
}