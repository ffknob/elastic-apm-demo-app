import React, { useState, useEffect } from 'react';

import { EuiFlexGroup, EuiFlexItem } from '@elastic/eui';
import {
    Chart,
    Settings,
    Axis,
    LineSeries,
    niceTimeFormatByDay,
    timeFormatter,
    DomainRange
} from '@elastic/charts';
import { Domain } from '@elastic/charts/dist/utils/domain';
import '@elastic/charts/dist/theme_light.css';

import SimulationStatsGraphControls from './SimulationStatsGraphControls';

export interface SimulationStatsGraphSeries {
    id: string;
    name: string;
    color: string;
    data: Array<[number, number]>;
}

export interface SimulationStatsGraphProps {
    simulationStatsGraphSeries: {
        [series: string]: SimulationStatsGraphSeries;
    };
}

const GRAPH_SIZE_WINDOW: number = 300000; // 5 minutes
const AUTO_REFRESH_INTERVAL: number = 1000; // 1 second

const SimulationStatsGraph: React.FC<SimulationStatsGraphProps> = (
    props: SimulationStatsGraphProps
) => {
    const { simulationStatsGraphSeries } = props;

    const [hasSimulationData, setHasSimulationData] = useState<boolean>(false);
    const [xAxisDomain, setXAxisDomain] = useState<Domain | DomainRange>({
        min: new Date().getTime() - GRAPH_SIZE_WINDOW
    });
    const [xAxisFilter, setXAxisFilter] = useState<[number, number] | null>(
        null
    );
    const [autoRefresh, setAutoRefresh] = useState<boolean>(false);

    useEffect(() => {
        console.log('useEffect');
        if (autoRefresh) {
            const interval = setInterval(() => {
                const date: Date = new Date();
                const min: number = date.getTime() - GRAPH_SIZE_WINDOW;
                const max: number = date.getTime();

                setXAxisDomain({ min, max });
            }, AUTO_REFRESH_INTERVAL);

            return () => clearInterval(interval);
        }
    }, [autoRefresh]);

    useEffect(() => {
        if (
            Object.keys(simulationStatsGraphSeries).some(
                (k: string) => simulationStatsGraphSeries[k].data.length > 0
            )
        ) {
            setHasSimulationData(true);
        } else {
            setHasSimulationData(false);
        }
    }, [simulationStatsGraphSeries]);

    const xAxisFilterHandler = (x: [number, number] | null) => {
        setXAxisFilter(x);
        setAutoRefresh(false);
    };

    const xAxisFilterRemovedHandler = () => setXAxisFilter(null);

    const autoRefreshChangeHandler = (checked: boolean) => {
        setAutoRefresh(checked);
        setXAxisFilter(null);
    };

    const noData: React.ReactElement = <></>;
    const graph: React.ReactElement = (
        <EuiFlexGroup direction="column">
            <EuiFlexItem>
                <Chart size={{ height: 200 }}>
                    <Settings
                        showLegend
                        legendPosition="bottom"
                        onBrushEnd={({ x }) => (x ? setXAxisFilter(x) : null)}
                        xDomain={xAxisDomain}
                    />
                    <Axis
                        title="Measurements"
                        id="bottom-axis"
                        position="bottom"
                        tickFormat={timeFormatter(niceTimeFormatByDay(1))}
                        showGridLines
                    />
                    <Axis id="left-axis" position="left" showGridLines />

                    {Object.keys(simulationStatsGraphSeries).map(
                        (k: string) => (
                            <LineSeries
                                key={k}
                                id={simulationStatsGraphSeries[k].id}
                                name={simulationStatsGraphSeries[k].name}
                                data={simulationStatsGraphSeries[
                                    k
                                ].data.filter((m: [number, number]) =>
                                    xAxisFilter
                                        ? m[0] >= xAxisFilter[0] &&
                                          m[0] <= xAxisFilter[1]
                                        : true
                                )}
                                xScaleType="time"
                                xAccessor={0}
                                yAccessors={[1]}
                                color={simulationStatsGraphSeries[k].color}
                            />
                        )
                    )}
                </Chart>
            </EuiFlexItem>
            <EuiFlexItem>
                <SimulationStatsGraphControls
                    onAutoRefreshChanged={autoRefreshChangeHandler}
                    onXAxisFilterRemoved={xAxisFilterRemovedHandler}
                    autoRefresh={autoRefresh}
                    xAxisFilter={xAxisFilter}
                />
            </EuiFlexItem>
        </EuiFlexGroup>
    );

    return hasSimulationData ? graph : noData;
};

export default SimulationStatsGraph;
