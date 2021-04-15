import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import { TableComposable, Tbody, Tr, Td, Thead, Th as PFTh } from '@patternfly/react-table';

// import LoadingState from './LoadingState';
import { formatJobType } from '../Utilities/helpers';
import JobStatus from './JobStatus';

const headerLabels = [ 'Id/Name', 'Status', 'Cluster', 'Organization', 'Type' ];

const Th = styled(PFTh)`
  --pf-c-table--cell--Overflow: initial;
`;

const PlannerList = ({ jobs }) => {
    return (
        <>
            {/* {jobs.length <= 0 && <LoadingState />} */}
            <TableComposable aria-label="Planner table">
                <Thead>
                    <Tr>
                        {headerLabels.map(label => (
                            <Th id={`planner-${label}`} key={label}>
                                {label}
                            </Th>
                        ))}
                    </Tr>
                </Thead>
                <Tbody>
                    {jobs.map((item) => (
                        <Tr id={`planner-row-${item.id}`} key={`planner-row-${item.id}`} >
                            <Td dataLabel='Id/Name'>
                                <a
                                    href={item.id.tower_link}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    {`${item.id.id} - ${item.id.template_name}`}
                                </a>
                            </Td>
                            <Td dataLabel='Status'>
                                <div>
                                    <JobStatus status={item.status} />
                                </div>
                            </Td>
                            <Td dataLabel='Cluster'>
                                {item.cluster_name}
                            </Td>
                            <Td dataLabel='Organization'>
                                {item.org_name}
                            </Td>
                            <Td dataLabel='Type'>
                                {formatJobType(item.job_type)}
                            </Td>
                            <Td />
                        </Tr>
                    ))}
                </Tbody>
            </TableComposable>
        </>
    );
};

PlannerList.propTypes = {
    jobs: PropTypes.array
};

export default PlannerList;
