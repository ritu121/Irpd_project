import React from 'react'
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
);


function BarChart(props) {
    const labels = ['January', 'February', 'March', 'April', 'May', 'June', 'July','August','September','October','November','December'];
    // const {dataset ,labels} = props
    const options = {
        responsive: true,
        plugins: {
            legend: {
                display:false,
            },
        },
    };

    const data = {
        labels: labels,
        datasets: [
            {
              label: 'Selected Candidates',
              data: [80,42,50,81,26,20,23,23,42,12,32,75],
              backgroundColor: 'rgba(253, 98, 80 ,0.7)',
            },
            {
              label: 'Rejected Candidates',
              data: [38,50,10,111,80,60,13,42,50,81,33,23],
              backgroundColor: 'rgba(9, 192, 178,0.7 )',
            },
            {
                label: 'InProcess Candidates',
                data: [68,20,40,11,80,60,23,12,20,61,43,23],
                backgroundColor: 'rgba(159, 178, 252,0.7)',
            }
          ],
    };
    return (
        <>
            <div style={{ margin: "0 auto 30px" }} className='w-4/5'>
                <Bar options={options} data={data}/>
            </div>
        </>
    );
}

export default BarChart