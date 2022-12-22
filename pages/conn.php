<?php
    include 'index.php';
    $conn = OpenCon();
    $queryku = "select * from book_1";

    $result = $conn->query($queryku);

    if($result->num_rows>0){
    	while($row = $result->fetch_assoc()){
		echo "nama : ".$row["Source"]."<br>";
	}
    }else{
    	echo "0 results";
    }
    echo "Connected Successfully";
    CloseCon($conn);
?>
