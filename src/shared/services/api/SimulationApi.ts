import { from } from 'rxjs';
import { v4 as uuid } from 'uuid';

import {
    BackendSuccess,
    BackendError,
    BackendResponse,
    Request,
    Simulation,
    SimulationRequest,
    SimulationResponseResult,
    SimulationResponseError
} from '@ffknob/elastic-apm-demo-shared';

import Api from './Api';

export const simulate = (
    simulation: Simulation
): Request<SimulationRequest> => {
    const endpoint = `/simulation/${simulation.type}`;

    const request: Request<SimulationRequest> = {
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

    request.response$ = from<Promise<BackendResponse>>(
        Api.post<
            SimulationRequest,
            | BackendSuccess<SimulationResponseResult>
            | BackendError<SimulationResponseError<any>>
        >(request)
            .then(
                ({
                    status,
                    statusText,
                    data: { metadata, statusMessage, data }
                }: any) => {
                    const backendSuccess: BackendSuccess<SimulationResponseResult> = {
                        success: true,
                        statusCode: status,
                        statusMessage: `${statusText} (${statusMessage})`,
                        metadata,
                        data
                    };

                    return backendSuccess;
                }
            )
            .catch(
                ({
                    response: {
                        status,
                        statusText,
                        data: { metadata, statusMessage, errors }
                    }
                }: any) => {
                    const backendError: BackendError<SimulationResponseError<
                        any
                    >> = {
                        success: false,
                        statusCode: status,
                        statusMessage: `${statusText} (${statusMessage})`,
                        metadata
                    };

                    return backendError;
                }
            )
    );

    return request;
};

export default { simulate };
