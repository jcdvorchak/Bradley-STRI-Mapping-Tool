<?php 
  $con = new mysqli("localhost", "s_jdvorchak", "AELe8YQb", "s_jdvorchak");
 
  if($con->connect_errno > 0){
    die('Unable to connect to database [' . $con->connect_error . ']');
  }

  // when does the connect end?
?>