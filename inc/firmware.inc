


      <!-- Page Content -->
      <div class="off-canvas-content maincontent" data-off-canvas-content>
        <div class="page-head with-bg">
          <button type="button" class="button secondary hide-for-large" data-toggle="offCanvas"><i class="fa fa-fw fa-bars"></i></button>
          <h3>Firmware</h3>
          <p>The first stage to getting your Cisco phone working with SIP</p>
        </div>

        <div class="page-inner">

        <div class="row">
          <a class="button success" href="/admin/firmware/new">Upload</a>
        </div>
        <div class="row">
        <p>Below is a list of firmware known by this server, note that this is blind as in it will not detect changes in TFTP folder and currently deleting firmware here does not delete it in TFTP folder either just makes it not possible to select when deploying phones.</p>
        <small>THIS SECTION REQUIRES SOME SERIOUS REWORK TO BE USEFUL LIKE AUTO LOAD FILE DETECTION AND ABILITY TO REMOVE THE UNZIPED FILES IN TFTP DIRECTORY, Get involved on GitHub</small>
        <hr>
        <ul>
        {firmwarelist}
        </ul>
        </div>


      </div>
      <!-- End Page Content -->
    </div>
  </div>
  </div>