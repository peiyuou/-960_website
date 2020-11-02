<?php

//--------------------正面
$image = str_replace('data:image/png;base64,', '', $_POST["img"]); //將檔案格式的資訊拿掉
$image = str_replace(' ', '+', $image);
$data = base64_decode($image);

//準備好要存的filename

if (file_exists("../php/uploads") === false) {
  mkdir("../php/uploads");
}

$time = time();
$filename = "../php/uploads/{$time}.png";
$filenameSend = "./php/uploads/{$time}.png";
file_put_contents($filename, $data);
echo $filenameSend;
