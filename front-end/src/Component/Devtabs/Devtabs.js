import React, { Component } from 'react'
import './Devtabs.scss';

class DevTabs extends Component {
    
    constructor(props) {
        super(props)
        this.tabs = this.props.tabData;
    }  
    render() {
        
        return (
            <div className="dev-tabs-container">
                <ul className="tabs-wrapper">
                    { this.tabs.map( (tab, index)=> (
                            <li key={tab.name} className={ tab.isActive ? "tab active" : "tab" } 
                            onClick={ () => this.props.selectedTab(tab, index) }> 
                                {tab.name}
                            </li>
                        ) 
                     )}
                </ul>
            </div>
        );
    }

}

export default DevTabs;