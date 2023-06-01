import React from 'react';
import Breadcrumb from '../../components/Breadcrumb/Breadcrumb';
import ChartFour from '../../components/Chart/ChartFour';
import ChartOne from '../../components/Chart/ChartOne';
import ChartThree from '../../components/Chart/ChartThree';
import ChartTwo from '../../components/Chart/ChartTwo';
import DefaultLayout from '../../layout/DefaultLayout';

const Chart = () => {
  return (
    <DefaultLayout>
      <Breadcrumb pageName="Chart" />

      <div className="grid grid-cols-12 gap-4 md:gap-6 2xl:gap-7.5">
        <div className="col-span-12">
          <ChartFour />
        </div>
        <ChartOne />
        <ChartTwo />
        <ChartThree />
      </div>
    </DefaultLayout>
  );
};

export default Chart;
