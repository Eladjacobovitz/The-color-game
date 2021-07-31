const records = `

    
    <nav class="navbar navbar-inverse navbar-fixed-top">
      <div class="container">
        <div class="navbar-header">
          <button type="button" class="navbar-toggle collapsed" data-toggle="collapse" data-target="#bs-nav-demo" aria-expanded="false">
            <span class="sr-only">Toggle navigation</span>
            <span class="icon-bar"></span>
            <span class="icon-bar"></span>
            <span class="icon-bar"></span>
          </button>
        </div>
        <div class="collapse navbar-collapse" id="bs-nav-demo">
          <ul class="nav navbar-nav">
            <li ><a href="#" onclick="onNavigate('/'); return false;"><span class="glyphicon glyphicon-menu-right" aria-hidden="true"></span> Login</a></li>
            <li id="reg"><a href="#" onclick="onNavigate('/registration'); return false;"><span class="glyphicon glyphicon-menu-right" aria-hidden="true"></span> Registration</a></li>
            <li><a href="#" onclick="onNavigate('/records'); return false;"><span class="glyphicon glyphicon-menu-right" aria-hidden="true"></span> Records</a></li>
          </ul>
        </div>
      </div>
    </nav>
    
    
    
<div class="logo-container">
      <h1 class="Logos">Top players</h1>
      <p class="para">The RGB color game</p>
</div>

<div class="container">
<h4 id="red" class="Logos">Easy</h4> 
<h4 id="green" class="Logos">Hard</h4> 
<h4 id="blue" class="Logos">Very hard</h4> 
</div>

<div class="container">
<table id="table" class="container2">
  <thead>
    <tr>
      <th>
        <h1>pos.</h1>
      </th>
      <th>
        <h1>Player</h1>
      </th>
      <th>
        <h1>Seconds</h1>
      </th>
      <th>
        <h1>Clicks</h1>
      </th>
      <th>
        <h1>Date</h1>
      </th>
    </tr>
  </thead>
  <tbody></tbody>
</table>


<table id="table2" class="container2">
  <thead>
    <tr>
      <th>
        <h1>pos.</h1>
      </th>
      <th>
        <h1>Player</h1>
      </th>
      <th>
        <h1>Seconds</h1>
      </th>
      <th>
        <h1>Clicks</h1>
      </th>
      <th>
        <h1>Date</h1>
      </th>
    </tr>
  </thead>
  <tbody></tbody>
</table>


<table id="table3" class="container2">
  <thead>
    <tr>
      <th>
        <h1>pos.</h1> 
      </th>
      <th>
        <h1>Player</h1>
      </th>
      <th>
        <h1>Seconds</h1>
      </th>
      <th>
        <h1>Clicks</h1>
      </th>
      <th>
        <h1>Date</h1>
      </th>
    </tr>
  </thead>
  <tbody></tbody>
</table>
</div>



    
    
    <style>
    
@import url(https://fonts.googleapis.com/css?family=Open+Sans:300,400,700);
@import url('https://fonts.googleapis.com/css?family=Bangers|Cinzel:400,700,900|Lato:100,300,400,700,900|Lobster|Lora:400,700|Mansalva|Muli:200,300,400,600,700,800,900|Open+Sans:300,400,600,700,800|Oswald:200,300,400,500,600,700|Roboto:100,300,400,500,700,900&display=swap');
    
body{
  background-color: #ffffff;
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 2000 1500'%3E%3Cdefs%3E%3Crect stroke='%23ffffff' stroke-width='0.33' width='1' height='1' id='s'/%3E%3Cpattern id='a' width='3' height='3' patternUnits='userSpaceOnUse' patternTransform='scale(19.65) translate(-949.11 -711.83)'%3E%3Cuse fill='%23fafafa' href='%23s' y='2'/%3E%3Cuse fill='%23fafafa' href='%23s' x='1' y='2'/%3E%3Cuse fill='%23f5f5f5' href='%23s' x='2' y='2'/%3E%3Cuse fill='%23f5f5f5' href='%23s'/%3E%3Cuse fill='%23f0f0f0' href='%23s' x='2'/%3E%3Cuse fill='%23f0f0f0' href='%23s' x='1' y='1'/%3E%3C/pattern%3E%3Cpattern id='b' width='7' height='11' patternUnits='userSpaceOnUse' patternTransform='scale(19.65) translate(-949.11 -711.83)'%3E%3Cg fill='%23ebebeb'%3E%3Cuse href='%23s'/%3E%3Cuse href='%23s' y='5' /%3E%3Cuse href='%23s' x='1' y='10'/%3E%3Cuse href='%23s' x='2' y='1'/%3E%3Cuse href='%23s' x='2' y='4'/%3E%3Cuse href='%23s' x='3' y='8'/%3E%3Cuse href='%23s' x='4' y='3'/%3E%3Cuse href='%23s' x='4' y='7'/%3E%3Cuse href='%23s' x='5' y='2'/%3E%3Cuse href='%23s' x='5' y='6'/%3E%3Cuse href='%23s' x='6' y='9'/%3E%3C/g%3E%3C/pattern%3E%3Cpattern id='h' width='5' height='13' patternUnits='userSpaceOnUse' patternTransform='scale(19.65) translate(-949.11 -711.83)'%3E%3Cg fill='%23ebebeb'%3E%3Cuse href='%23s' y='5'/%3E%3Cuse href='%23s' y='8'/%3E%3Cuse href='%23s' x='1' y='1'/%3E%3Cuse href='%23s' x='1' y='9'/%3E%3Cuse href='%23s' x='1' y='12'/%3E%3Cuse href='%23s' x='2'/%3E%3Cuse href='%23s' x='2' y='4'/%3E%3Cuse href='%23s' x='3' y='2'/%3E%3Cuse href='%23s' x='3' y='6'/%3E%3Cuse href='%23s' x='3' y='11'/%3E%3Cuse href='%23s' x='4' y='3'/%3E%3Cuse href='%23s' x='4' y='7'/%3E%3Cuse href='%23s' x='4' y='10'/%3E%3C/g%3E%3C/pattern%3E%3Cpattern id='c' width='17' height='13' patternUnits='userSpaceOnUse' patternTransform='scale(19.65) translate(-949.11 -711.83)'%3E%3Cg fill='%23e5e5e5'%3E%3Cuse href='%23s' y='11'/%3E%3Cuse href='%23s' x='2' y='9'/%3E%3Cuse href='%23s' x='5' y='12'/%3E%3Cuse href='%23s' x='9' y='4'/%3E%3Cuse href='%23s' x='12' y='1'/%3E%3Cuse href='%23s' x='16' y='6'/%3E%3C/g%3E%3C/pattern%3E%3Cpattern id='d' width='19' height='17' patternUnits='userSpaceOnUse' patternTransform='scale(19.65) translate(-949.11 -711.83)'%3E%3Cg fill='%23ffffff'%3E%3Cuse href='%23s' y='9'/%3E%3Cuse href='%23s' x='16' y='5'/%3E%3Cuse href='%23s' x='14' y='2'/%3E%3Cuse href='%23s' x='11' y='11'/%3E%3Cuse href='%23s' x='6' y='14'/%3E%3C/g%3E%3Cg fill='%23e0e0e0'%3E%3Cuse href='%23s' x='3' y='13'/%3E%3Cuse href='%23s' x='9' y='7'/%3E%3Cuse href='%23s' x='13' y='10'/%3E%3Cuse href='%23s' x='15' y='4'/%3E%3Cuse href='%23s' x='18' y='1'/%3E%3C/g%3E%3C/pattern%3E%3Cpattern id='e' width='47' height='53' patternUnits='userSpaceOnUse' patternTransform='scale(19.65) translate(-949.11 -711.83)'%3E%3Cg fill='%23F60'%3E%3Cuse href='%23s' x='2' y='5'/%3E%3Cuse href='%23s' x='16' y='38'/%3E%3Cuse href='%23s' x='46' y='42'/%3E%3Cuse href='%23s' x='29' y='20'/%3E%3C/g%3E%3C/pattern%3E%3Cpattern id='f' width='59' height='71' patternUnits='userSpaceOnUse' patternTransform='scale(19.65) translate(-949.11 -711.83)'%3E%3Cg fill='%23F60'%3E%3Cuse href='%23s' x='33' y='13'/%3E%3Cuse href='%23s' x='27' y='54'/%3E%3Cuse href='%23s' x='55' y='55'/%3E%3C/g%3E%3C/pattern%3E%3Cpattern id='g' width='139' height='97' patternUnits='userSpaceOnUse' patternTransform='scale(19.65) translate(-949.11 -711.83)'%3E%3Cg fill='%23F60'%3E%3Cuse href='%23s' x='11' y='8'/%3E%3Cuse href='%23s' x='51' y='13'/%3E%3Cuse href='%23s' x='17' y='73'/%3E%3Cuse href='%23s' x='99' y='57'/%3E%3C/g%3E%3C/pattern%3E%3C/defs%3E%3Crect fill='url(%23a)' width='100%25' height='100%25'/%3E%3Crect fill='url(%23b)' width='100%25' height='100%25'/%3E%3Crect fill='url(%23h)' width='100%25' height='100%25'/%3E%3Crect fill='url(%23c)' width='100%25' height='100%25'/%3E%3Crect fill='url(%23d)' width='100%25' height='100%25'/%3E%3Crect fill='url(%23e)' width='100%25' height='100%25'/%3E%3Crect fill='url(%23f)' width='100%25' height='100%25'/%3E%3Crect fill='url(%23g)' width='100%25' height='100%25'/%3E%3C/svg%3E");
  background-attachment: fixed;
  background-size: cover;
  
  font-family: 'Open Sans', sans-serif;
  font-weight: 300;
  line-height: 1.42em;
  color:#A7A1AE;
}

/*h1, p{*/
/*  margin:0px;*/
/*  padding:0px;*/
/*}*/

table {
    float:left;
    width:33%;
}


#red{
    color: red;
}

#green{
    color: darkseagreen;
}

#blue{
    color: #4a77d4;
}

@media only screen and (max-width:736px) {
  body{
      margin:0;
      padding:0;
  }
 
  .Logos{
    margin-top:20px;
  }
}

h1.Logos {
    margin-top: 100px;
    font-weight: 400;
    font-family: 'Bangers', cursive;
    font-size: 50px;
    text-align: center;
    letter-spacing: 3px;
    text-shadow: 2px 2px 0px #2d303a, -2px -2px 0px #2d303a, -2px 2px 0px #2d303a, 2px -2px 0px #2d303a;
    color: #fff;
}
p.para {
    text-align: center;
    font-size: 16px;
    margin-bottom: 10px;
    letter-spacing: 2px;
    font-family: 'Lora', serif;
    padding-top: 5px;
    color: #333333;
}

.container{
  display: flex;
  text-align:center;
}

h1 {
  font-size: 3em;
  font-weight: 300;
  line-height: 1em;
  text-align: center;
  color: #4dc3fa;
}

h2 {
  font-size: 1em;
  font-weight: 300;
  text-align: center;
  display: block;
  line-height: 1em;
  padding-bottom: 2em;
  color: #fb667a;
}

h2 a {
  font-weight: 700;
  text-transform: uppercase;
  color: #fb667a;
  text-decoration: none;
}

.blue {
  color: #185875;
}
.yellow {
  color: #fff842;
}

.container2 th h1 {
  font-weight: bold;
  font-size: 1em;
  text-align: left;
  color: #185875;
  margin-right: 40px;
 }
 
h4{
    font-weight: 400;
    font-family: 'Bangers', cursive;
    font-size: 30px;
    text-align: left;
    letter-spacing: 3px;
    text-shadow: 2px 2px 0px #2d303a, -2px -2px 0px #2d303a, -2px 2px 0px #2d303a, 2px -2px 0px #2d303a;
    color: #fff;
    margin-right: 33%;
 }

.container2 td {
  font-weight: normal;
  font-size: 1em;
  -webkit-box-shadow: 0 2px 2px -2px #0e1119;
  -moz-box-shadow: 0 2px 2px -2px #0e1119;
  box-shadow: 0 2px 2px -2px #0e1119;
}

.container2 {
  text-align: left;
  overflow: hidden;
  width: 33%;
  /*margin: 0 auto;*/
  display: table;
  /*padding: 0 0 8em 0;*/
  margin-top: 25px;
  margin-left: 2.5px;
  margin-right: 2.5px;
  
}

.container2 td, .container2 th {
  padding-bottom: 1.5%;
  padding-top: 1.5%;
  padding-left: 1.5%;
}

/* Background-color of the odd rows */
.container2 tr:nth-child(odd) {
  background-color: #323c50;
}

/* Background-color of the even rows */
.container2 tr:nth-child(even) {
  background-color: #2c3446;
}

.container2 th {
  background-color: #1f2739;
  
}

.container2 td:first-child {
  color: #fb667a;
}

.container2 tr:hover {
  background-color: #464a52;
  -webkit-box-shadow: 0 6px 6px -6px #0e1119;
  -moz-box-shadow: 0 6px 6px -6px #0e1119;
  box-shadow: 0 6px 6px -6px #0e1119;
}

.container2 td:hover {
  background-color: #fff842;
  color: #403e10;
  font-weight: bold;

  box-shadow: #7f7c21 -1px 1px, #7f7c21 -2px 2px, #7f7c21 -3px 3px,
    #7f7c21 -4px 4px, #7f7c21 -5px 5px, #7f7c21 -6px 6px;
  transform: translate3d(6px, -6px, 0);

  transition-delay: 0s;
  transition-duration: 0.4s;
  transition-property: all;
  transition-timing-function: line;
}

@media (max-width: 800px) {
  .container td:nth-child(4),
  .container th:nth-child(4) {
    display: none;
  }
}

</style>
    
    
    `