


      <!-- Page Content -->
      <div class="off-canvas-content maincontent" data-off-canvas-content>
        <div class="page-head with-bg">
          <button type="button" class="button secondary hide-for-large" data-toggle="offCanvas"><i class="fa fa-fw fa-bars"></i></button>
          <h3>Firmware</h3>
          <p>The first stage to getting your Cisco phone working with SIP</p>
        </div>

        <div class="page-inner">

        <div class="row">
        <form method="POST" encType="multipart/form-data">
        <label>Phone model (Just the number so a Cisco 7941G would have a model of 7941)
            <input type="text" placeholder="7961" name="model">
        </label>
        <label>Load file (The name of the .loads file in the uploaded zip not including the .loads part so if your zip contains a SIP41.9-4-2SR3-1S.loads file then you would put SIP41.9-4-2SR3-1S)
            <input type="text" placeholder="SIP61.9-4-2SR3-1S" name="loadfile">
        </label>
        <label>Upload the ZIP file below</label>
        <label for="exampleFileUpload" class="button">Upload Firmware</label>
<input type="file" id="exampleFileUpload" name="file" class="show-for-sr">

<input type="submit" class="button success" text="Add">Add</input>
        </form>
        </div>


      </div>
      <!-- End Page Content -->
    </div>
  </div>
  </div>