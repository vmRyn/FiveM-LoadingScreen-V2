<!DOCTYPE html>
<html>
<head>
    <title>Image Upload</title>
	<link rel="stylesheet" href="style2.css">
</head>
<body>
<form action="upload.php" method="POST" enctype="multipart/form-data">
    <label for="imageUpload">Choose an Image:</label>
	<br>
    <input type="file" id="imageUpload" name="imageUpload" accept="image/*" required>
    <br>
	<br>
	<label for="uploadPassword">Enter Password:</label>
	<br>
    <input type="password" id="uploadPassword" name="uploadPassword" required>
	<br>
	<br>
    <input type="submit" value="Upload">
</form>
<br>

<?php
if (session_status() === PHP_SESSION_NONE) {
    echo "Sessions are not enabled on this server.";
    exit;
}
session_start(); // Start or resume the session

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $password = "BAZ2^kI7C782"; // Replace with your desired password
    $inputPassword = $_POST["uploadPassword"];

    // Check if the entered password matches the predefined password
    if ($inputPassword !== $password) {
        echo "Incorrect password. Image upload denied.";
    } else {
        $targetDir = "img/";
        $imageFileType = strtolower(pathinfo($_FILES["imageUpload"]["name"], PATHINFO_EXTENSION));
        $baseFileName = "Image";

        // Generate a new unique filename
        $counter = 1;
        $newFileName = $baseFileName . "." . $imageFileType;
        while (file_exists($targetDir . $newFileName)) {
            $counter++;
            $newFileName = $baseFileName . "_" . $counter . "." . $imageFileType;
        }

        $targetFile = $targetDir . $newFileName;
        $uploadOk = 1;

        // Check if image file is a valid image
        $check = getimagesize($_FILES["imageUpload"]["tmp_name"]);
        if ($check !== false) {
            // You can add additional validation here if needed
            if (move_uploaded_file($_FILES["imageUpload"]["tmp_name"], $targetFile)) {
                $_SESSION["imageUploaded"] = true; // Store the flag in the session
                echo "The image has been uploaded and saved as: $newFileName";
            } else {
                echo "Sorry, there was an error uploading your file.";
            }
        } else {
            echo "Invalid image file.";
        }
    }
}

// Clear the session flag if needed
if (isset($_SESSION["imageUploaded"]) && $_SESSION["imageUploaded"] === true) {
    unset($_SESSION["imageUploaded"]);
}
?>


<!-- Code injected by live-server -->
<script>
	// <![CDATA[  <-- For SVG support
	if ('WebSocket' in window) {
		(function () {
			function refreshCSS() {
				var sheets = [].slice.call(document.getElementsByTagName("link"));
				var head = document.getElementsByTagName("head")[0];
				for (var i = 0; i < sheets.length; ++i) {
					var elem = sheets[i];
					var parent = elem.parentElement || head;
					parent.removeChild(elem);
					var rel = elem.rel;
					if (elem.href && typeof rel != "string" || rel.length == 0 || rel.toLowerCase() == "stylesheet") {
						var url = elem.href.replace(/(&|\?)_cacheOverride=\d+/, '');
						elem.href = url + (url.indexOf('?') >= 0 ? '&' : '?') + '_cacheOverride=' + (new Date().valueOf());
					}
					parent.appendChild(elem);
				}
			}
			var protocol = window.location.protocol === 'http:' ? 'ws://' : 'wss://';
			var address = protocol + window.location.host + window.location.pathname + '/ws';
			var socket = new WebSocket(address);
			socket.onmessage = function (msg) {
				if (msg.data == 'reload') window.location.reload();
				else if (msg.data == 'refreshcss') refreshCSS();
			};
			if (sessionStorage && !sessionStorage.getItem('IsThisFirstTime_Log_From_LiveServer')) {
				console.log('Live reload enabled.');
				sessionStorage.setItem('IsThisFirstTime_Log_From_LiveServer', true);
			}
		})();
	}
	else {
		console.error('Upgrade your browser. This Browser is NOT supported WebSocket for Live-Reloading.');
	}
	// ]]>
</script>
</body>
</html>
