<?php
    # Gets necessary data from JS file
    $inData = getRequestInfo();

    $UserID = $inData["UserID"];
    $FirstName = $inData["FirstName"];
    $LastName = $inData["LastName"];
    $Phone = $inData["Phone"];
    $Email = $inData["Email"];


    $conn = new mysqli("localhost", "Alex", "password", "contact_manager");

    # Connect to database
    if ($conn->connect_error) 
    {
        returnWithError($conn->connect_error);
    } 
    else 
    {
        $stmt = $conn->prepare("UPDATE Contacts SET FirstName=?, LastName=?, Phone=?, Email=? WHERE UserID=? AND FirstName LIKE ?");
        $stmt->bind_param("ssssis", $FirstName, $LastName, $Phone, $Email, $UserID, $FirstName);

        if ($stmt->execute()) 
        {
            returnWithInfo("Contact updated");
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