


      <!-- Page Content -->
      <div class="off-canvas-content maincontent" data-off-canvas-content>
        <div class="page-head with-bg">
          <button type="button" class="button secondary hide-for-large" data-toggle="offCanvas"><i class="fa fa-fw fa-bars"></i></button>
          <h3>Phones</h3>
          <p>All the phones provisioned by this server</p>
        </div>

        <div class="page-inner">

        <div class="row">
          <a class="button success" href="/admin/phones/deploy">Deploy New</a>
        </div>
        <div class="row">
        <p>Below is a list of phones managed by this server.</p>
        <table>
        <tr>
            <th>Phone Name</th>
            <th>Extension</th>
            <th>Phone Model</th>
            <th>Phone MAC</th>
            <th>Manage</th>
        </tr>
        {phonelist}
        </table>
        </div>


      </div>
      <!-- End Page Content -->
    </div>
  </div>
  </div>