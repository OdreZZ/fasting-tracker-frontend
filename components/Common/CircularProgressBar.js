import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';

export default function CircularProgressBar({ percentage }) {

    return <div>
        <CircularProgressbar
            value={percentage}
            styles={buildStyles({
                pathColor: '#009c44',
            })}
        />
    </div>
}