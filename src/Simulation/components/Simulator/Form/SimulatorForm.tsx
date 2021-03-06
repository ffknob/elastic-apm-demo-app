import React, { useState, useContext } from 'react';

import { EuiForm, EuiSpacer } from '@elastic/eui';

import {
    SimulationParameters,
    SimulationOptions,
    SimulationRequest,
    SimulationType
} from '@ffknob/elastic-apm-demo-shared';

import SimulatorFormParameters from './Parameters/SimulatorFormParameters';
import SimulatorFormOptions from './Options/SimulatorFormOptions';
import SimulatorActions from './Actions/SimulatorActions';

import SimulationContext from '../../../../shared/context/SimulationContext';
import ISimulationContext from '../../../../shared/interfaces/SimulationContext';

import './SimulatorForm.scss';

export interface SimulatorFormProps {}

const SimulatorForm: React.FC<SimulatorFormProps> = (
    props: SimulatorFormProps
) => {
    const simulationContext: ISimulationContext = useContext(SimulationContext);

    const [simulatorFormParameters, setSimulatorFormParameters] = useState<
        SimulationParameters
    >({
        numberOfRequests: 1,
        interval: 500,
        maxRandomDelay: 50,
        timeout: 5000
    });
    const [simulatorFormOptions, setSimulatorFormOptions] = useState<
        SimulationOptions
    >({
        randomUserContext: true,
        randomCustomContext: true,
        randomLabels: true
    });

    const executeSimulation = (simulationType: SimulationType): void => {
        const simulationRequest: SimulationRequest = {
            parameters: simulatorFormParameters,
            options: simulatorFormOptions
        };

        simulationContext.executeSimulation(simulationType, simulationRequest);
    };

    return (
        <EuiForm component="form">
            <SimulatorFormParameters
                simulatorFormParameters={simulatorFormParameters}
                onSimulatorFormParametersChanged={(
                    simulatorFormParameters: SimulationParameters
                ) => setSimulatorFormParameters(simulatorFormParameters)}
            />

            <EuiSpacer size="m" />

            <SimulatorFormOptions
                simulatorFormOptions={simulatorFormOptions}
                onSimulatorFormOptionsChanged={(
                    simulatorFormOptions: SimulationOptions
                ) => setSimulatorFormOptions(simulatorFormOptions)}
            />

            <EuiSpacer size="m" />

            <SimulatorActions onExecuteSimulation={executeSimulation} />
        </EuiForm>
    );
};

export default SimulatorForm;
