import { createContext } from 'react';

import {
    SimulationType,
    SimulationRequest
} from '@ffknob/elastic-apm-demo-shared';

import ISimulationContext from '../interfaces/SimulationContext';

const SimulationContext = createContext<ISimulationContext>({
    simulations: [],
    executeSimulation: (
        simulationType: SimulationType,
        simulationRequest: SimulationRequest
    ) => {}
});

export default SimulationContext;
