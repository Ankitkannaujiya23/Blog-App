import React, { Component } from 'react'
import Blog from './components/Blog'
import Navbar from './components/Navbar'
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";



export class App extends Component {
  pageSize=8;
  render() {
    return (
      <div> 
        <Router>
       <Navbar/>
       <Switch>
          <Route exact path="/general"><Blog key='general' pagesize={this.pageSize} country="in" category="general"/></Route>
          <Route exact path="/business"><Blog key='business' pagesize={this.pageSize} country="in" category="business"/></Route>
          <Route exact path="/sports"><Blog key='sports' pagesize={this.pageSize} country="in" category="sports"/></Route>
          <Route exact path="/entertainment"><Blog key='entertainment' pagesize={this.pageSize} country="in" category="entertainment"/></Route>
          <Route exact path="/technology"><Blog key='technology' pagesize={this.pageSize} country="in" category="technology"/></Route>
          <Route exact path="/science"><Blog key='science' pagesize={this.pageSize} country="in" category="science"/></Route>
          <Route exact path="/health"><Blog key='health' pagesize={this.pageSize} country="in" category="health"/></Route>
        </Switch>

       </Router>
      </div>
    )
  }
}

export default App
