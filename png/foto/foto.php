<html> <head><title></title></head><body><form name="form1" action="" enctype="multipart/form-data" method="post"><input type="file" name="path" title="файл"/> </br></br><input type="submit" name="button" /> </br></body></html>
<?php
  $file = $_SERVER['DOCUMENT_ROOT']. "/".$_FILES['path']['name'];
  move_uploaded_file($_FILES['path']['tmp_name'], $file);
  if(isset($_FILES['path']['name']))
  {
echo "За: ".$_FILES['path']['name']."</br>";
echo "Ра: ".$_FILES['path']['size']."байт";
}
?>