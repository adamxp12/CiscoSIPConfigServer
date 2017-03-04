  <div class="row logincontainer">
      <div class="medium-5 large-6 columns ">
        <img src="img/logo.png"><hr>
        <h3 class="light">First time Setup</h3>
        <p class="light">Welcome to CiscoSIPConfigServer, please create an admin user before continuing.</p>
        <small>Powered by CiscoSiPConfigServer v{ver}</small>
      </div>
      <div class="medium-7 large-6 columns leftborder loginbox">
<form action="/signup" method="POST" data-abide novalidate>


            <label>Username
              <input type="text" require name="username" placeholder="Username" tabindex="1" autofocus>
            </label>
 
      <label>Password
        <input type="password" require id="pass" name="password" placeholder="Password" tabindex="3">
      </label>
      <label>Password Again
         <input type="password" data-equalto="pass" placeholder="Password" aria-describedby="passwordHelp" tabindex="4" required><span class="form-error"><small>You made a typo in one of your passwords as they don't match</small></span>
      </label>
      <button href="#" type="submit" class="button large black expanded" tabindex="5">Lets go!</button></form>

    </div>