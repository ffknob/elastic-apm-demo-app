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

const GRAPH_SIZE_WINDOW: number = 60000; // 1 minute
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
        if (autoRefresh) {
            const interval = setInterval(() => {
                resetXAxisDomain();
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

    const isInsideTimeWindow = (
        m: number,
        timeWindow: [number, number]
    ): boolean => {
        return (m >= timeWindow[0] && m <= timeWindow[1]) || false;
    };

    const resetXAxisDomain = () => {
        const date: Date = new Date();
        const min: number = date.getTime() - GRAPH_SIZE_WINDOW;
        const max: number = date.getTime();
        setXAxisDomain({ min, max });
    };

    const xAxisFilterHandler = (x: [number, number] | null) => {
        if (x !== null) {
            setXAxisFilter(x);
            setXAxisDomain({ min: x[0], max: x[1] });
        }
        setAutoRefresh(false);
    };

    const xAxisFilterRemovedHandler = () => {
        setXAxisFilter(null);
        resetXAxisDomain();
    };

    const autoRefreshChangeHandler = (checked: boolean) => {
        setAutoRefresh(checked);
        setXAxisFilter(null);
    };

    const noData: React.ReactElement = <></>;
    const graph: React.ReactElement = (
        <EuiFlexGroup direction="row">
            <EuiFlexItem grow={true}>
                <Chart size={{ height: 300 }}>
                    <Settings
                        showLegend
                        legendPosition="bottom"
                        xDomain={xAxisDomain}
                        onBrushEnd={({ x }) =>
                            x ? xAxisFilterHandler(x) : null
                        }
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
                                        ? isInsideTimeWindow(m[0], xAxisFilter)
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
            <EuiFlexItem grow={false}>
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
