import React, { Component } from 'react';
import { TabPanel, Container } from '@extjs/ext-react';

export default class TopTabsPanel extends Component {
    
    render() {
        return (

            <TabPanel 
                flex={1}
                shadow 
                defaults={{
                    cls: "card"
                }}
            >
                <Container title="Rules">
                    <div>By using this forum you accpept that Truls and Dae is pure awesome</div>
                </Container>
                <Container title="FAQ">
                    <div>Here are some frequently asked questions for the forum</div>
                </Container>
                <Container title="Bug Report">
                    <div>Here you can report bugs in the forum</div>
                </Container>
            </TabPanel>
        )
    }
}