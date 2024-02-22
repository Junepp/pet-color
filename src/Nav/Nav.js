import React, { Component } from "react";
import "./Nav.css";

export default class Nav extends Component {
  render() {
    return (
      <div>
        <header>
          <nav className="Nav">
            <span className="Nav_title">ryanheart</span>
            <div className="Navi">
              <a className="Navs" href="src#intro">
                색상추출기
              </a>
              <a className="Navs" href="src#cc">
                픽셀아트변환
              </a>
              <div>
                  <div style={{ width: '1px', height: '100%', backgroundColor: 'white'}}></div>
              </div>
              <a className="Navs" href="src#wagle">
                temp
              </a>
              <a className="Navs" href="src#coming">
                github
              </a>
            </div>
          </nav>
        </header>
      </div>
    );
  }
}