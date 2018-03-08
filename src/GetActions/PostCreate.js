import React, { Component } from 'react';

import {
    Grid, Column, Button, RendererCell, SparkLineLine,
    TitleBar, Menu, MenuItem, SelectField, FormPanel,
    FieldSet, TextField, Field
} from '@extjs/ext-react';

export default class CreatePost extends Component {
    constructor(props) {
        super(props);  
        var handlePostTitleChange = this.handlePostTitleChange.bind(this);
        var handlePostQuestionChange = this.handlePostQuestionChange.bind(this);
        var onCreate = this.onCreate.bind(this);
        var onCancel = this.onCancel.bind(this);
        this.state={postTitle: "", postQuestion:""}        
    }

    render() {        

        var handlePostTitleChange = this.handlePostTitleChange;
        var handlePostQuestionChange = this.handlePostQuestionChange;
        var onCreate = this.onCreate;
        var onCancel = this.onCancel;


        return (
            
            <FormPanel shadow docked='bottom' layout='fit' >
                <FieldSet style={{background:'lightgrey', color:'white'}} width={300}>
                    <TextField 
                        label="Post title"  
                        name='postTitle'
                        value={this.state.postTitle}
                        onChange={this.handlePostTitleChange.bind(this)} 
                        labelAlign="placeholder" 
                        style={{width:'70%', color:'white'}}
                    /> 
                    <TextField 
                        label="Post question" 
                        name='postQuestion'
                        value={this.state.postQuestion}
                        onChange={this.handlePostQuestionChange.bind(this)} 
                        labelAlign="placeholder" 
                        style={{width:'70%',color:'white'}}
                    />
             
                    <Button 
                        label="Create" 
                        value={this.state}
                        handler={this.onCreate.bind(this)} 
                        text="Create" 
                        style={{ background:'white', color:'#025f85'}}
                        ui="round raised" 
                    />
                    <Button 
                        label="Cancel" 
                        value={this.state} 
                        handler={this.onCancel.bind(this)} 
                        text="Cancel" 
                        ui="round raised"
                        style={{ background:'white', color:'#025f85'}}
                    />
                  
                    
                </FieldSet>
                
            </FormPanel>
            
        );
    }

    handlePostTitleChange(e){  
        this.setState({
            postTitle: e._value
        })
    }

    handlePostQuestionChange(e){
        this.setState({
            postQuestion: e._value
        })
    }

    onCreate(e){

        var categoryId = this.props.categoryId;
        
        if(this.state.postTitle == ""){
            console.log('Mangler tittel')
        }
        if(this.state.postQuestion == ""){
            console.log('mangler spørsmål')
        }

        if(this.state.postTitle && this.state.postQuestion != ""){ 
           
            
            // Ext.define('Post', {
            //     extend: 'Ext.data.Model',
            //     fields:['postTitle', 'postContent'],

            //     proxy: {
            //         type: 'ajax',
            //         url:'http://localhost:50701/api/categories/' + categoryId + '/posts/',
            //     }
            // })

            // var post = Ext.create('Post', {postTitle: this.state.postTitle, postContent: this.state.postQuestion});

            // props.save({
            //     success: function() {
            //         console.log('created: ' + post.data.postTitle)
            //     }
            // });
        }
    }


        
    
  

    onCancel(e){
        this.setState({
            postTitle: "",
            postQuestion: ""
        })
    }



    // handleChange = (e) => {
    //     let name = e.target.name
    //     let state = {}
    //     state[name] = e.target.value
    //     this.setState(state)
    // };




    

}
