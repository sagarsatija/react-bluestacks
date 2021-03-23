import React, { Component } from 'react';
import Container from './Container/Container';
import axios from 'axios';
import './App.css';

class App extends Component {

  constructor(props) {
      super(props)   
      this.state = {
        tabs: [
            {
                name: 'Upcomming Compaigns',
                isActive: true
            },
            {
                name: 'Live Compaigns',
                isActive: false
            },
            {
                name: 'Past Compaigns',
                isActive: false
            }
        ],
        tableData: {
          header: [
              {
                  name: 'Date'
              },
              {
                  name: 'Campaign'
              },
              {
                  name: 'View'
              },
              {
                  name: 'Action'
              }
          ],
          data:null
      },
      currentDate: new Date().getTime()
    }
    this.activeIndex = 0;
  }

  componentDidMount() {
    console.log('componentDidMount Run');
    axios.get('https://node2905.herokuapp.com/api/campaignData').then((res)=>{
      let {tableData} = this.state;
      tableData.data = res.data;
      this.setState({
        tableData: tableData
      })
    })
  }

  tabHandlerClick = (selectedtab, index) => {
      const {tabs} = {...this.state}
      tabs.map((tab, i)=>{
          if(tabs[i].isActive) {
              tabs[i].isActive = false;
          }
          if(i === index) {
              tabs[i].isActive = true;
              this.activeIndex = i;
          }
      });
      console.log(tabs);
      this.setState({tabs: tabs});
  }

  findTheCampaignDay = (data)=> {
      // let time =(this.state.currentDate - data.createdOn) / (24 * 60 * 60 * 1000);
      let campaingTracker;
      let today = new Date();
      let campaignDate = new Date(data.createdOn);
      let todayMonth = today.getMonth()
      let campaignMonth = campaignDate.getMonth()
      let todayDate = today.getDate()
      let campaignday = campaignDate.getDate()
        if(todayMonth > campaignMonth) {
          campaingTracker = -1;
        }else  if(todayMonth === campaignMonth) {
          if(todayDate > campaignday) {
            campaingTracker = -1;
          } else if(todayDate === campaignday) {
            campaingTracker = 0;
          } else {
            campaingTracker = 1;
          }
        } else {
          campaingTracker = 1;
        }
        return campaingTracker;
  }

  getDataAccordingToCampaign = () => {
    let tempCampaignData = this.state.tableData.data.filter((data)=>{
      const campaignTracker = this.findTheCampaignDay(data);
      if( campaignTracker === 1  && this.state.tabs[this.activeIndex].name === 'Upcomming Compaigns') {
        return true;
      } else if(campaignTracker === 0  && this.state.tabs[this.activeIndex].name === 'Live Compaigns') {
        return true
      } else if(campaignTracker === -1  && this.state.tabs[this.activeIndex].name === 'Past Compaigns') {
        return true
      }
    })
    return {
      header: this.state.tableData.header,
      data: tempCampaignData
    }
  }

  campaignHandler = (event, id) => {
    console.log(event.target.value, "id", id); 
    let modifiedData = [...this.state.tableData.data];
    modifiedData[id - 1].createdOn = new Date(event.target.value).getTime();
    this.setState(modifiedData);
  }

  render() {

    return (
      <div>
        {this.state.tableData.data != null ?<Container tabData={this.state.tabs} 
        tableConfig={this.getDataAccordingToCampaign()} 
        tabClickEvent={this.tabHandlerClick}
        campaignHandler={this.campaignHandler}></Container>: "Sorry Wait for a moment....."}
      </div>
    );
  }
}

export default App;
