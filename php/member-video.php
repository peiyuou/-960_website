
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">

    <title>Document</title>
     <!-- 套件 -->
<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.8.1/slick.css" />
<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.8.1/slick-theme.min.css" />
<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/OwlCarousel2/2.3.4/assets/owl.carousel.min.css">


<!-- 基本盤 -->
<link rel="stylesheet" href="../bootstrap/bootstrap-grid.min.css">
<link rel="stylesheet" href="../css/app_public.css">
<link rel="stylesheet" href="../css/video.css">

<!-- 基本盤 -->
<script src="https://cdnjs.cloudflare.com/ajax/libs/jquery/3.5.1/jquery.min.js"></script>
<script src="https://kit.fontawesome.com/d18b20bddd.js" crossorigin="anonymous"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/vue/2.6.11/vue.min.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/axios/0.20.0/axios.min.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/js-cookie/2.2.1/js.cookie.min.js"></script>
<!-- 套件 -->
<script src="https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.8.1/slick.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/OwlCarousel2/2.3.4/owl.carousel.min.js"></script>
<!-- <script src="./js/"></script> -->

</head>

<body>
<?php
try {

    require_once('./connectMySql.php');
	$sql = "select * from `skill_class` where SKI_NO = :SKI_NO"; 
    $skill = $pdo->prepare($sql);
    $skill->bindValue(':SKI_NO',$_POST['SKI_NO']);
    $skill->execute();
    // $skill = $pdo->query($sql);
    // $skillRows = $skill->fetchAll(PDO::FETCH_ASSOC);
    $testRow = $skill->fetch(PDO::FETCH_ASSOC);


    // var_dump($skillRow);exit();

} catch (PDOException $e) {
	echo "錯誤原因 : ", $e->getMessage(), "<br>";
	echo "錯誤行號 : ", $e->getLine(), "<br>";
}
?>


    <div class="video_title">
    <i class="fas fa-chevron-left"></i>&nbsp;
        <a href="../member.html">
            <p class="video_p1">返回我的課程</p>
        </a><br>
    </div>
    <div class="video_title2">
    
    
    
    
       <h1 class="video_p2"><?php  echo $testRow["SKI_NAME"] ?></h1>

	
	

    </div>
    

    <div id="video" class="video-container">
       
    <?php
    
	?>
	<iframe id="video-Cascade" class="i-frame" max-width="1200px" height="50vh" src="<?php echo $testRow["SKI_LINK"] ?>" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
	<?php
	
	?>
    </div>


</body>

</html>