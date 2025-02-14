<?php

    # Gets username and password entries placed by JS file
    $inData = getRequestInfo();

    $id = 0;
    $FirstName = "";
    $LastName = "";

    # Connect to database
    $conn = new mysqli("localhost", "Alex", "password", "contact_manager");
    if( $conn->connect_error)
    {
        returnWithError($conn->connect_error);
    }
    # Request from database entries where username and password are equal to input
    $stmt = $conn->prepare("SELECT ID,FirstName,LastName FROM Users WHERE Login = ? AND Password = ?");
    $stmt->bind_param("ss", $inData["login"], $inData["password"]);
    $stmt->execute();
    $result = $stmt->get_result();

    # Return data if found, return with error if not
    if( $row = $result->fetch_assoc())
    {
        # Update DateLastLoggedIn
        $updateStmt = $conn->prepare("UPDATE Users SET DateLastLoggedIn = current_timestamp() WHERE Login = ?");
        $updateStmt->bind_param("s", $inData["login"]);
        $updateStmt->execute();
        $updateStmt->close();
        
        returnWithInfo( $row['FirstName'], $row['LastName'], $row['ID']);
    }
    else
    {
        returnWithError("No Records Found");
    }

    $stmt->close();
    $conn->close();

    # Grabs entries from php://input file, placed by JS file
    function getRequestInfo()
    {
        return json_decode(file_get_contents('php://input'), true);
    }

    function sendResultInfoAsJson($obj)
    {
        header('Content-type: application/json');
        echo $obj;
    }

    function returnWithError($err)
    {
        $ret = '{"id":0,"FirstName":"", "LastName":"","error":"' . $err . '"}';
        sendResultInfoAsJson($ret);
    }

    function returnWithInfo($FirstName, $LastName, $id)
    {
        $ret = '{"id":' . $id . ',"FirstName":"' . $FirstName . '","LastName":"' . $LastName . '","error":""}';
        sendResultInfoAsJson($ret);
    }

?>