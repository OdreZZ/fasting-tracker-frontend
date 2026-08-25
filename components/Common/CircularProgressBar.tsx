import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';

interface CircularProgressBarProps {
    percentage: number,
}

export default function CircularProgressBar({ percentage }: CircularProgressBarProps) {
    return <div>
        <CircularProgressbar
            value={percentage}
            styles={buildStyles({
                pathColor: '#002366',
            })}
        />
    </div>
}