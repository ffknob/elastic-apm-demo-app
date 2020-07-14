import { from } from 'rxjs';
import { v4 as uuid } from 'uuid';

import {
    BackendSuccess,
    BackendError,
    BackendResponse,
    Request,
    Simulation,
    SimulationRequest,
    SimulationRequestResult,
    SimulationRequestError
} from '@ffknob/elastic-apm-demo-shared';

import Api from './Api';

export const simulate = (
    simulation: Simulation
): Request<
    SimulationRequest,
    | BackendSuccess<SimulationRequestResult>
    | BackendError<SimulationRequestError>
> => {
    const endpoint = `/simulate/${simulation.type}`;

    const request: Request<
        SimulationRequest,
        | BackendSuccess<SimulationRequestResult>
        | BackendError<SimulationRequestError>
    > = {
        id: uuid(),
        request: {
            method: 'POST',
            endpoint: endpoint,
            data: simulation.simulationRequest
        },
        time: {
            start: new Date()
        }
    };

    request.response$ = from<
        Promise<
            BackendResponse<
                | BackendSuccess<SimulationRequestResult>
                | BackendError<SimulationRequestError>
            >
        >
    >(
        Api.post<
            SimulationRequest,
            | BackendSuccess<SimulationRequestResult>
            | BackendError<SimulationRequestError>
        >(request)
            .then(({ status, statusText, data: { metadata, data } }: any) => {
                const backendSuccess: BackendSuccess<SimulationRequestResult> = {
                    data
                };

                const backendResponse: BackendResponse<BackendSuccess<
                    SimulationRequestResult
                >> = {
                    success: true,
                    statusCode: status,
                    statusMessage: statusText,
                    metadata: metadata,
                    body: backendSuccess
                };

                return backendResponse;
            })
            .catch(
                ({
                    response: {
                        status,
                        statusText,
                        data: { metadata, errors }
                    }
                }: any) => {
                    const backendError: BackendError<SimulationRequestError> = {
                        errors: errors
                    };

                    const backendResponse: BackendResponse<BackendError<
                        SimulationRequestError
                    >> = {
                        success: false,
                        statusCode: status,
                        statusMessage: statusText,
                        metadata: metadata,
                        body: backendError
                    };

                    return backendResponse;
                }
            )
    );

    return request;
};

export default { simulate };
