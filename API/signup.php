<?php
    # Gets necessary data from JS file
    $indata = getRequestInfo();

    # Fill data
    $firstName = $indata['FirstName'];
    $lastName = $indata['LastName'];
    $login = $indata['login'];
    $password = $indata['password'];

    # Connect to database
    $conn = new mysqli("localhost", "Alex", "password", "contact_manager");
    if($conn->connect_error)
    {
        returnWithError($conn->connect_error);
    }

    # Check for duplicate login
    $stmt = $conn->prepare("SELECT ID FROM Users WHERE Login = ?");
    $stmt->bind_param("s", $login);
    $stmt->execute();
    $result = $stmt->get_result();

    # If entry found, return with error
    if($result->fetch_assoc())
    {
        returnWithError("Login already exists");
        exit();
    }

    # If entry not found, create a new User entry in the database

    $stmt->close();
    $stmt = $conn->prepare("INSERT INTO Users (FirstName,LastName,Login,Password) values (?,?,?,?)");
    $stmt->bind_param("ssss", $firstName,$lastName,$login,$password);
    $stmt->execute();
    // $result = $stmt->get_result();

    $stmt->close();
    $stmt = $conn->prepare("SELECT ID from Users where Login = ?");
    $stmt->bind_param("s", $login);
    $stmt->execute();
    $result = $stmt->get_result();

    # Get newly created ID and return the info 

    $row = $result->fetch_assoc();
    returnWithInfo( $firstName, $lastName, $row['ID']);

    $stmt->close();
    $conn->close();

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