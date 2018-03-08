import React, { Component } from 'react';
import Post from './Posts';
import { Grid, Column, Button, RendererCell, SparkLineLine, TitleBar, Menu, MenuItem, SelectField } from '@extjs/ext-react';

export default class Category extends Component {
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
        var categoryHandler = this.props.categoryHandler;
        return (
            <Grid shadow store={this.store} hideHeaders >
                <Column dataIndex="categoryName" text="Categories" width={150} renderer={this.valueRenderer} />
            </Grid>
        );
    }

    valueRenderer = (value, record) => (
        <Button text={value} handler={() => this.selectCategory(record.data.categoryId)} />
    );

    selectCategory(categorySelect) {
        this.props.categoryHandler(categorySelect);
    }
}
