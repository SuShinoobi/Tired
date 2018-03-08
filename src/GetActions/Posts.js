import React, { Component } from 'react';
import Answer from './Answers';
//import PostModel from '../model/PostModel';
import {
    Grid, Column, Button, RendererCell, SparkLineLine,
    TitleBar, Menu, MenuItem, SelectField,
    FormPanel, FieldSet, TextField, GridCell
} from '@extjs/ext-react';


Ext.require(['Ext.grid.plugin.RowExpander'])

export default class Post extends Component {
    constructor(props) {
        super(props);
        this.postStore = this._createStore(props.categoryId)
        var handlePostTitleChange = this.handlePostTitleChange.bind(this);
        var handlePostContentChange = this.handlePostContentChange.bind(this);
        var onEdit = this.onEdit.bind(this);
        var onCreate = this.onCreate.bind(this);
        var onCancel = this.onCancel.bind(this);
        this.state = { postTitle: "", postContent: "", record:{}}
    }

    _createStore(categoryId) {
        
        return new Ext.data.Store({
            proxy: {
                headers: { 'Content-Type': "application/json" },
                actionMethods: {
                    create: 'POST',
                    destroy: 'DELETE',
                    read: 'GET',
                    update: 'PUT',
                },
                type: 'ajax',
                url: 'http://localhost:50701/api/categories/' + categoryId + '/posts/',

            },
            
            fields:[
                {name: 'id', mapping: 'postId', type: 'int'  , persist:false},
                {name:'categoryId', type: 'int'},  
                {name: 'postTitle'},     
                {name: 'postContent'},
                {name: 'createdBy'},
                {name:'createdOn', type: 'date', dateFormat:'c' },  
                {name: 'updatedOn'},
                {name: 'votes'},
            ],
            
            autoLoad: true,
            autoSync: true,
            sorters: [{
                property: 'votes',
                property: 'createdOn',
                property: 'createdBy',
            }],

        });
    }

    tpl = data => (
        <div>  
            <div>{data.postContent}</div>
            <div style={{marginTop:'1em'}}>{data.desc}</div>   
        </div>
    );

    componentWillReceiveProps(nextProps) {
        if (this.props.categoryId !== nextProps.categoryId) {
            this.setState({
                postTitle: "",
                postContent: ""
            });
            this.postStore = this._createStore(nextProps.categoryId);
        }
    }

    render() {
        var postHandler = this.props.postHandler;
        var handlePostTitleChange = this.handlePostTitleChange;
        var handlePostContentChange = this.handlePostContentChange;
        var onCreate = this.onCreate;
        var onCancel = this.onCancel;
        var onEdit = this.onEdit;

        return (
            
            <Grid 
                store={this.postStore}
                plugins={{rowexpander: true}}
                itemConfig={{body: {
                        tpl: this.tpl
                    }
                }}
            >
                {/* <TitleBar title="Posts" docked="top" >
                </TitleBar> */}
                <Column dataIndex="postTitle" text="Post Title" width={200} renderer={this.valueRenderer} />
                <Column dataIndex="votes" text="Votes" width={80} />
                <Column dataIndex="createdBy" text="Created By" width={100} />
                {/* <Column dataIndex="postContent" text="Post Content" width={100} /> */}
                <Column dataIndex="createdOn" text="Created On" formatter="date('m/d/Y')" width={120} />
                <Column dataIndex="createdOn" text="Edit" width={120} renderer={this.editRenderer} />
                <Column dataIndex="createdOn" text="Delete" width={120} renderer={this.deleteRenderer} />
                
                {/* <CreatePost store={this.postStore}/>     */}
                
                <FormPanel ref={form => this.form = form} shadow docked='bottom' layout='fit' record={this.state.record} >
                    <FieldSet style={{ background: 'lightgrey', color: 'white' }} width={300}>
                        <TextField
                            label="Post title"
                            name='postTitle'
                            value={this.state.postTitle}
                            onChange={this.handlePostTitleChange.bind(this)}
                            labelAlign="placeholder"
                            style={{ width: '70%', color: 'white' }}
                        />
                        <TextField
                            label="Post question"
                            name='postContent'
                            value={this.state.postContent}
                            onChange={this.handlePostContentChange.bind(this)}
                            labelAlign="placeholder"
                            style={{ width: '70%', color: 'white' }}
                        />
                        <Button
                            label="SaveChanges"
                            value={this.state}
                            handler={this.onEdit.bind(this)}
                            text="Save changes"
                            style={{ background: 'white', color: '#025f85' }}
                            ui="round raised"
                        />
                        <Button
                            label="Create"
                            value={this.state}
                            handler={this.onCreate.bind(this)}
                            text="Create"
                            style={{ background: 'white', color: '#025f85' }}
                            ui="round raised"
                        />
                        <Button 
                            label="Cancel"
                            value={this.state}
                            handler={this.onCancel.bind(this)}
                            text="Cancel"
                            ui="round raised"
                            style={{ background: 'white', color: '#025f85' }}
                        />
                    </FieldSet>
                </FormPanel>
                
            </Grid>
        );
    };

    deleteRenderer = (value, record) => (
        <Button text='Delete' handler={() => this.deletePost(record)} />
    );
    
    editRenderer = (value, record) => (
        <Button text='Edit' handler={() => this.editPost(record)} />
    );

    valueRenderer = (value, record) => (
        <Button text={value} handler={() => this.selectPost(record.data.postId)}/>
    );

    selectPost(postSelect) {
        this.props.postHandler(postSelect);
        this.setState({
            postTitle: "",
            postContent: ""
        })
    };

    editPost(record) {
        this.postStore.proxy.url = 'http://localhost:50701/api/categories/' + record.data.categoryId + '/posts/' + record.data.postId;
        this.setState({
            record: record,
            postTitle: record.data.postTitle,
            postContent: record.data.postContent
        })   
    };

    onEdit(e){   
        var record = this.form.getRecord();
        var postStore = this.postStore;
        var textFields = this;
        var state = this.state;
     
        if (state.postTitle == "") {
            console.log('The post must have a title')
        }
        if (state.postContent == "") {
            console.log('The post must have content')
        }
        if (state.postTitle && state.postContent != "") {
            record.data.postTitle = state.postTitle;
            record.data.postContent = state.postContent;  
            return new Promise(function(resolve, reject){            
                var frustrert = record.save(record.data);
                frustrert.id = record.data.postId;
                
                debugger
                postStore.update(record.data,{
                    callback: function(success){
                        console.log('mjau');
                        if (success){
                            postStore.reload();
                            textFields.setState({
                                postTitle: "",
                                postContent: ""
                            })
                        }
                        else {
                            console.log('voff');
                            reject("Failed to reload store");
                        }
                    }
                })
            })
        }
               
    }

    deletePost(record) {
        this.postStore.proxy.url = 'http://localhost:50701/api/categories/' + record.data.categoryId + '/posts/' + record.data.postId,
        this.postStore.remove(record);
    };

    handlePostTitleChange(e) {
        this.setState({
            postTitle: e._value
        })
    }

    handlePostContentChange(e) {
        this.setState({
            postContent: e._value
        })
    }

    onCreate(e) {
        var textFields = this;
        var state = this.state;
        var postStore = this.postStore;
        var record = this.record;
        if (state.postTitle == "") {
            console.log('The post must have a title')
        }
        if (state.postContent == "") {
            console.log('the post must have content')
        }

        if (state.postTitle && state.postContent != "") {
            record = {postTitle: state.postTitle, postContent: state.postContent};           
            console.log(record)
            return new Promise(function(resolve, reject){
                postStore.create(record,{
                    callback: function(success){
                        if (success){
                            postStore.reload();
                            textFields.setState({
                                postTitle: "",
                                postContent: ""
                            })
                        }
                        else {
                            reject("Failed to reload store");
                        }
                    }
                })
            })
        }        
    }

    onCancel(e) {
        this.setState({
            postTitle: "",
            postContent: ""
        })
    }
}