<?php 
  $con = new mysqli("localhost", "s_jdvorchak", "password", "s_jdvorchak");
 
  if($con->connect_errno > 0){
    die('Unable to connect to database [' . $con->connect_error . ']');
  }
?>