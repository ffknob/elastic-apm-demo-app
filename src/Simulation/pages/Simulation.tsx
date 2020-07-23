import React, { useState } from 'react';

import { EuiFlexGroup, EuiFlexItem } from '@elastic/eui';

import {
    Request,
    Simulation as ISimulation,
    SimulationRequest,
    SimulationStats,
    SimulationType
} from '@ffknob/elastic-apm-demo-shared';

import { Page } from '../../shared/layout/Page';

import SimulationContext from '../../shared/context/SimulationContext';

import { Simulator } from '../components/Simulator';
import { SimulationResults } from '../components/Results';

import { executeSimulation } from '../../shared/services/simulation/simulation';

import './Simulation.scss';

const Simulation: React.FC = () => {
    const [simulations, setSimulations] = useState<ISimulation[]>([]);

    const includeSimulation = (simulation: ISimulation) => {
        setSimulations((simulations: ISimulation[]) => {
            return [...simulations, simulation];
        });
    };

    const updateSimulation = (simulation: ISimulation) => {
        setSimulations((simulations: ISimulation[]) =>
            simulations.map((_simulation: ISimulation) =>
                _simulation.id === simulation.id ? simulation : _simulation
            )
        );
    };

    const executeSimulationHandler = (
        simulationType: SimulationType,
        simulationRequest: SimulationRequest
    ) => {
        const simulation: ISimulation | void = executeSimulation(
            simulationType,
            simulationRequest
        );

        includeSimulation(simulation);

        if (simulation.requests$) {
            simulation.requests$.subscribe(
                (requests: Request<SimulationRequest>[]) =>
                    updateSimulation({ ...simulation, requests })
            );
        }

        if (simulation.stats$) {
            simulation.stats$.subscribe((stats: SimulationStats) =>
                updateSimulation({ ...simulation, stats })
            );
        }
    };

    return (
        <SimulationContext.Provider
            value={{
                simulations: simulations,
                executeSimulation: executeSimulationHandler
            }}>
            <Page pageTitle="Simulation">
                <EuiFlexGroup>
                    <EuiFlexItem grow={false}>
                        <Simulator />
                    </EuiFlexItem>
                    <EuiFlexItem>
                        <SimulationResults />
                    </EuiFlexItem>
                </EuiFlexGroup>
            </Page>
        </SimulationContext.Provider>
    );
};

export default Simulation;
