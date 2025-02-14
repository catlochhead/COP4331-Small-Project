<?php
    # Gets necessary data from JS file
    $inData = getRequestInfo();

    $UserID = $inData["UserID"];
    $FirstName = $inData["FirstName"];
    $LastName = $inData["LastName"];

    # Connect to database
    $conn = new mysqli("localhost", "Alex", "password", "contact_manager");

    if( $conn->connect_error)
    {
        returnWithError($conn->connect_error);
    }
    else 
    {
        $stmt = $conn->prepare("DELETE FROM Contacts WHERE UserID=? AND FirstName=? AND LastName=?");
        $stmt->bind_param("iss", $UserID, $FirstName, $LastName);

        if ($stmt->execute()) 
        {
            returnWithInfo("Contact deleted");
        } 
        else 
        {
            returnWithError("Contact not found");
        }

        $stmt->close();
        $conn->close();
    }

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
        $retValue = '{"error":"' . $err . '"}';
        sendResultInfoAsJson($retValue);
    }

    function returnWithInfo($message)
    {
        $retValue = '{"message":"' . $message . '", "error":""}';
        sendResultInfoAsJson($retValue);
    }

?>