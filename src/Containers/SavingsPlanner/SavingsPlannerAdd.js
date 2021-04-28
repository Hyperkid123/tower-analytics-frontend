/* eslint-disable */
import React, { useState, useEffect } from 'react';
import { withRouter } from 'react-router-dom';

import {
    Card,
    CardBody,
    Form,
    FormGroup,
    Grid,
    Popover,
    TextInput,
    Select,
    SelectOption,
    Wizard
} from '@patternfly/react-core';

import {
    Main,
    PageHeader,
    PageHeaderTitle,
} from '@redhat-cloud-services/frontend-components';

import Breadcrumbs from '../../Components/Breadcrumbs';

import useApi from '../../Utilities/useApi';

import { readPlanOptions } from '../../Api';

const SavingsPlannerAdd = ({ history, location}) => {

    useEffect(() => {
        if (location.hash) {
            setStartStep(steps.find(step => `#${step.id}` === location.hash).step_number);
        } else {
            history.replace({
                hash: 'details'
            });
            setStartStep(1);
        }

        setOptions(readPlanOptions());
    }, []);

    const onStepChange = (newStep) => {
        history.replace({
            hash: newStep.id
        });
    };

    const onSave = () => {
        console.log("saving!")
    }

    const [ options, setOptions ] = useApi({});

    const [ startStep, setStartStep ] = useState(null);

    const [ planName, setPlanName ] = useState("");
    const [ planType, setPlanType ] = useState('networking');
    const [ planDescription, setPlanDescription ] = useState("");
    const [ planTime, setPlanTime ] = useState(null);
    const [ planHosts, setPlanHosts ] = useState("");
    const [ planFrequency, setPlanFrequency ] = useState(null);

    const [ typeIsOpen, setTypeIsOpen ] = useState(false);
    const [ timeIsOpen, setTimeIsOpen ] = useState(false);
    const [ frequencyIsOpen, setFrequencyIsOpen ] = useState(false);

    const planDetails = (
        <Form>
            <Grid hasGutter md={6}>
                <FormGroup label="What do you want to automate?" isRequired fieldId="name-field">
                    <TextInput
                        isRequired
                        placeholder="Example: Provision NGINX server"
                        type="text"
                        id="name-field"
                        name="name"
                        value={planName}
                        onChange={(newName) => setPlanName(newName)}
                    />
                </FormGroup>
                <FormGroup label="What type of task is it?" fieldId="type-field">
                    <Select
                        id="type-field"
                        isOpen={typeIsOpen}
                        variant={'single'}
                        aria-label={'Plan type selector'}
                        onToggle={() => setTypeIsOpen(!typeIsOpen)}
                        onSelect={(_event, selection) => {
                            setPlanType(selection);
                            setTypeIsOpen(false);
                        }}
                        selections={planType}
                    >
                        {/* {options.data.categories.map(({ key, name }) => (
                            <SelectOption key={key} value={key}>
                                {name}
                            </SelectOption>
                        ))} */}
                        <SelectOption key="networking" value="networking">
                            Networking
                        </SelectOption>
                        <SelectOption key="cloud" value="cloud">
                            Cloud
                        </SelectOption>
                    </Select>
                </FormGroup>
                <FormGroup label="Description" fieldId="description-field">
                    <TextInput
                        type="text"
                        placeholder="Place description here"
                        id="description-field"
                        name="description"
                        value={planDescription}
                        onChange={(newDescription) => setPlanDescription(newDescription)}
                    />
                </FormGroup>
                <FormGroup
                    label="How long does it take to do this manually" 
                    fieldId="time-field"
                    labelIcon={
                      <Popover
                        content="Enter the average amount of time the thing you are trying to automate takes each time it is done."
                      />
                    }
                >
                    <Select
                        id="time-field"
                        isOpen={timeIsOpen}
                        variant={'single'}
                        placeholderText="Select amount"
                        aria-label={'Plan time selector'}
                        onToggle={() => setTimeIsOpen(!timeIsOpen)}
                        onSelect={(_event, selection) => {
                            setPlanTime(selection);
                            setTimeIsOpen(false);
                        }}
                        selections={planTime}
                    >
                        <SelectOption key="5_minutes" value="5_minutes">
                            5 minutes
                        </SelectOption>
                        <SelectOption key="1_hour" value="1_hour">
                            1 hour
                        </SelectOption>
                    </Select>
                </FormGroup>
                <FormGroup label="How many hosts do you plan to run this on?" fieldId="hosts-field">
                    <TextInput
                        type="number"
                        placeholder="Enter number of hosts"
                        id="hosts-field"
                        name="hosts"
                        value={planHosts}
                        onChange={(newHosts) => setPlanHosts(newHosts)}
                    />
                </FormGroup>
                <FormGroup
                  label="How often do you do this?"
                  fieldId="frequency-field"
                  labelIcon={
                    <Popover
                      content="Enter the average number of times the thing you are trying to automate is done manually."
                    />
                  }
                >
                    <Select
                        id="frequency-field"
                        isOpen={frequencyIsOpen}
                        variant={'single'}
                        placeholderText="Select amount"
                        aria-label={'Plan frequency selector'}
                        onToggle={() => {
                            console.log("got here");
                            setFrequencyIsOpen(!frequencyIsOpen)
                        }}
                        onSelect={(_event, selection) => {
                            setPlanFrequency(selection);
                            setFrequencyIsOpen(false);
                        }}
                        selections={planFrequency}
                    >
                        <SelectOption key="once" value="once">
                            Once
                        </SelectOption>
                        <SelectOption key="five_times" value="five_times">
                            Five times
                        </SelectOption>
                    </Select>
                </FormGroup>
            </Grid>
        </Form>
    );

    const steps = [
        { step_number: 1, id: 'details', name: 'Details', component: planDetails },
        { step_number: 2, id: 'tasks', name: 'Tasks', component: <p>TODO: Tasks form</p> },
        { step_number: 3, id: 'link_template', name: 'Link template', component: <p>TODO: Template linking form</p>, nextButtonText: 'Save'},
    ];

    const title = 'Create new plan';

    return (
        <React.Fragment>
            <PageHeader>
                <Breadcrumbs items={[{title: 'Savings Planner', navigate: '/savings-planner'}]} />
                <PageHeaderTitle title={'Create new plan'} />
            </PageHeader>
                <Main>
                    <Card>
                        <CardBody>
                            {startStep && options.isSuccess && (<Wizard
                                navAriaLabel={`${title} steps`}
                                mainAriaLabel={`${title} content`}
                                steps={steps}
                                onGoToStep={onStepChange}
                                onNext={onStepChange}
                                onBack={onStepChange}
                                onSave={onSave}
                                startAtStep={startStep}
                                height="calc(100vh - 285px)"
                            />)}
                        </CardBody>
                    </Card>
                </Main>
        </React.Fragment>
    );
};

SavingsPlannerAdd.propTypes = {
};

export default withRouter(SavingsPlannerAdd);
