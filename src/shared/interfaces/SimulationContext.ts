import {
    Simulation,
    SimulationRequest,
    SimulationType
} from '@ffknob/elastic-apm-demo-shared';

export default interface SimulationContext {
    simulations: Simulation[];
    executeSimulation: (
        simulationType: SimulationType,
        simulationRequest: SimulationRequest
    ) => void;
}
