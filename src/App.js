import React, { Component } from 'react';
import HeaderBar from './Menu/TopBar';
import Category from './GetActions/Categories';
import Post from './GetActions/Posts';
import Answer from './GetActions/Answers';
import TopTabsPanel from './Menu/TopTabs';
//import CreatePost from './GetActions/PostCreate';
import { SearchField, TitleBar, Container, Button, Panel, Menu, MenuItem, TabPanel } from '@extjs/ext-react';

export default class App extends React.Component {
    constructor(props) {
        super(props);
        var categoryHandler = this.categoryHandler.bind(this);
        var postHandler = this.postHandler.bind(this);
        this.state = {
            selectCategory: 2,
            selectPost: 1
        };
    }

    categoryHandler(categoryId) {
        this.setState({
            selectCategory: categoryId
        });
    }

    postHandler(postId){
        this.setState({
            selectPost: postId
        });
    }

    render() {
        var categoryHandler = this.categoryHandler;
        var postHandler = this.postHandler;
        return (

            <Container layout='hbox'>
                <HeaderBar/>

                <Category categoryHandler={this.categoryHandler.bind(this)} />

                {/* <TopTabsPanel /> */}

                <Container layout="hbox" padding={10} width="70%">
                    <Panel layout="fit" flex={1} shadow>
                        <Post categoryId={this.state.selectCategory} postHandler={this.postHandler.bind(this)} />
                    </Panel>
                </Container>

                <Container layout="hbox" padding={10} width="18.3%" >
                    <Panel layout="fit" flex={1} shadow>
                        <Answer categoryId={this.state.selectCategory} postId={this.state.selectPost} />
                    </Panel>
                </Container> 

                {/* <CreatePost categoryId={this.state.selectCategory}/> */}

            </Container>
        )
    }

}