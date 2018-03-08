import React, { Component } from 'react';

export default class PostModel extends Component {
    constructor(props) {
        super(props);
        this.postModel = this.createPostModel();
    }

    createPostModel(){
        Ext.define('Post', {
            extend: 'Ext.data.Model',
            fields: [
                {name: 'id', mapping: 'postId', type: 'int'  , persist:false},
                {name:'categoryId', type: 'int'},  
                {name: 'postTitle'},     
                {name: 'postContent'},
                {name: 'createdBy'},
                {name:'createdOn', type: 'date', dateFormat:'c' },  
                {name: 'updatedOn'},
                {name: 'votes'},
            ]
        });
    }
}
