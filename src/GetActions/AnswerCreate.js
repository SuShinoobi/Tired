import React, { Component } from 'react';
import {
    Grid, Column, Button, RendererCell, SparkLineLine,
    TitleBar, Menu, MenuItem, SelectField, FormPanel,
    FieldSet, TextField
} from '@extjs/ext-react';

export default class CreateAnswer extends Component {
    constructor() {
        super();

        this.store = new Ext.data.Store({
            proxy: {
                type: 'ajax',
                url: 'http://localhost:50701/api/categories/',
            },
            autoLoad: true,
            sorters: [{
                property: 'categoryName'
            }]
        })
    }

    render() {
        return (
            <FormPanel shadow>
                <FieldSet title="Create new answer" width={300}>
                    <TextField label="Answer content" labelAlign="placeholder" />
                    <br/>
                    <Button ui="round raised" text="Create"/>
                    <Button ui="round raised" text="Cancel"/>
                </FieldSet>
            </FormPanel>
        );
    }
}