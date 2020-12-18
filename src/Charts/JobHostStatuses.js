/* eslint-disable */
import React, { useState, useRef } from 'react';
import useResizeObserver from 'use-resize-observer';

import { Chart, ChartBar, ChartAxis, ChartStack, ChartThemeColor, ChartTooltip } from '@patternfly/react-charts';
import { ChartThemeDefinition } from '@patternfly/react-charts';
import { ChartLegend } from '@patternfly/react-charts';
import { ChartGroup } from '@patternfly/react-charts';

import * as d3 from 'd3';

const JobHostStatuses = (props) => {
    const { data } = props
    
    console.log(data)

    const ref = useRef(null);
    const { width = 100, height } = useResizeObserver({ ref });

    return (
        null
    );
}

export default JobHostStatuses;
