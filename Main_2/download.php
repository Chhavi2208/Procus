<?php
header("Access-Control-Allow-Origin: http://localhost:4000");
function GetData($Url)
{
    $CurlHandle = curl_init();
    curl_setopt($CurlHandle, CURLOPT_URL, $Url);
    curl_setopt($CurlHandle, CURLOPT_RETURNTRANSFER, 1);
    curl_setopt($CurlHandle, CURLOPT_CONNECTTIMEOUT, 10);
    $Data = curl_exec($CurlHandle);
    curl_close($CurlHandle);
    return $Data;
}

if (isset($_POST['links']) && isset($_POST['project'])) {
    $Links = $_POST['links'];
    $ZipName = $_POST['project'] . '.zip';
    $Archive = new ZipArchive();
    if ($Archive->open($ZipName, ZipArchive::CREATE) === true) {
        foreach ($Links as $Link) {
            $Archive->addFromString(basename($Link), GetData($Link));
        }
        $Archive->close();
        echo $ZipName;
    } else {
        echo 'error';
    }
}
?>
