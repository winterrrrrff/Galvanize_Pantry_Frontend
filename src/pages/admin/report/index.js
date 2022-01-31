import React from "react";

import './report.css'

import CurrentInventoryReport from './currentInventoryReport/currentInventoryReport'
import StaleInventoryReport from './staleInventoryReport/staleInventoryReport'
import VoteReport from './VoteReport/VoteReport'
import PaymentReport from './PaymentReport/PaymentReport'
import * as api from "../../../api";

const { Component } = React;

class Tabs extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selected: this.props.selected// can be any of these ['dayjs()', '', null, new Date(2018,12,1)]
		};
		
  }

  setSelected(selected) {
    if (selected !== this.state.selected) {
      this.setState({ selected });
    }
  }

  handleClick(tab) {
    return () => this.setSelected(tab);
  }

  

  renderTabList(child) {
    let tab = 0;

    // copy tabs children and add new props to each child
    return React.cloneElement(child, {
      // The children of child(TabList & TabPanel)
      children: React.Children.map(child.props.children, (childTab) => {
        // check is the child is Tab
        if (childTab.type.name === "Tab") {
          // if we select the tab, make it active
          const _isActive = (tab === this.state.selected);
          const _onClick = this.handleClick(tab);
          tab++;
          // update Tab's props
          return React.cloneElement(childTab, { _isActive, _onClick })
        }
        return childTab
      }),
    })
  }

  renderChildren(children) {
    let panel = 0;

    // map each children of Tab
    return React.Children.map(children, (child) => {
      // if child is TabList render TabList
      if (child.type.name === "TabList") {
        return this.renderTabList(child)
      }
      // if child is TabPanel make panel selected and then active panel
      // use panel(index) to specify which panel that is active
      if (child.type.name === "TabPanel") {
        const _isActive = (panel === this.state.selected);
        panel++;
        return React.cloneElement(child, { _isActive })
      }
      return child
    })
  }

  render() {
    return (
        <div className="Tabs">
          { this.renderChildren(this.props.children) }
        </div>
    );
  }
}

// create element - TabList(props = children)
const TabList = ({ children }) => (
    <ul className="TabList">
      { children }
    </ul>
);

// create element - Tab(props = _onClick, _isActive, children)
const Tab = ({_onClick, _isActive, children,}) => (
    <li
        className={ `Tab  ${ _isActive ? "is-active" : "" }` }
        onClick={ _onClick }>
      { children }
    </li>
);

// create element - TabPanel(props = _isActive, children)
const TabPanel = ({_isActive, children,}) => (
    <div className={ `TabPanel  ${ _isActive ? "is-active" : "" }` }>
      { children }
    </div>
);





class report extends Component {

  // constructor(props) {
  //   super(props);
  //   this.state = {
  //     selected: this.props.selected,
  //     startDate: new Date() // can be any of these ['dayjs()', '', null, new Date(2018,12,1)]
	// 	};
	
  // }

  // handleChange(date) {
	// 	this.setState({
	// 		startDate: date,
	// 	});
  // }
  componentDidMount() {
  }
  
  render() {
    return (
        <div className="Main">
          <Tabs selected={ 0 }>
            <TabList>
              <Tab>
                <div className="Button">Snack Inventory Report</div>
              </Tab>
              <Tab>
                <div className="Button">Stale Inventory Report</div>
              </Tab>
              <Tab>
                <div className="Button">Snack Voting Report</div>
              </Tab>
              <Tab>
                <div className="Button">Employee Payment Report</div>
              </Tab>
            </TabList>

            <TabPanel>
            
            <CurrentInventoryReport>
             </CurrentInventoryReport>
            </TabPanel>

            <TabPanel>
            <StaleInventoryReport>
             </StaleInventoryReport>
            </TabPanel>

            <TabPanel>
            <VoteReport>
             </VoteReport>
            
            </TabPanel>
            
            <TabPanel>
            <PaymentReport>
             </PaymentReport>
            </TabPanel>
          </Tabs>
        </div>
    );
  }
}
export default report;
