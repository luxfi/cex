import React from 'react'
// import Page from '../components/Page'
// import ESXLogo from '../assets/images/u1.png'
import u12 from '../assets/images/home/u12.png'
import u9 from '../assets/images/home/image_home_u9.jpg'

import Head from 'next/head';

export default class Counter extends React.Component {
  render() {
    return (
      // <div>
      //   <Page title="Index Page" linkTo="/other" />
      //   <img src={ESXLogo} alt="ESX LOOG" width='300' />
      // </div>
      <div>
        <Head>
          <link href="resources/css/axure_rp_page.css" type="text/css" rel="stylesheet" />
          <link href="data/styles.css" type="text/css" rel="stylesheet" />
          <link href="files/home/styles.css" type="text/css" rel="stylesheet" />
        </Head>
        <div id="base">
          {/* background (Dynamic Panel) */}
          <div id="u8" className="ax_default" data-label="background">
            <div id="u8_state0" className="panel_state" data-label="background_img">
              <div id="u8_state0_content" className="panel_state_content">
                {/* image_home (Image) */}
                <div id="u9" className="ax_default image" data-label="image_home">
                  <img
                    id="u9_img"
                    className="img "
                    src={u9}
                  />
                  {/* Unnamed () */}
                  <div
                    id="u10"
                    className="text"
                    style={{ display: "none", visibility: "hidden" }}
                  >
                    <p>
                      <span />
                    </p>
                  </div>
                </div>
                {/* info_portfolio (Dynamic Panel) */}
                <div id="u11" className="ax_default" data-label="info_portfolio">
                  <div id="u11_state0" className="panel_state" data-label="State1">
                    <div id="u11_state0_content" className="panel_state_content">
                      {/* Unnamed (Rectangle) */}
                      <div id="u12" className="ax_default box_1">
                        <img id="u12_img" className="img " src={u12} />
                        {/* Unnamed () */}
                        <div
                          id="u13"
                          className="text"
                          style={{ visibility: "visible" }}
                        >
                          <p>
                            <span>See your portfolio of stocks, balances, etc.</span>
                          </p>
                        </div>
                      </div>
                      {/* Unnamed (Triangle) */}
                      <div id="u14" className="ax_default flow_shape">
                        <img id="u14_img" className="img " src="images/home/u14.png" />
                        {/* Unnamed () */}
                        <div
                          id="u15"
                          className="text"
                          style={{ display: "none", visibility: "hidden" }}
                        >
                          <p>
                            <span />
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                {/* nav_btn_port (Dynamic Panel) */}
                <div id="u16" className="ax_default" data-label="nav_btn_port">
                  <div id="u16_state0" className="panel_state" data-label="State1">
                    <div id="u16_state0_content" className="panel_state_content">
                      {/* Unnamed (Rectangle) */}
                      <div id="u17" className="ax_default box_1">
                        <img id="u17_img" className="img " src="images/home/u17.png" />
                        {/* Unnamed () */}
                        <div
                          id="u18"
                          className="text"
                          style={{ display: "none", visibility: "hidden" }}
                        >
                          <p>
                            <span />
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                {/* nav_btn_trade (Dynamic Panel) */}
                <div id="u19" className="ax_default" data-label="nav_btn_trade">
                  <div id="u19_state0" className="panel_state" data-label="State1">
                    <div id="u19_state0_content" className="panel_state_content">
                      {/* Unnamed (Rectangle) */}
                      <div id="u20" className="ax_default box_1">
                        <img id="u20_img" className="img " src="images/home/u17.png" />
                        {/* Unnamed () */}
                        <div
                          id="u21"
                          className="text"
                          style={{ display: "none", visibility: "hidden" }}
                        >
                          <p>
                            <span />
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                {/* info_trade (Dynamic Panel) */}
                <div id="u22" className="ax_default" data-label="info_trade">
                  <div id="u22_state0" className="panel_state" data-label="State1">
                    <div id="u22_state0_content" className="panel_state_content">
                      {/* Unnamed (Rectangle) */}
                      <div id="u23" className="ax_default box_1">
                        <img id="u23_img" className="img " src="images/home/u12.png" />
                        {/* Unnamed () */}
                        <div
                          id="u24"
                          className="text"
                          style={{ visibility: "visible" }}
                        >
                          <p>
                            <span>
                              Learn about upcoming IPOs and movie stocks available on
                              ESX
                    </span>
                          </p>
                        </div>
                      </div>
                      {/* Unnamed (Triangle) */}
                      <div id="u25" className="ax_default flow_shape">
                        <img id="u25_img" className="img " src="images/home/u14.png" />
                        {/* Unnamed () */}
                        <div
                          id="u26"
                          className="text"
                          style={{ display: "none", visibility: "hidden" }}
                        >
                          <p>
                            <span />
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                {/* nav_btn_research (Dynamic Panel) */}
                <div id="u27" className="ax_default" data-label="nav_btn_research">
                  <div id="u27_state0" className="panel_state" data-label="State1">
                    <div id="u27_state0_content" className="panel_state_content">
                      {/* Unnamed (Rectangle) */}
                      <div id="u28" className="ax_default box_1">
                        <img id="u28_img" className="img " src="images/home/u17.png" />
                        {/* Unnamed () */}
                        <div
                          id="u29"
                          className="text"
                          style={{ display: "none", visibility: "hidden" }}
                        >
                          <p>
                            <span />
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                {/* info_research (Dynamic Panel) */}
                <div id="u30" className="ax_default" data-label="info_research">
                  <div id="u30_state0" className="panel_state" data-label="State1">
                    <div id="u30_state0_content" className="panel_state_content">
                      {/* Unnamed (Rectangle) */}
                      <div id="u31" className="ax_default box_1">
                        <img id="u31_img" className="img " src="images/home/u12.png" />
                        {/* Unnamed () */}
                        <div
                          id="u32"
                          className="text"
                          style={{ visibility: "visible" }}
                        >
                          <p>
                            <span>Read market research on movie </span>
                          </p>
                          <p>
                            <span>and entertainment stocks</span>
                          </p>
                        </div>
                      </div>
                      {/* Unnamed (Triangle) */}
                      <div id="u33" className="ax_default flow_shape">
                        <img id="u33_img" className="img " src="images/home/u14.png" />
                        {/* Unnamed () */}
                        <div
                          id="u34"
                          className="text"
                          style={{ display: "none", visibility: "hidden" }}
                        >
                          <p>
                            <span />
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                {/* nav_btn_news (Dynamic Panel) */}
                <div id="u35" className="ax_default" data-label="nav_btn_news">
                  <div id="u35_state0" className="panel_state" data-label="State1">
                    <div id="u35_state0_content" className="panel_state_content">
                      {/* Unnamed (Rectangle) */}
                      <div id="u36" className="ax_default box_1">
                        <img id="u36_img" className="img " src="images/home/u17.png" />
                        {/* Unnamed () */}
                        <div
                          id="u37"
                          className="text"
                          style={{ display: "none", visibility: "hidden" }}
                        >
                          <p>
                            <span />
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                {/* info_news (Dynamic Panel) */}
                <div id="u38" className="ax_default" data-label="info_news">
                  <div id="u38_state0" className="panel_state" data-label="State1">
                    <div id="u38_state0_content" className="panel_state_content">
                      {/* Unnamed (Rectangle) */}
                      <div id="u39" className="ax_default box_1">
                        <img id="u39_img" className="img " src="images/home/u12.png" />
                        {/* Unnamed () */}
                        <div
                          id="u40"
                          className="text"
                          style={{ visibility: "visible" }}
                        >
                          <p>
                            <span>Check out the latest industry </span>
                          </p>
                          <p>
                            <span>news and events</span>
                          </p>
                        </div>
                      </div>
                      {/* Unnamed (Triangle) */}
                      <div id="u41" className="ax_default flow_shape">
                        <img id="u41_img" className="img " src="images/home/u14.png" />
                        {/* Unnamed () */}
                        <div
                          id="u42"
                          className="text"
                          style={{ display: "none", visibility: "hidden" }}
                        >
                          <p>
                            <span />
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                {/* Unnamed (Rectangle) */}
                <div id="u43" className="ax_default primary_button">
                  <div id="u43_div" />
                  {/* Unnamed () */}
                  <div id="u44" className="text" style={{ visibility: "visible" }}>
                    <p>
                      <span>Start Trading Now</span>
                    </p>
                  </div>
                </div>
                {/* Unnamed (Rectangle) */}
                <div id="u45" className="ax_default primary_button">
                  <div id="u45_div" />
                  {/* Unnamed () */}
                  <div id="u46" className="text" style={{ visibility: "visible" }}>
                    <p>
                      <span>Sart Trading Now</span>
                    </p>
                  </div>
                </div>
                {/* Unnamed (Rectangle) */}
                <div id="u47" className="ax_default primary_button">
                  <div id="u47_div" />
                  {/* Unnamed () */}
                  <div id="u48" className="text" style={{ visibility: "visible" }}>
                    <p>
                      <span>Start Trading Now</span>
                    </p>
                  </div>
                </div>
                {/* Unnamed (Rectangle) */}
                <div id="u49" className="ax_default primary_button">
                  <div id="u49_div" />
                  {/* Unnamed () */}
                  <div id="u50" className="text" style={{ visibility: "visible" }}>
                    <p>
                      <span>Start Trading Now</span>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>


        <style jsx>{`
          body {
            margin:0px;
            background-color:rgba(102, 102, 102, 1);
            background-image:none;
            position:static;
            left:auto;
            width:1420px;
            margin-left:0;
            margin-right:0;
            text-align:left;
          }
          #base {
            position:absolute;
            z-index:0;
          }
          #u8 {
            position:absolute;
            left:0px;
            top:0px;
            width:1420px;
            height:3578px;
            overflow:hidden;
          }
          #u8_state0 {
            position:absolute;
            left:0px;
            top:0px;
            width:1420px;
            height:3578px;
            -ms-overflow-x:hidden;
            overflow-x:hidden;
            -ms-overflow-y:hidden;
            overflow-y:hidden;
            background-image:none;
          }
          #u8_state0_content {
            position:absolute;
            left:0px;
            top:0px;
            width:1px;
            height:1px;
          }
          #u9_img {
            position:absolute;
            left:0px;
            top:0px;
            width:1420px;
            height:3578px;
          }
          #u9 {
            position:absolute;
            left:0px;
            top:0px;
            width:1420px;
            height:3578px;
          }
          #u10 {
            position:absolute;
            left:2px;
            top:1781px;
            width:1416px;
            visibility:hidden;
            word-wrap:break-word;
          }
          #u11 {
            position:absolute;
            left:470px;
            top:100px;
          }
          #u11_state0 {
            position:relative;
            left:0px;
            top:0px;
            background-image:none;
          }
          #u11_state0_content {
            position:absolute;
            left:0px;
            top:0px;
            width:1px;
            height:1px;
          }
          #u12_img {
            position:absolute;
            left:0px;
            top:0px;
            width:270px;
            height:80px;
          }
          #u12 {
            position:absolute;
            left:0px;
            top:20px;
            width:270px;
            height:80px;
            font-size:16px;
            color:#FFFFFF;
          }
          #u13 {
            position:absolute;
            left:2px;
            top:22px;
            width:266px;
            word-wrap:break-word;
          }
          #u14_img {
            position:absolute;
            left:0px;
            top:0px;
            width:40px;
            height:24px;
          }
          #u14 {
            position:absolute;
            left:115px;
            top:0px;
            width:40px;
            height:24px;
          }
          #u15 {
            position:absolute;
            left:2px;
            top:4px;
            width:36px;
            visibility:hidden;
            word-wrap:break-word;
          }
          #u16 {
            position:absolute;
            left:560px;
            top:20px;
          }
          #u16_state0 {
            position:relative;
            left:0px;
            top:0px;
            background-image:none;
          }
          #u16_state0_content {
            position:absolute;
            left:0px;
            top:0px;
            width:1px;
            height:1px;
          }
          #u17_img {
            position:absolute;
            left:0px;
            top:0px;
            width:100px;
            height:80px;
          }
          #u17 {
            position:absolute;
            left:0px;
            top:0px;
            width:100px;
            height:80px;
          }
          #u18 {
            position:absolute;
            left:2px;
            top:32px;
            width:96px;
            visibility:hidden;
            word-wrap:break-word;
          }
          #u19 {
            position:absolute;
            left:670px;
            top:20px;
            width:50px;
            height:80px;
            overflow:hidden;
          }
          #u19_state0 {
            position:absolute;
            left:0px;
            top:0px;
            width:50px;
            height:80px;
            -ms-overflow-x:hidden;
            overflow-x:hidden;
            -ms-overflow-y:hidden;
            overflow-y:hidden;
            background-image:none;
          }
          #u19_state0_content {
            position:absolute;
            left:0px;
            top:0px;
            width:1px;
            height:1px;
          }
          #u20_img {
            position:absolute;
            left:0px;
            top:0px;
            width:100px;
            height:80px;
          }
          #u20 {
            position:absolute;
            left:0px;
            top:0px;
            width:100px;
            height:80px;
          }
          #u21 {
            position:absolute;
            left:2px;
            top:32px;
            width:96px;
            visibility:hidden;
            word-wrap:break-word;
          }
          #u22 {
            position:absolute;
            left:560px;
            top:100px;
          }
          #u22_state0 {
            position:relative;
            left:0px;
            top:0px;
            background-image:none;
          }
          #u22_state0_content {
            position:absolute;
            left:0px;
            top:0px;
            width:1px;
            height:1px;
          }
          #u23_img {
            position:absolute;
            left:0px;
            top:0px;
            width:270px;
            height:80px;
          }
          #u23 {
            position:absolute;
            left:0px;
            top:20px;
            width:270px;
            height:80px;
            font-size:16px;
            color:#FFFFFF;
          }
          #u24 {
            position:absolute;
            left:2px;
            top:22px;
            width:266px;
            word-wrap:break-word;
          }
          #u25_img {
            position:absolute;
            left:0px;
            top:0px;
            width:40px;
            height:24px;
          }
          #u25 {
            position:absolute;
            left:115px;
            top:0px;
            width:40px;
            height:24px;
          }
          #u26 {
            position:absolute;
            left:2px;
            top:4px;
            width:36px;
            visibility:hidden;
            word-wrap:break-word;
          }
          #u27 {
            position:absolute;
            left:730px;
            top:20px;
            width:70px;
            height:80px;
            overflow:hidden;
          }
          #u27_state0 {
            position:absolute;
            left:0px;
            top:0px;
            width:70px;
            height:80px;
            -ms-overflow-x:hidden;
            overflow-x:hidden;
            -ms-overflow-y:hidden;
            overflow-y:hidden;
            background-image:none;
          }
          #u27_state0_content {
            position:absolute;
            left:0px;
            top:0px;
            width:1px;
            height:1px;
          }
          #u28_img {
            position:absolute;
            left:0px;
            top:0px;
            width:100px;
            height:80px;
          }
          #u28 {
            position:absolute;
            left:0px;
            top:0px;
            width:100px;
            height:80px;
          }
          #u29 {
            position:absolute;
            left:2px;
            top:32px;
            width:96px;
            visibility:hidden;
            word-wrap:break-word;
          }
          #u30 {
            position:absolute;
            left:630px;
            top:100px;
          }
          #u30_state0 {
            position:relative;
            left:0px;
            top:0px;
            background-image:none;
          }
          #u30_state0_content {
            position:absolute;
            left:0px;
            top:0px;
            width:1px;
            height:1px;
          }
          #u31_img {
            position:absolute;
            left:0px;
            top:0px;
            width:270px;
            height:80px;
          }
          #u31 {
            position:absolute;
            left:0px;
            top:20px;
            width:270px;
            height:80px;
            font-size:16px;
            color:#FFFFFF;
          }
          #u32 {
            position:absolute;
            left:2px;
            top:22px;
            width:266px;
            word-wrap:break-word;
          }
          #u33_img {
            position:absolute;
            left:0px;
            top:0px;
            width:40px;
            height:24px;
          }
          #u33 {
            position:absolute;
            left:115px;
            top:0px;
            width:40px;
            height:24px;
          }
          #u34 {
            position:absolute;
            left:2px;
            top:4px;
            width:36px;
            visibility:hidden;
            word-wrap:break-word;
          }
          #u35 {
            position:absolute;
            left:810px;
            top:20px;
            width:100px;
            height:80px;
            overflow:hidden;
          }
          #u35_state0 {
            position:absolute;
            left:0px;
            top:0px;
            width:100px;
            height:80px;
            -ms-overflow-x:hidden;
            overflow-x:hidden;
            -ms-overflow-y:hidden;
            overflow-y:hidden;
            background-image:none;
          }
          #u35_state0_content {
            position:absolute;
            left:0px;
            top:0px;
            width:1px;
            height:1px;
          }
          #u36_img {
            position:absolute;
            left:0px;
            top:0px;
            width:100px;
            height:80px;
          }
          #u36 {
            position:absolute;
            left:0px;
            top:0px;
            width:100px;
            height:80px;
          }
          #u37 {
            position:absolute;
            left:2px;
            top:32px;
            width:96px;
            visibility:hidden;
            word-wrap:break-word;
          }
          #u38 {
            position:absolute;
            left:720px;
            top:100px;
          }
          #u38_state0 {
            position:relative;
            left:0px;
            top:0px;
            background-image:none;
          }
          #u38_state0_content {
            position:absolute;
            left:0px;
            top:0px;
            width:1px;
            height:1px;
          }
          #u39_img {
            position:absolute;
            left:0px;
            top:0px;
            width:270px;
            height:80px;
          }
          #u39 {
            position:absolute;
            left:0px;
            top:20px;
            width:270px;
            height:80px;
            font-size:16px;
            color:#FFFFFF;
          }
          #u40 {
            position:absolute;
            left:2px;
            top:22px;
            width:266px;
            word-wrap:break-word;
          }
          #u41_img {
            position:absolute;
            left:0px;
            top:0px;
            width:40px;
            height:24px;
          }
          #u41 {
            position:absolute;
            left:115px;
            top:0px;
            width:40px;
            height:24px;
          }
          #u42 {
            position:absolute;
            left:2px;
            top:4px;
            width:36px;
            visibility:hidden;
            word-wrap:break-word;
          }
          #u43_div {
            position:absolute;
            left:0px;
            top:0px;
            width:226px;
            height:54px;
            background:inherit;
            background-color:rgba(246, 147, 30, 1);
            border:none;
            border-radius:5px;
            -moz-box-shadow:none;
            -webkit-box-shadow:none;
            box-shadow:none;
            font-family:'Arial-BoldMT', 'Arial Bold', 'Arial';
            font-weight:700;
            font-style:normal;
            font-size:16px;
          }
          #u43 {
            position:absolute;
            left:597px;
            top:2466px;
            width:226px;
            height:54px;
            font-family:'Arial-BoldMT', 'Arial Bold', 'Arial';
            font-weight:700;
            font-style:normal;
            font-size:16px;
          }
          #u43_div.mouseOver {
            position:absolute;
            left:0px;
            top:0px;
            width:226px;
            height:54px;
            background:inherit;
            background-color:rgba(255, 102, 0, 1);
            border:none;
            border-radius:5px;
            -moz-box-shadow:0px 2px 5px rgba(0, 0, 0, 0.349019607843137);
            -webkit-box-shadow:0px 2px 5px rgba(0, 0, 0, 0.349019607843137);
            box-shadow:0px 2px 5px rgba(0, 0, 0, 0.349019607843137);
            font-family:'Arial-BoldMT', 'Arial Bold', 'Arial';
            font-weight:700;
            font-style:normal;
            font-size:16px;
          }
          #u43.mouseOver {
          }
          #u44 {
            position:absolute;
            left:2px;
            top:18px;
            width:222px;
            word-wrap:break-word;
          }
          #u45_div {
            position:absolute;
            left:0px;
            top:0px;
            width:226px;
            height:54px;
            background:inherit;
            background-color:rgba(246, 147, 30, 1);
            border:none;
            border-radius:5px;
            -moz-box-shadow:none;
            -webkit-box-shadow:none;
            box-shadow:none;
            font-family:'Arial-BoldMT', 'Arial Bold', 'Arial';
            font-weight:700;
            font-style:normal;
            font-size:16px;
          }
          #u45 {
            position:absolute;
            left:597px;
            top:2910px;
            width:226px;
            height:54px;
            font-family:'Arial-BoldMT', 'Arial Bold', 'Arial';
            font-weight:700;
            font-style:normal;
            font-size:16px;
          }
          #u45_div.mouseOver {
            position:absolute;
            left:0px;
            top:0px;
            width:226px;
            height:54px;
            background:inherit;
            background-color:rgba(255, 102, 0, 1);
            border:none;
            border-radius:5px;
            -moz-box-shadow:0px 2px 5px rgba(0, 0, 0, 0.349019607843137);
            -webkit-box-shadow:0px 2px 5px rgba(0, 0, 0, 0.349019607843137);
            box-shadow:0px 2px 5px rgba(0, 0, 0, 0.349019607843137);
            font-family:'Arial-BoldMT', 'Arial Bold', 'Arial';
            font-weight:700;
            font-style:normal;
            font-size:16px;
          }
          #u45.mouseOver {
          }
          #u46 {
            position:absolute;
            left:2px;
            top:18px;
            width:222px;
            word-wrap:break-word;
          }
          #u47_div {
            position:absolute;
            left:0px;
            top:0px;
            width:226px;
            height:54px;
            background:inherit;
            background-color:rgba(246, 147, 30, 1);
            border:none;
            border-radius:5px;
            -moz-box-shadow:none;
            -webkit-box-shadow:none;
            box-shadow:none;
            font-family:'Arial-BoldMT', 'Arial Bold', 'Arial';
            font-weight:700;
            font-style:normal;
            font-size:16px;
          }
          #u47 {
            position:absolute;
            left:597px;
            top:1776px;
            width:226px;
            height:54px;
            font-family:'Arial-BoldMT', 'Arial Bold', 'Arial';
            font-weight:700;
            font-style:normal;
            font-size:16px;
          }
          #u47_div.mouseOver {
            position:absolute;
            left:0px;
            top:0px;
            width:226px;
            height:54px;
            background:inherit;
            background-color:rgba(255, 102, 0, 1);
            border:none;
            border-radius:5px;
            -moz-box-shadow:0px 2px 5px rgba(0, 0, 0, 0.349019607843137);
            -webkit-box-shadow:0px 2px 5px rgba(0, 0, 0, 0.349019607843137);
            box-shadow:0px 2px 5px rgba(0, 0, 0, 0.349019607843137);
            font-family:'Arial-BoldMT', 'Arial Bold', 'Arial';
            font-weight:700;
            font-style:normal;
            font-size:16px;
          }
          #u47.mouseOver {
          }
          #u48 {
            position:absolute;
            left:2px;
            top:18px;
            width:222px;
            word-wrap:break-word;
          }
          #u49_div {
            position:absolute;
            left:0px;
            top:0px;
            width:226px;
            height:54px;
            background:inherit;
            background-color:rgba(246, 147, 30, 1);
            border:none;
            border-radius:5px;
            -moz-box-shadow:none;
            -webkit-box-shadow:none;
            box-shadow:none;
            font-family:'Arial-BoldMT', 'Arial Bold', 'Arial';
            font-weight:700;
            font-style:normal;
            font-size:16px;
          }
          #u49 {
            position:absolute;
            left:922px;
            top:544px;
            width:226px;
            height:54px;
            font-family:'Arial-BoldMT', 'Arial Bold', 'Arial';
            font-weight:700;
            font-style:normal;
            font-size:16px;
          }
          #u49_div.mouseOver {
            position:absolute;
            left:0px;
            top:0px;
            width:226px;
            height:54px;
            background:inherit;
            background-color:rgba(255, 102, 0, 1);
            border:none;
            border-radius:5px;
            -moz-box-shadow:0px 2px 5px rgba(0, 0, 0, 0.349019607843137);
            -webkit-box-shadow:0px 2px 5px rgba(0, 0, 0, 0.349019607843137);
            box-shadow:0px 2px 5px rgba(0, 0, 0, 0.349019607843137);
            font-family:'Arial-BoldMT', 'Arial Bold', 'Arial';
            font-weight:700;
            font-style:normal;
            font-size:16px;
          }
          #u49.mouseOver {
          }
          #u50 {
            position:absolute;
            left:2px;
            top:18px;
            width:222px;
            word-wrap:break-word;
          }

        `}</style>
      </div>

    )
  }
}
