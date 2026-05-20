import React, { useMemo } from 'react';

import type { EChartsOption } from 'echarts';

import { Header, StatsCard, TripCard, EChart } from '../../../components';

import {

    allTrips,

    dashboardStats,

    tourismFootTrafficData,

    tourismTagsDistribution,

    user,

} from '~/constants';



const CHART_COLORS = ['#256ff1', '#12b76a', '#c11574', '#175cd3', '#027a48', '#4c94f4', '#ff7f00', '#94a3b8'];



const Dashboard = () => {

    const { totalUsers, userJoined, totalTrips, tripsCreated, userRole } = dashboardStats;



    const footTrafficOption = useMemo<EChartsOption>(

        () => ({

            tooltip: { trigger: 'axis' },

            grid: { left: '3%', right: '4%', bottom: '3%', containLabel: true },

            xAxis: {

                type: 'category',

                boundaryGap: false,

                data: tourismFootTrafficData.map((d) => d.month),

            },

            yAxis: {

                type: 'value',

                name: 'Visitors',

            },

            series: [

                {

                    name: 'Visitors',

                    type: 'line',

                    smooth: true,

                    data: tourismFootTrafficData.map((d) => d.visitors),

                    areaStyle: {

                        color: {

                            type: 'linear',

                            x: 0,

                            y: 0,

                            x2: 0,

                            y2: 1,

                            colorStops: [

                                { offset: 0, color: 'rgba(37, 111, 241, 0.35)' },

                                { offset: 1, color: 'rgba(37, 111, 241, 0.02)' },

                            ],

                        },

                    },

                    lineStyle: { color: '#256ff1', width: 2 },

                    itemStyle: { color: '#256ff1' },

                },

            ],

        }),

        []

    );



    const tagsDistributionOption = useMemo<EChartsOption>(

        () => ({

            tooltip: { trigger: 'item' },

            legend: {

                orient: 'vertical',

                right: 0,

                top: 'center',

            },

            color: CHART_COLORS,

            series: [

                {

                    name: 'Tags',

                    type: 'pie',

                    radius: ['40%', '70%'],

                    center: ['40%', '50%'],

                    avoidLabelOverlap: false,

                    itemStyle: {

                        borderRadius: 6,

                        borderColor: '#fff',

                        borderWidth: 2,

                    },

                    label: { show: false },

                    emphasis: {

                        label: { show: true, fontSize: 14, fontWeight: 'bold' },

                    },

                    data: tourismTagsDistribution.map(({ tag, count }) => ({

                        name: tag,

                        value: count,

                    })),

                },

            ],

        }),

        []

    );



    return (

        <main className='dashboard wrapper'>

            <Header

                title={`Welcome ${user?.name ?? 'Guest'} Hello!`}

                description="Track Activities and Trends"

            />

            <section className='flex flex-col gap-6'>

                <div className='grid grid-cols-1 md:grid-cols-3 gap-6'>

                    <StatsCard

                        headerTitle="Total Users"

                        total={totalUsers}

                        currentMonthCount={userJoined.currentMonth}

                        lastMonthCount={userJoined.lastMonth}

                    />

                    <StatsCard

                        headerTitle="Total Trips"

                        total={totalTrips}

                        currentMonthCount={tripsCreated.currentMonth}

                        lastMonthCount={tripsCreated.lastMonth}

                    />

                    <StatsCard

                        headerTitle="Active Users Today"

                        total={userRole.total}

                        currentMonthCount={userRole.currentMonth}

                        lastMonthCount={userRole.lastMonth}

                    />

                </div>

            </section>

            <section className='container'>

                <h1 className='text-xl font-semibold text-dark-100'>Analytics</h1>

                <div className='grid grid-cols-1 lg:grid-cols-2 gap-6'>

                    <article className='chart-card'>

                        <h2>Tourism Foot Traffic</h2>

                        <EChart option={footTrafficOption} />

                    </article>

                    <article className='chart-card'>

                        <h2>Tourism Tags Distribution</h2>

                        <EChart option={tagsDistributionOption} />

                    </article>

                </div>

            </section>

            <section className='container'>

                <h1 className='text-xl font-semibold text-dark-100'>Created Trips</h1>

                <div className='trip-grid'>

                    {allTrips.slice(0, 4).map(({ id, name, imageUrls, itinerary, tags, estimatedPrice }) => (

                        <TripCard

                            key={id}

                            id={id.toString()}

                            name={name}

                            imageUrl={imageUrls[0]}

                            location={itinerary?.[0]?.location ?? ''}

                            tags={tags}

                            price={estimatedPrice}

                        />

                    ))}

                </div>

            </section>

        </main>

    );

};



export default Dashboard;


