import React, { useState , useEffect }from 'react';
import { fetchDailyData } from '../../api';
import { Line , Bar } from 'react-chartjs-2';

import styles from './Chart.module.css'

const Chart =({ data , country }) =>{
    const [dailyData, setDailyData] =useState([]);
    useEffect(() => {
       const fetchAPI = async () =>{
           setDailyData(await fetchDailyData());
       }

       fetchAPI();
    },[]);

    const lineChart = (
        dailyData.length !== 0
        ? (
        <Line
        data ={{
            labels : dailyData.map(({ date } )=> date),
            datasets:[{
                data : dailyData.map(({ confirmed }) => confirmed),
                label: 'Infected',
                borderColor : '#3333ff',
                fill : true,
            },{
                data : dailyData.map(({ deaths })=> deaths),
                label: 'Deaths',
                borderColor: 'red',
                fill: true,
            }],
        }}
        />): null
    );

    const barChart = (
        data.confirmed ?
        (
            <Bar 
            data={{
                labels :['Infected' , 'Recovered' , 'Deaths'],
                datasets : [{
                    label: 'People',
                    backgroundColor:   [
                        'rgba(0, 0, 255, 0.5)', 'rgba(0, 255, 0, 0.5)' ,'rgba(255, 0, 0, 0.5)'
                    ],
                    data : [data.confirmed.value, 0.95*data.confirmed.value , data.deaths.value],
                }]    
            }}
            option={{
                legend: {display : false },
                title :{ display: true , text: `Current state is ${country}`},
            }}
            />
        ):null);

    
    return (
        <h1 className={styles.container}>
            {country ? barChart : lineChart }
        </h1>
    )
}


export default Chart;
