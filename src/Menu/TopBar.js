import React, { Component } from 'react';
import { TabPanel, SearchField, TitleBar, Container, Button, Menu, MenuItem } from '@extjs/ext-react';
import Category from '../GetActions/Categories';

export default class HeaderBar extends Component {

    render() {
        return (
                <TitleBar title="Forum" docked="top"
                    platformConfig={{
                        phone: {
                            titleAlign: 'center'
                        }
                    }}
                >
                    <Button align="left"  arrow={false}>
                        {Ext.os.is.Phone && (
                            <Menu>
                                <MenuItem text="Profile" iconCls="x-fa fa-user"/>
                            </Menu>
                        )}
                    </Button>

                    {!Ext.os.is.Phone && (
                        <Button align="right" iconCls="x-fa fa-user" text="Profile"/>
                    )}
                    {!Ext.os.is.Phone && (
                        <SearchField align="right" ui="alt" placeholder="Search" margin="0 10"/>
                    )}

                    <Button align="right" iconCls="x-fa fa-ellipsis-v" arrow={false}>
                        <Menu>
                            <MenuItem text="Settings" iconCls="x-fa fa-cog"/>
                            <MenuItem text="Help" iconCls="x-fa fa-question-circle"/>
                        </Menu>
                    </Button>
                    {Ext.os.is.Phone && (
                    <SearchField ui="faded" placeholder="Search" margin="20"/>
                    )}
                </TitleBar>   
        )
    }

}