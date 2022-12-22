<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="../assets/css/main.css">
    <title>Document</title>
</head>
<body>
    <h2>fitur 1</h2>

    <div class="select-dropdown">
        <select>
            <option value="Option 1">Buku 1</option>
            <option value="Option 2">Buku 2</option>
            <option value="Option 3">Buku 3</option>
            <option value="Option 3">Buku 4</option>
            <option value="Option 3">Buku 5</option>
        </select>
    </div>
    
    <?php
    include 'index.php';
    $conn = OpenCon();
    $queryku = "SELECT Source,sum(weight) from book_1 group by Source";

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

    <div class="chart">
        <canvas id="my_chart2" class="chart-canvas"></canvas>
      </div>

      <script src="https://cdn.jsdelivr.net/npm/chart.js"></script>
      <script>
          const labels2 = [
                  '1',
                  '2',
                  '3',
                  '4',
                  '5',
                  '6',
                  '7',
                  '8',
                  '9'
                  ];
          const data2 = {
              labels: labels2,
              datasets: [{
                  label: 'Legends',
                  backgroundColor: 'rgb(155, 99, 132)',
                  borderColor: 'rgb(255, 99, 132)',
                  data: [0, 10, 5, 2, 20, 30, 45,9,8],
              }]
          };
          const config2 = {
              type: 'line',
              data: data2,
              options: {}
          };
          var myChart2 = new Chart(
          document.getElementById('my_chart2'),
          config2
          );
      </script>
</body>
</html>