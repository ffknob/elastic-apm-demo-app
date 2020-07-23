import React from 'react';

import {
    EuiBadge,
    EuiSwitch,
    EuiFlexGroup,
    EuiFlexItem,
    EuiSwitchEvent
} from '@elastic/eui';

import './SimulationStatsGraphControls.scss';

export interface SimulationStatsGraphControlsProps {
    onAutoRefreshChanged: (checked: boolean) => void;
    onXAxisFilterRemoved: () => void;
    autoRefresh: boolean;
    xAxisFilter: [number, number] | null;
}

const SimulationStatsGraphControls: React.FC<SimulationStatsGraphControlsProps> = (
    props: SimulationStatsGraphControlsProps
) => {
    const {
        onAutoRefreshChanged,
        onXAxisFilterRemoved,
        autoRefresh,
        xAxisFilter
    } = props;

    return (
        <EuiFlexGroup
            direction="column"
            alignItems="flexStart"
            justifyContent="flexStart">
            <EuiFlexItem grow={false}>
                <EuiSwitch
                    label="Auto-refresh"
                    checked={autoRefresh}
                    onChange={(e: EuiSwitchEvent) =>
                        onAutoRefreshChanged(e.target.checked)
                    }
                />
            </EuiFlexItem>
            {xAxisFilter && (
                <EuiFlexItem grow={false}>
                    <EuiBadge
                        color="hollow"
                        iconType="cross"
                        iconSide="right"
                        iconOnClick={() => onXAxisFilterRemoved()}
                        iconOnClickAriaLabel="Remove filter">
                        {`${new Date(
                            xAxisFilter[0]
                        ).toLocaleString()} - ${new Date(
                            xAxisFilter[1]
                        ).toLocaleString()}`}
                    </EuiBadge>
                </EuiFlexItem>
            )}
        </EuiFlexGroup>
    );
};

export default SimulationStatsGraphControls;
