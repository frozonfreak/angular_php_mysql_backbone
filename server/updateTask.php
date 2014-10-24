<?php

	//Decode received JSON data
	$data = file_get_contents("php://input");
	$receivedData = json_decode($data);

	include_once 'vendor/GoogleAuthenticator.php';

	$ga = new GoogleAuthenticator();
	//$secret = $ga->createSecret();
	$secret = 'RSQFDVEXMWWBIYFP'; //Needs to be hardcoded. 

	if(isset($receivedData->{"type"})){
		$response = '';
		switch ($receivedData->{"type"}) {
		    case 'getCode':
				$oneCode = $ga->getCode($secret);	        
				$response = array("status" => 1,
		        	               "message"=> $oneCode);
		        echo json_encode($response);
		    break;
		    case 'generateQRLink':
		    	$qrCodeUrl = $ga->getQRCodeGoogleUrl('Testing URL', $secret);

		    	$response = array("status" => 1,
		        	               "message"=> $qrCodeUrl);
		    	echo json_encode($response);
		    break;
		    case 'checkCodeValidity':
		    	if(isset($receivedData->{"code"})){
		    		$code = $receivedData->{"code"};
		    		$checkResult = $ga->verifyCode($secret, $code, 2);    // 2 = 2*30sec clock tolerance
		    		if ($checkResult) {
		    		    $response = array("status" => 1,
		        	               "message"=> "Success");
		    		} else {
		    		    $response = array("status" => 0,
		        	               "message"=> "Failed");
		    		}
		    	}
		    	else{
		    		$response = array("status" => 0,
		        	               "message"=> "Update all parameters");
		    	}
		    	echo json_encode($response);
		    break;
		}
	}
	else {

	    $response = array("status" => 0,
	                      "message"=> "All fields needs to be set");
	    echo json_encode($response);
	}
?>