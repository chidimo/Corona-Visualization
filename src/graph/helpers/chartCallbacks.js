/* eslint-disable no-unused-vars */
const chartCallbacks = {
  fillSquareLegend: (fillColors, titles) =>
    function (chart) {
      const legends = fillColors.map((f, i) => {
        const container = document.createElement('div');
        const fillSquare = document.createElement('div');
        const legendText = document.createElement('span');

        container.style.display = 'flex';
        container.style.alignItems = 'center';
        container.style.paddingLeft = '8px';
        container.style.paddingBottom = '5px';

        fillSquare.style.height = '15px';
        fillSquare.style.width = '15px';
        fillSquare.style.marginLeft = '10px';
        fillSquare.style.borderRadius = '2px';
        fillSquare.style.marginRight = '10px';

        fillSquare.style.background = f;
        legendText.textContent = titles[i];

        container.innerHTML = fillSquare.outerHTML + legendText.outerHTML;
        return container.outerHTML;
      });

      return legends.join('');
    },
};

export default chartCallbacks;
