import React from 'react';
import PropTypes from 'prop-types';

import { HorizontalBar } from 'react-chartjs-2';

export const PieChart = (props) => {
  const { title, yAxesData, labels } = props;

  const data = {
    labels,
    datasets: [
      {
        // barPercentage: 0.5,
        // categoryPercentage: 0.5,
        barThickness: 'flex',
        label: title,
        data: yAxesData,
        backgroundColor: [
          'red',
          'blue',
          'green',
          'yellow',
          'orange',
          'cyan',
          'red',
          'blue',
          'green',
          'yellow',
          'orange',
          'cyan',
          'red',
          'blue',
          'green',
          'yellow',
          'orange',
          'cyan',
          'red',
          'blue',
          'green',
          'yellow',
          'orange',
          'cyan',
          'red',
          'blue',
          'green',
          'yellow',
          'orange',
          'cyan',
          'red',
          'blue',
          'green',
          'yellow',
          'orange',
          'cyan',
          'red',
          'blue',
          'green',
          'yellow',
          'orange',
          'cyan',
          'red',
          'blue',
          'green',
          'yellow',
          'orange',
          'cyan',
        ],
      },
    ],
  };

  return (
    <div className="mt-2 mb-2">
      <HorizontalBar
        data={data}
        width={100}
        height={800}
        options={{
          maintainAspectRatio: true,
          title: {
            display: false,
          },
          legend: {
            display: false,
            position: 'left',
          },
          // plugins: {
          //   labels: {
          //     render: 'label',
          //     fontColor: '#000',
          //     position: 'outside',
          //   },
          // },
        }}
      />
    </div>
  );
};

PieChart.propTypes = {
  title: PropTypes.string,
  labels: PropTypes.array,
  yAxesData: PropTypes.array,
};
