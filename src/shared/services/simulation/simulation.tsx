import { v4 as uuid } from 'uuid';
import { Subject, interval } from 'rxjs';
import { take } from 'rxjs/operators';

import {
    Simulation,
    SimulationRequest,
    SimulationResponseResult,
    SimulationResponseError,
    SimulationStats,
    SimulationType,
    Request,
    BackendSuccess,
    BackendError,
    BackendResponse
} from '@ffknob/elastic-apm-demo-shared';

import { simulate } from '../api';

const createRequest = (simulation: Simulation): Request<SimulationRequest> => {
    simulation.stats!.total =
        simulation.simulationRequest?.parameters.numberOfRequests;
    simulation.stats!.sent = simulation.stats!.sent! + 1;

    return simulate(simulation);
};

const updateStats = (
    simulation: Simulation,
    simulationRequest: Request<SimulationRequest>,
    backendResponse: BackendResponse
) => {
    simulation.stats!.completed! = simulation!.stats!.completed! + 1;

    simulationRequest.time.end = new Date();
    simulationRequest.time.took =
        simulationRequest.time.end.getTime() -
        simulationRequest.time.start.getTime();

    simulation.stats!.time!.took =
        simulationRequest.time.end.getTime() -
        simulation.stats!.time!.start.getTime();

    if (!simulation.stats?.time?.min) {
        simulation.stats!.time!.min = simulationRequest.time.took;
    } else {
        simulation.stats!.time!.min =
            simulation.stats!.time!.min > simulationRequest.time.took
                ? simulationRequest.time.took
                : simulation.stats!.time!.min;
    }

    if (!simulation.stats?.time?.max) {
        simulation.stats!.time!.max = simulationRequest.time.took;
    } else {
        simulation.stats!.time!.max =
            simulation.stats!.time!.max < simulationRequest.time.took
                ? simulationRequest.time.took
                : simulation.stats!.time!.max;
    }

    if (!simulation.stats?.time?.avg) {
        simulation.stats!.time!.avg = simulationRequest.time.took;
    } else {
        simulation.stats!.time!.avg =
            (simulation.stats!.time!.avg + simulationRequest.time.took) / 2;
    }

    /*if (backendResponse.success) {
        const response: BackendResponse<BackendSuccess<
            SimulationResponseResult
        >> = backendResponse as BackendResponse<
            BackendSuccess<SimulationResponseResult>
        >;
    } else {
        const response: BackendResponse<BackendError<
            SimulationResponseResult
        >> = backendResponse as BackendResponse<
            BackendError<SimulationResponseResult>
        >;
    }
         */
    simulation.stats$?.next(simulation.stats);
};

export const executeSimulation = (
    simulationType: SimulationType,
    simulationRequest: SimulationRequest
): Simulation => {
    const simulation: Simulation = {
        id: uuid(),
        type: simulationType,
        simulationRequest: simulationRequest,
        requests: [],
        requests$: new Subject<Request<SimulationRequest>[]>(),
        stats: {
            total: 0,
            sent: 0,
            completed: 0,
            timedOut: 0,
            time: {
                start: new Date()
            }
        },
        stats$: new Subject<SimulationStats>()
    };

    interval(simulationRequest.parameters.interval)
        .pipe(take(simulationRequest.parameters.numberOfRequests))
        .subscribe((index: number) => {
            if (!simulation.requests) {
                simulation.requests = [];
            }

            const request = createRequest(simulation);

            request.response$!.subscribe(
                (response: BackendResponse) => {
                    request.response = response;

                    updateStats(simulation, request, response);
                },
                (err: BackendResponse) => {
                    request.response = err;

                    updateStats(simulation, request, err);
                }
            );

            simulation.requests.push(request);
            simulation.requests$?.next(simulation.requests);
            simulation.stats$?.next(simulation.stats);
        });

    return simulation;
};

export default { executeSimulation };
