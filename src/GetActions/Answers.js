import React, { Component } from 'react';
import {
    Grid, Column, Button, RendererCell, SparkLineLine,
    TitleBar, Menu, MenuItem, SelectField,
    FormPanel, FieldSet, TextField, GridCell
} from '@extjs/ext-react';

export default class Answer extends Component {
    constructor(props) {
        super(props);
        this.answerStore = this._createStore(props.categoryId, props.postId);
    }

    _createStore(categoryId, postId) {
        
        return new Ext.data.Store({
            proxy: {
                type: 'ajax',
                url: 'http://localhost:50701/api/categories/' + categoryId + '/posts/' + postId + '/answers',
            },
            autoLoad: true,
            sorters: [{
                property: 'votes',
                property: 'createdOn',
                property: 'createdBy'
            }],

        });
    }

    componentWillReceiveProps(nextProps) {
        if (this.props.categoryId !== nextProps.categoryId || this.props.postId !== nextProps.postId) {
            this.setState({
                postTitle: "",
                postQuestion: ""
            });
            this.answerStore = this._createStore(nextProps.categoryId, nextProps.postId);
        }
    }

    render() {
        var categoryId = this.props.categoryId;
        var postId = this.props.postId;        

        return (
            <Grid store={this.answerStore}>
                <Column dataIndex="answerContent" text="Answer Content" width={200} />
                <Column dataIndex="votes" text="Votes" width={80} />
                <Column dataIndex="createdBy" text="Created By" width={200} />
                <Column dataIndex="createdOn" text="Created On" formatter="date('m/d/Y')" width={200} />
                <Column  text="Edit/Delete" width={200}>
                    <GridCell/>
                </Column>
            </Grid>           
        );
    }
    createNewAnswer() {
        console.log('createNewAnswer');
        
    }

}