


      <!-- Page Content -->
      <div class="off-canvas-content maincontent" data-off-canvas-content>
        <div class="page-head with-bg">
          <button type="button" class="button secondary hide-for-large" data-toggle="offCanvas"><i class="fa fa-fw fa-bars"></i></button>
          <h3>Deploy phone</h3>
          <p>Start configuring your phones</p>
        </div>

        <div class="page-inner">

        <div class="row">
        <div class="medium-7 columns">
        <p>NOTICE: you must upgrade the firmware before deploying, to do this add the firmware in firmware page and then ensure the phone is getting DHCP option 150 pointing to this server and do a factory reset.</p>
        <form method="POST">
        <label>Phone driver
            <select name="phonedriver" required>
              {drivers}
            </select>
        </label>
        <label>Phone label
          <input type="text" maxlength=15 name="phonelabel" required>
        </label>
        <label>Phone MAC Address
          <input type="text" maxlength=12 pattern="^([0-9A-Fa-f]{2}){5}([0-9A-Fa-f]{2})$" title="MAC Address with no spaces or colons" placeholder="001422012345" name="phonemac" required>
        </label>
        <label>SIP server (must be local, hosted servers wont work)
          <input type="text" maxlength=30 placeholder="10.0.16.2" name="phonesipsrv" required>
        </label>
        <label>SIP ID/Extension
          <input type="text" maxlength=5 placeholder="1022" name="phonesipid" required>
        </label>
        <label>SIP Pass
          <input type="text" maxlength=8 placeholder="abc123!*" name="phonesippass" required>
        </label>
        

<input type="submit" class="button success" value="Add" />
        </form>
        </div>
        </div>


      </div>
      <!-- End Page Content -->
    </div>
  </div>
  </div>