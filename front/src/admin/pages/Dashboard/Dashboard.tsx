import React from "react";
import DefaultLayout from '../../layout/DefaultLayout';
import CardViews from '../../components/Card/CardViews';
import CardOrders from '../../components/Card/CardOrders';
import CardMoney from '../../components/Card/CardMoney';
import CardUsers from '../../components/Card/CardUsers';
import ChartOne from '../../components/Chart/ChartOne';
import ChartTwo  from '../../components/Chart/ChartTwo';
import ChartThree  from '../../components/Chart/ChartThree';
import MapOne  from '../../components/MapOne/MapOne';
import TableOne  from '../../components/Table/TableOne';
import ChatCard  from '../../components/Chat/ChatCard';

const Dashboard: React.FC = () => {

    return (
        <>
            <DefaultLayout>
                <div className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-6 xl:grid-cols-4 2xl:gap-7.5">
                    <CardViews />
                    <CardUsers />
                    <CardOrders />
                    <CardMoney />
                </div>
                <div className="mt-4 grid grid-cols-12 gap-4 md:mt-6 md:gap-6 2xl:mt-7.5 2xl:gap-7.5">
                    <ChartOne />
                    <ChartTwo />
                    <ChartThree />
                    <MapOne />
                    <div className="col-span-12 xl:col-span-8">
                        <TableOne />
                    </div>
                    <ChatCard />
                </div>
            </DefaultLayout>
        </>
    );
};

export default Dashboard;