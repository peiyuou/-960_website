<?php
session_start();
try {
  require_once "./connectMySql.php";

  //-------------------------------------------------
  $memSql = "select * from member";
  $memSearchSql = "select * from `member` where MEM_NO = 3";
  $adminSql = "select * from administrator";
  $quizSql = "select q.QUIZ_NO, q.QUIZ_CON, q.QUIZ_PIC_ONE, q.QUIZ_SEL_ONE_CONTENT ,c.ind_class 'firstType', q.QUIZ_PIC_TWO,q.QUIZ_SEL_TWO_CONTENT, d.ind_class 'secondType', q.QUIZ_USE from quiz q join industry_class c on q.QUIZ_SEL_ONE_CLASS=c.IND_NO join industry_class d on q.QUIZ_SEL_two_CLASS=d.IND_NO order by QUIZ_NO;";
  $careerSql = "select i.IND_INT_NO,i.IND_INT_NAME,i.IND_INT_PICTURE ,c.IND_CLASS,i.IND_INT_INTRO, i.INT_INT_CONTENT, i.IND_INT_SKILL, GROUP_CONCAT(s.IND_SAL_STEP_DISTANCE),GROUP_CONCAT(s.IND_SAL_LOW) IND_SAL_LOW,GROUP_CONCAT(s.IND_SAL_HIGH) IND_SAL_HIGH from industry_introduce i join industry_class c on i.IND_NO = c.IND_NO join industry_salary s on i.IND_INT_NO = s.IND_INT_NO GROUP by i.IND_INT_NO order by i.IND_INT_NO";

  $skillSql = "select a.*, b.IND_CLASS from SKILL_CLASS a join INDUSTRY_CLASS b on a.IND_NO = b.IND_NO order by SKI_NO";
  $ArReportSql = "select a.ART_REP_NO, a.DIS_NO, b.DIS_NAME, b.DIS_CONTENT, c.MEM_NO, b.MEM_NO 'RM',a.ART_REP_CONTENT, a.ART_REP_PASS from ARTICLE_REPORT a join DISCUSS_AREA b on a.DIS_NO = b.DIS_NO join MEMBER c on a.MEM_NO = c.MEM_NO";
  $MgReportSql = "select a.MES_REP_NO, a.DIS_MES_NO, c.DIS_MES_CONTENT, b.MEM_NO,c.MEM_NO 'RM', a.MES_REP_CONTENT, a.MES_REP_PASS from MESSAGE_REPORT a join MEMBER b on a.MEM_NO = b.MEM_NO join DISCUSS_MESSAGE c on a.DIS_MES_NO = c.DIS_MES_NO";

  $materialSql = "select * from POSTCARD_MATERIAL ";
  $announceSql = "select * from announcement;";
  $member = $pdo->query($memSql);
  $memSearch = $pdo->query($memSearchSql);
  $administrator = $pdo->query($adminSql);
  $quiz = $pdo->query($quizSql);
  $career = $pdo->query($careerSql);
  $skill = $pdo->query($skillSql);
  $ArReport = $pdo->query($ArReportSql);
  $MgReport = $pdo->query($MgReportSql);

  // $ordCount = $pdo->query($ordCountSql);

  $material = $pdo->query($materialSql);
  $announce = $pdo->query($announceSql);
} catch (PDOException $e) {
  echo "錯誤原因:", $e->getMessage(), "<br>";
  echo "錯誤行號:", $e->getLine(), "<br>";
}

?>

<!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>職引960後台</title>
  <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css" integrity="sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T" crossorigin="anonymous">
  <link rel="stylesheet" href="./css/app_public.css">
  <link rel="stylesheet" href="./css/backstage_index.css">


</head>

<body>
  <div class="delete_confirm">

  </div>
  <header>

    <div class="logo">
      <a href="./backstage_index.php">
        <img src="./img/LOGO_FINAL.svg" alt="logo">
      </a>
    </div>
    <div class="bg_ad2">
      <div>
        <p class="ad_name">
          <?php
          echo $_SESSION["AD_NAME"];
          ?>
        </p>
        <p>
          <a href="./backstage_login.html">登出</a>
        </p>
      </div>

    </div>

  </header>
  <div class="container backstage" id="bg_stage">
    <div class="row">
      <div class="side col-2">
        <div class="list">
          <ul class="member_management">
            <li class="title">人員管理</li>
            <li v-cloak v-for="(member,index) in members" @click="show(index)">{{member}}</li>
          </ul>
          <ul class="management">
            <li class="title">前後台管理</li>
            <li v-cloak v-for="(list,index) in lists" @click="showBoard(index)">{{list}}</li>
          </ul>
        </div>
        <div class="copyright">
          <a href="./index.html">職引960</a>
          <span>
            &copy;2020.
          </span>
        </div>
      </div>

      <div class="main col-11">
        <div class="account" v-show="account">
          <div class="title">
            <p class="title">會員管理</p>
          </div>
          <form id="search_mem_form" action="./backstage_memberSearch.php">
            <div>
              <input type="text" class="search_input" id="MemSearch" name="MEM_NO">
              <button type="button" class="search" @click="SearchMEM" id="search_mem_no">查詢</button>
            </div>
          </form>
          <!-- 找會員資料 -->
          <table id="oneMem">
          </table>
          <button class="back" @click="backAllMem" id="backAllMem" style="display: none;">返回全部列表</button>
          <!-- 全部會員 -->
          <table id="allMem">
            <tr>
              <th>編號</th>
              <th>名稱</th>
              <th>電話</th>
              <th>電子郵件</th>
              <th>是否停權</th>
              <th>修改</th>
            </tr>
            <?php
            while ($memberRow = $member->fetch(PDO::FETCH_ASSOC)) {
            ?>
              <tr>

                <td>
                  <div class="memNo"><?= $memberRow["MEM_NO"] ?></div>
                </td>
                <td><?= $memberRow["MEM_NAME"] ?></td>
                <td><?= $memberRow["MEM_TEL"] ?></td>
                <td><?= $memberRow["MEM_EMAIL"] ?></td>
                <td>
                  <p><?php echo $memberRow["MEM_USE"] == 0 ? "否" : "是" ?></p>

                  <select name="authority" id="" class="editShow MEM_USE">
                    <option value="1">是</option>
                    <option value="0">否</option>
                  </select>
                </td>
                <td>
                  <button class="edit memberEdit">編輯</button>
                  <button class="editShow cancel">取消</button>
                </td>
              </tr>
            <?php
            }
            ?>
          </table>
        </div>

        <div class="administrator" v-show="administrator">
          <div class="title">
            <p class="title">管理員管理</p>
            <button id="newAdBtn" class="add">新增管理員</button>
          </div>
          <table id="adTable">
            <tr>
              <th>編號</th>
              <th>名稱</th>
              <th>帳號</th>
              <th>是否停權</th>
              <th>修改</th>
            </tr>
            <?php
            while ($adminRow = $administrator->fetch(PDO::FETCH_ASSOC)) {
            ?>
              <tr>
                <td>
                  <div class="adNo"><?= $adminRow["AD_NO"] ?></div>
                </td>
                <td><?= $adminRow["AD_NAME"] ?></td>
                <td><?= $adminRow["AD_ACCOUNT"] ?></td>
                <td>
                  <p><?php echo $adminRow["AD_MAT_USE"] == 0 ? "否" : "是" ?></p>
                  <select name="authority" id="" class="editShow AD_MAT_USE">
                    <option value="1">是</option>
                    <option value="0">否</option>
                  </select>
                </td>
                <td>
                  <button class="edit adminEdit">編輯</button>
                  <button class="editShow cancel">取消</button>
                </td>
              </tr>
            <?php
            }

            ?>
          </table>
          <form action="./backstage_add_administrator.php" method="post" id="newAdForm">
            <div>
              <label for="AD_NAME">名稱:</label>
              <input type="text" class="form" name="AD_NAME" placeholder="請輸入小於20個字" maxlength="20">
            </div>
            <div>
              <label for="AD_ACCOUNT">帳號:</label>
              <input type="text" class="form" name="AD_ACCOUNT" placeholder="請輸入小於10個字" maxlength="10">
            </div>
            <div>
              <label for="AD_PASSWORD">密碼:</label>
              <input type="password" class="form" name="AD_PASSWORD" placeholder="請輸入小於10個字" maxlength="10" id="AD_PASSWORD">
              <span>
                <i class="far fa-eye" id="showPassword"></i>
              </span>

            </div>
            <div>
              <button type="submit" class="submit" id="newAdSubmit">送出</button>
            </div>
          </form>
          <div>
            <button class="back" id="backAd">返回全部列表</button>
          </div>
        </div>

        <!-- quiz -->
        <div class="quiz" v-show="quiz">
          <div class="title">
            <p class="title">測驗題庫</p>
            <button class="add" @click="addForm">新增題目</button>
          </div>
          <table>
            <tr>
              <th>編號</th>
              <th>問題內容</th>
              <th>選項一圖片</th>
              <th>選項一內容</th>
              <th>選項一類別</th>
              <th>選項二圖片</th>
              <th>選項二內容</th>
              <th>選項二類別</th>
              <th>啟用題目</th>
              <th>修改</th>
            </tr>
            <?php
            while ($quizRow = $quiz->fetch(PDO::FETCH_ASSOC)) {
            ?>
              <tr>
                <td>
                  <div class="quizNo"><?= $quizRow["QUIZ_NO"] ?></div>
                </td>
                <td>
                  <div class="QUIZ_CON"><?= $quizRow["QUIZ_CON"] ?></div>
                </td>
                <td>
                  <img src="<?= $quizRow['QUIZ_PIC_ONE'] ?>" alt="photo1" class="quizImgOne">
                  <input type="file" name="QUIZ_PIC_ONE" class="editShow QUIZ_PIC_ONE">


                </td>
                <td>
                  <div class="QUIZ_ONE_CONTENT"><?= $quizRow["QUIZ_SEL_ONE_CONTENT"] ?></div>
                </td>
                <td>
                  <p> <?= $quizRow["firstType"] ?></p>

                  <select name="firstType<?= $quizRow["QUIZ_NO"] ?>" class="editShow firstType">
                    <option v-for="type in types" :value="type.value">{{type.type}}</option>
                  </select>
                </td>
                <td>
                  <img src="<?= $quizRow['QUIZ_PIC_TWO'] ?>" alt="photo2" class="quizImgTwo">
                  <input type="file" name="QUIZ_PIC_TWO" class="editShow QUIZ_PIC_TWO">
                </td>
                <td>
                  <div class="QUIZ_TWO_CONTENT"><?= $quizRow["QUIZ_SEL_TWO_CONTENT"] ?></div>
                </td>
                <td>
                  <p><?= $quizRow["secondType"] ?></p>
                  <select name="secondType<?= $quizRow["QUIZ_NO"] ?>" class="editShow secondType">
                    <option v-for="type in types" :value="type.value">{{type.type}}</option>
                  </select>
                </td>
                <td>
                  <p><?php echo $quizRow["QUIZ_USE"] == 0 ? "否" : "是" ?></p>
                  <select name="QUIZ_USE<?= $quizRow["QUIZ_NO"] ?>" class="editShow QUIZ_USE">
                    <option value="1">是</option>
                    <option value="0">否</option>
                  </select>
                </td>
                <td>
                  <button class="edit quizEdit">編輯</button>
                  <button class="editShow cancel">取消</button>
                </td>
              </tr>

            <?php
            }
            ?>
          </table>
          <!-- 新增題庫form -->
          <form action="backstage_quiz_add.php" method="post" style="display:none;" enctype="multipart/form-data">
            <div>
              <label for="quiz_con">問題內容:</label>
              <input type="text" name="quiz_con" placeholder="輸入題目" id="quiz_cons" class="form">
            </div>
            <div>
              <label for="quiz_use">啟用題目:</label>
              <input type="radio" name="quiz_use" value="1" checked class="radio" id="quiz_use1">
              <label for="quiz_use1" class="use">是</label>

              <input type="radio" name="quiz_use" value="0" class="radio" id="quiz_use0">
              <label for="quiz_use0" class="use">否</label>

            </div>
            <div class="quizOne">
              <div>
                <p>選項一</p>
              </div>

              <div>
                <label for="quiz_sel_one_content">內容:</label>
                <input type="text" name="quiz_sel_one_content" cols="20" rows="5" placeholder="輸入內容" class="form">
              </div>
              <div>
                <label for="quiz_sel_one_class">類別:</label>
                <select name="quiz_sel_one_class">
                  <option v-for="type in types" :value="type.value">{{type.type}}</option>
                </select>
              </div>

              <div>
                <label for="quiz_pic_one" class="file">上傳檔案
                  <input type="file" class="form" name="quiz_pic_one" style="display: none;" id="quiz_pic_one">
                </label>
                <div class="showPreImg" id="quizShowPreImg1">
                  <img src="" id="quiz_pic_one_show">
                </div>
              </div>

            </div>
            <div class="quizTwo">
              <div>
                <p>選項二</p>
              </div>

              <div>
                <label for="quiz_sel_two_content">內容:</label>
                <input type="text" name="quiz_sel_two_content" placeholder="輸入內容" class="form">
              </div>
              <div>
                <label for="quiz_sel_two_class">類別:</label>
                <select name="quiz_sel_two_class">
                  <option v-for="type in types" :value="type.value">{{type.type}}</option>
                </select>
              </div>
              <div>
                <label for="quiz_pic_two" class="file">上傳檔案
                  <input type="file" class="form" name="quiz_pic_two" style="display: none;" id="quiz_pic_two">
                </label>
                <div class="showPreImg" id="quizShowPreImg2">
                  <img src="" id="quiz_pic_two_show">
                </div>
              </div>

            </div>


            <div>
              <button type="submit" class="submit">送出</button>
            </div>

          </form>
          <div>
            <button class="back" @click="cancel_add" style="display: none;">返回全部列表</button>
          </div>

        </div>

        <!-- industry -->
        <div class="industry" v-show="industry">
          <div class="title">
            <p class="title">行業管理</p>
            <button class="add" @click="addForm">新增行業</button>
          </div>
          <table class="ind_all">
            <tr>
              <th>編號</th>
              <th>名字</th>
              <th>介紹</th>
              <th>圖片</th>
              <th>類別</th>
              <th>內容</th>
              <th>技能</th>
              <th>一年以下</th>
              <th>一~三年</th>
              <th>三~五年</th>
              <th>五~十年</th>
              <th>十年以上</th>
              <th>修改</th>
            </tr>
            <?php
            while ($careerRow = $career->fetch(PDO::FETCH_ASSOC)) {
              $careerArrayH = array();
              $careerArrayL = array();
              $careerArrayH = mb_split(",", $careerRow["IND_SAL_HIGH"]);
              $careerArrayL = mb_split(",", $careerRow["IND_SAL_LOW"]);
            ?>
              <tr>
                <td>
                  <div class="indNo"><?= $careerRow["IND_INT_NO"] ?></div>
                </td>
                <td>
                  <div class="indName"><?= $careerRow["IND_INT_NAME"] ?></div>
                </td>
                <td>
                  <div class="overflow indIntro"><?= $careerRow["IND_INT_INTRO"] ?></div>
                </td>
                <td>
                  <img src="<?= $careerRow["IND_INT_PICTURE"] ?>" alt="行業圖片" class="indImg">
                  <input type="file" name="indPic" class="editShow indPic">
                </td>
                <td>
                  <?= $careerRow["IND_CLASS"] ?>
                  <select name="" id="" class="editShow indType">
                    <option v-for="type in types" :value="type.value">{{type.type}}</option>
                  </select>
                </td>
                <td>
                  <div class="overflow indContent"><?= $careerRow["INT_INT_CONTENT"] ?></div>
                </td>
                <td>
                  <div class="overflow indSkill"><?= $careerRow["IND_INT_SKILL"] ?></div>
                </td>
                <td>
                  <p>最低月薪:
                    <div class="firstYearLow"><?= $careerArrayL[0] ?></div>
                  </p>
                  <p>最高月薪:
                    <div class="firstYearHigh"><?= $careerArrayH[0] ?></div>
                  </p>

                </td>

                <td>
                  <p>最低月薪:
                    <div class="thirdYearLow"><?= $careerArrayL[1] ?></div>
                  </p>
                  <p>最高月薪:
                    <div class="thirdYearHigh"><?= $careerArrayH[1] ?></div>
                  </p>

                </td>

                <td>
                  <p>最低月薪:
                    <div class="fifthYearLow"><?= $careerArrayL[2] ?></div>
                  </p>
                  <p>最高月薪:
                    <div class="fifthYearHigh"><?= $careerArrayH[2] ?></div>
                  </p>

                </td>

                <td>
                  <p>最低月薪:
                    <div class="tenYearLow"><?= $careerArrayL[3] ?></div>
                  </p>
                  <p>最高月薪:
                    <div class="tenYearHigh"><?= $careerArrayH[3] ?></div>
                  </p>

                </td>

                <td>
                  <p>最低月薪:
                    <div class="upYearLow"><?= $careerArrayL[4] ?></div>
                  </p>
                  <p>最高月薪:
                    <div class="upYearHigh"><?= $careerArrayH[4] ?></div>
                  </p>

                </td>
                <td>
                  <button class="edit careerEdit">編輯</button>
                  <button class="editShow cancel">取消</button>
                </td>
              </tr>
            <?php
            }
            ?>
          </table>

          <!-- 新增行業form -->
          <form action="backstage_ind_add.php" method="post" enctype="multipart/form-data" style="display: none;">
            <div class="indIntro">
              <input type="hidden" name="IND_INT_NO" id="IND_INT_NO">
              <div>
                <label for="ind_int_name">行業名字:</label>
                <input type="text" class="form" name="ind_int_name">
              </div>
              <div>
                <label for="ind_int_intro">行業介紹:</label>
                <textarea name="ind_int_intro" cols="20" rows="5" placeholder="輸入職業介紹"></textarea>
              </div>

              <div>
                <label for="ind_no">行業類別:</label>
                <select name="ind_no">
                  <option v-for="type in types" :value="type.value">{{type.type}}</option>
                </select>
              </div>
              <div>
                <label for="ind_int_content">行業內容:</label>
                <textarea name="ind_int_content" cols="20" rows="5" placeholder="輸入職業內容"></textarea>
              </div>
              <div>
                <label for="ind_int_skill">行業技能:</label>
                <textarea name="ind_int_skill" cols="20" rows="5" placeholder="輸入職業技能"></textarea>
              </div>


            </div>
            <div class="salary">
              <div>
                <p>一年以下</p>
                <label for="IND_SAL_LOW1">最低月薪:</label>
                <input type="number" class="form short" name="IND_SAL_LOW1">
                <label for="IND_SAL_HIGH1">最高月薪:</label>
                <input type="number" class="form short" name="IND_SAL_HIGH1">
              </div>
              <div>
                <p>一~三年</p>
                <label for="IND_SAL_LOW2">最低月薪:</label>
                <input type="number" class="form short" name="IND_SAL_LOW2">
                <label for="IND_SAL_HIGH2">最高月薪:</label>
                <input type="number" class="form short" name="IND_SAL_HIGH2">
              </div>
              <div>
                <p>三~五年</p>
                <label for="IND_SAL_LOW3">最低月薪:</label>
                <input type="number" class="form short" name="IND_SAL_LOW3">
                <label for="IND_SAL_HIGH3">最高月薪:</label>
                <input type="number" class="form short" name="IND_SAL_HIGH3">
              </div>
              <div>
                <p>五~十年</p>
                <label for="IND_SAL_LOW4">最低月薪:</label>
                <input type="number" class="form short" name="IND_SAL_LOW4">
                <label for="IND_SAL_HIGH4">最高月薪:</label>
                <input type="number" class="form short" name="IND_SAL_HIGH4">
              </div>
              <div>
                <p>十年以上</p>
                <label for="IND_SAL_LOW5">最低月薪:</label>
                <input type="number" class="form short" name="IND_SAL_LOW5">
                <label for="IND_SAL_HIGH5">最高月薪:</label>
                <input type="number" class="form short" name="IND_SAL_HIGH5">
              </div>
              <div>
                <label for="ind_int_picture" class="file">上傳檔案
                  <input type="file" class="form" name="ind_int_picture" id="ind_int_picture" style="display: none;">
                </label>
                <div class="showPreImg " id="indPre">
                  <img src="" id="indPreShow">
                </div>
              </div>
            </div>
            <div>
              <button type="submit" class="submit">送出</button>
            </div>

          </form>
          <div>
            <button class="back" @click="cancel_add" style="display: none;">返回全部列表</button>
          </div>


        </div>

        <!-- skill_class -->
        <div class="skill_class" v-show="skill_class">
          <div class="title">
            <p class="title">課程管理</p>
            <button class="add" @click="addForm">新增課程</button>
          </div>
          <table>
            <tr>
              <th>編號</th>
              <th>名稱</th>
              <th>類別</th>
              <th>購買人數</th>
              <th>價格</th>
              <th>總時數</th>
              <th>介紹</th>
              <th>學習內容</th>
              <th>課程連結</th>
              <th>課程圖片</th>
              <th>講師圖片</th>
              <th>講師名稱</th>
              <th>講師介紹</th>
              <th>大綱</th>
              <th>上課對象</th>
              <th>是否隱藏</th>
              <th>修改</th>
            </tr>
            <?php
            while ($skillRow = $skill->fetch(PDO::FETCH_ASSOC)) {
            ?>
              <tr>
                <td class="ski_no">
                  <div class="skiNo"><?= $skillRow["SKI_NO"] ?></div>
                </td>
                <td id="ski_name">
                  <div class="ski_name"><?= $skillRow["SKI_NAME"] ?></div>
                </td>
                <td id="ski_no">
                  <?= $skillRow["IND_CLASS"] ?>
                  <select name="" id="" class="editShow skiType">
                    <option v-for="type in types" :value="type.value">{{type.type}}</option>
                  </select>
                </td>
                <td id="ski_buy_num">
                  <?= $skillRow["SKI_BUY_NUM"] ?>
                </td>
                <td id="ski_price">
                  <div class="ski_price"><?= $skillRow["SKI_PRICE"] ?></div>
                </td>
                <td id="ski_time">
                  <div class="ski_time"><?= $skillRow["SKI_TIME"] ?></div>
                </td>
                <td id="ski_intro">
                  <div class="overflow ski_intro"><?= $skillRow["SKI_INTRO"] ?></div>
                </td>
                <td id="ski_harvest">
                  <div class="overflow ski_harvest"><?= $skillRow["SKI_HARVEST"] ?></div>
                </td>
                <td id="ski_line">
                  <div class="ski_link"><?= $skillRow["SKI_LINK"] ?></div>
                </td>
                <td id="ski_img">
                  <img src="<?= $skillRow["SKI_IMG"] ?>" alt="課程圖片" class="ski_img">
                  <input type="file" name="" class="editShow skiImgInput">
                </td>
                <td id="ski_tec_img">
                  <img src="<?= $skillRow["SKI_TEC_IMG"] ?>" alt="講師圖片" class="ski_tec_img">
                  <input type="file" name="" class="editShow skiTecImgInput">
                </td>
                <td id="ski_tec_name">
                  <div class="ski_tec_name"><?= $skillRow["SKI_TEC_NAME"] ?></div>
                </td>
                <td id="ski_tec_intro">
                  <div class="overflow ski_tec_intro"><?= $skillRow["SKI_TEC_INTRO"] ?></div>
                </td>
                <td id="ski_outline">
                  <div class="overflow ski_outline"><?= $skillRow["SKI_OUTLINE"] ?></div>
                </td>

                <td id="ski_stud">
                  <div class="overflow ski_stud"><?= $skillRow["SKI_STUD"] ?></div>
                </td>
                <td>

                  <?php echo $skillRow["SKI_HIDDEN"] == 0 ? "否" : "是" ?>
                  <select name="" id="" class="editShow skill_USE">
                    <option value="1">是</option>
                    <option value="0">否</option>
                  </select>
                </td>
                <td>
                  <button class="edit skillEdit">編輯</button>
                  <button class="editShow cancel">取消</button>
                </td>
              </tr>
            <?php
            }
            ?>
          </table>
          <!-- 新增課程form -->
          <form action="backstage_skillClass_add.php" method="post" style="display:none;" enctype="multipart/form-data">
            <div class="classShort">
              <div>
                <label for="">課程名稱:</label>
                <input type="text" class="ski_name form" name="ski_name" placeholder="輸入課程名稱">
              </div>
              <div>
                <label for="">課程類別:</label>
                <select name="ind_no" id="">
                  <option :value="type.value" v-for="type in types">{{type.type}}</option>
                </select>

                <label for="" class="useLabel">隱藏:</label>
                <input type="radio" name="ski_hidden" value="0" id="skillUse1">
                <label for="skillUse1" class="use">是</label>
                <input type="radio" name="ski_hidden" value="1" checked id="skillUse0">
                <label for="skillUse0" class="use">否</label>
              </div>


              <div>
                <label for="">課程價格:</label>
                <input type="number" min="0" class="ski_price form" name="ski_price" placeholder="ex:3000">
              </div>
              <div>
                <label for="">總時數:</label>
                <input type="number" min="0" class="ski_time form use" name="ski_time" placeholder="ex:1 /小時">

              </div>
              <div>
                <label for="">上課對象:</label>
                <input type="text" class="ski_stud form" name="ski_stud" placeholder="ex:學生">

              </div>
              <div>
                <label for="">課程連結:</label>
                <input type="text" class="ski_link form" name="ski_link" placeholder="ex:youtube.com">
              </div>
            </div>
            <div class="teacherInto">
              <div class="teacherP">
                <p>講師簡介</p>
              </div>

              <div class="teacherText">


                <div>
                  <label for="">講師名稱:</label>
                  <input type="text" class="ski_tec_name form" name="ski_tec_name" placeholder="ex:廣仲">
                </div>
                <div>
                  <label for="">講師介紹:</label>
                  <textarea class="ski_tec_intro" name="ski_tec_intro" cols="20" rows="5" placeholder="限制最多250字" maxlength="250"></textarea>
                </div>


              </div>
              <div class="teacherImg">
                <div>
                  <label for="skiTecImg" class="file">上傳檔案
                    <input type="file" class="form" name="ski_tec_img" id="skiTecImg" style="display: none;">
                  </label>
                </div>
                <div class="showPreImg " id="skiTecPre">
                  <img src="" id="ski_tec_img_show">
                </div>
              </div>

            </div>
            <div class="classInto">
              <div class="classP">

                <p>課程簡介</p>
              </div>
              <div class="classText">
                <div>
                  <label for="">課程介紹:</label>
                  <textarea class="ski_intro long" name="ski_intro" cols="20" rows="5" placeholder="限制最多100字" maxlength="100"></textarea>
                </div>
                <div>
                  <label for="">學習內容:</label>
                  <textarea class="ski_harvest long" name="ski_harvest" cols="20" rows="5" placeholder="限制最多200字" maxlength="200"></textarea>
                </div>
                <div>
                  <label for="">課程大綱:</label>
                  <textarea class="ski_outline long" name="ski_outline" cols="20" rows="5" placeholder="限制最多250字" maxlength="250"></textarea>
                </div>
              </div>
              <div class="classImg">
                <div>
                  <label for="skiImg" class="file">上傳檔案
                    <input type="file" class="ski_img form" name="ski_img" id="skiImg" style="display: none;">
                  </label>
                  <div class="showPreImg" id="skiPre">
                    <img src="" alt="" id="ski_img_show">
                  </div>
                </div>

              </div>
            </div>





            <div>
              <button type="submit" class="submit">送出</button>
            </div>

          </form>
          <div>
            <button class="back" @click="cancel_add" style="display: none;">返回全部列表</button>
          </div>
        </div>

        <!-- article_report -->
        <div class="article_report" v-show="article_report">
          <div class="title">
            <p class="title">主題檢舉</p>
          </div>


          <table>
            <tr>
              <th>檢舉編號</th>
              <th>主題編號</th>
              <th>主題名稱</th>
              <th>檢舉內容</th>
              <th>被檢舉者編號</th>
              <th>檢舉者編號</th>
              <th>檢舉原因</th>
              <th>審核</th>
              <th>修改</th>
            </tr>
            <?php
            while ($ArReportRow = $ArReport->fetch(PDO::FETCH_ASSOC)) {
            ?>
              <tr>
                <td>
                  <div class="ART_REP_NO"><?= $ArReportRow["ART_REP_NO"] ?></div>
                </td>
                <td>
                  <div class="DIS_NO"><?= $ArReportRow["DIS_NO"] ?></div>
                </td>
                <td><?= $ArReportRow["DIS_NAME"] ?></td>
                <td><?= $ArReportRow["DIS_CONTENT"] ?></td>
                <td><?= $ArReportRow["RM"] ?></td>
                <td><?= $ArReportRow["MEM_NO"] ?></td>
                <td><?= $ArReportRow["ART_REP_CONTENT"] ?></td>
                <td>
                  <p>
                    <?php echo $ArReportRow["ART_REP_PASS"] == 0 ? "不通過" : "通過" ?>
                  </p>

                  <select name="" id="" class="editShow ART_REP_PASS">
                    <option value="1">通過</option>
                    <option value="0">不通過</option>

                  </select>
                </td>
                <td>
                  <button class="edit artReportEdit">編輯</button>
                  <button class="editShow cancel">取消</button>
                </td>
              </tr>
            <?php
            }
            ?>
          </table>
        </div>

        <!-- message_report -->
        <div class="message_report" v-show="message_report">
          <div class="title">
            <p class="title">留言檢舉</p>
          </div>


          <table>
            <tr>
              <th>檢舉編號</th>
              <th>留言編號</th>
              <th>檢舉內容</th>
              <th>被檢舉者編號</th>
              <th>檢舉編號</th>
              <th>檢舉原因</th>
              <th>審核</th>
              <th>修改</th>
            </tr>
            <?php
            while ($MgReportRow = $MgReport->fetch(PDO::FETCH_ASSOC)) {
            ?>
              <tr>
                <td>
                  <div class="MES_REP_NO"><?= $MgReportRow["MES_REP_NO"] ?></div>
                </td>
                <td>
                  <div class="DIS_MES_NO"><?= $MgReportRow["DIS_MES_NO"] ?></div>
                </td>
                <td><?= $MgReportRow["DIS_MES_CONTENT"] ?></td>
                <td><?= $MgReportRow["RM"] ?></td>
                <td><?= $MgReportRow["MEM_NO"] ?></td>

                <td><?= $MgReportRow["MES_REP_CONTENT"] ?></td>
                <td>
                  <?php echo $MgReportRow["MES_REP_PASS"] == 0 ? "不通過" : "通過" ?>

                  <select name="" id="" class="editShow MES_REP_PASS">
                    <option value="1">通過</option>
                    <option value="0">未通過</option>

                  </select>
                </td>
                <td>
                  <button class="edit msgReportEdit">編輯</button>
                  <button class="editShow cancel">取消</button>
                </td>
              <?php
            }
              ?>
              </tr>
          </table>
        </div>

        <!-- order_mem -->
        <div class="order_mem" v-show="order_mem">
          <div class="title">
            <p class="title">訂單管理</p>
          </div>

          <form method="post" action="./backstage_orderSearch.php" id="search_ore_form">
            <div>
              <input type="text" class="search_input" name="ORD_NO" id="orderSearch">
              <button class="search" @click="searchOrd" id="searchOrd">查看明細</button>
            </div>
          </form>
          <table id="OrderDetail">
          </table>
          <div>
            <button class="back" @click="backAllOrd" id="backAllOrd" style="display: none;">返回全部列表</button>
          </div>
          <table id="allOrd">
            <tr>
              <th>編號</th>
              <th>會員編號</th>
              <th>總金額</th>
              <th>付款方式</th>
              <th>購買日期</th>
            </tr>
            <tr v-for="item in orders">
              <td>{{item.ORD_NO}}</td>
              <td>{{item.MEM_NO}}</td>
              <td>{{item.ORD_AMOUNT}}</td>
              <td>{{item.ORD_PAY}}</td>
              <td>{{item.ORD_DATE}}</td>
            </tr>

          </table>
        </div>

        <!-- postcard_material -->
        <div class="postcard_material" v-show="postcard_material">
          <div class="title">
            <p class="title">明信片素材管理</p>
            <button class="add" id="newPostBtn">新增素材</button>
          </div>
          <table id="postTable">

            <tr>
              <th>素材編號</th>
              <th>素材名稱</th>
              <th>素材圖片</th>
              <th>啟用</th>
              <th>修改</th>
            </tr>
            <?php
            while ($materialRow = $material->fetch(PDO::FETCH_ASSOC)) {
            ?>
              <tr>
                <td>
                  <div class="POS_MAT_NO"><?= $materialRow["POS_MAT_NO"] ?></div>
                </td>
                <td><?= $materialRow["POS_MAT_NAME"] ?></td>
                <td>
                  <img src="<?= $materialRow["POS_MAT_PIC"] ?>" alt="<?= $materialRow["POS_MAT_NAME"] ?>">
                </td>
                <td>
                  <p class="POS_USE">
                    <?php echo $materialRow["POS_MAT_USE"] == 1 ? "是" : "否" ?>
                  </p>
                  <select name="" id="" class="editShow POS_MAT_USE">
                    <option value="1">是</option>
                    <option value="0">否</option>
                  </select>
                <td>
                  <button class="edit pos_edit">編輯</button>
                  <button class="pos_cancel editShow cancel">取消</button>
                </td>
                </td>
              </tr>
            <?php
            }
            ?>
          </table>
          <form action="./backstage_add_postcard_material.php" method="post" id="newPosForm" enctype="multipart/form-data">
            <div class="postName">
              <label for="POS_MAT_NAME">名稱:</label>
              <input type="text" class="form" name="POS_MAT_NAME" id="POS_MAT_NAME">
            </div>
            <div>
              <p class="post_type">素材類型</p>
            </div>
            <div>
              <input type="radio" name="post_type" id="outline" value="outline">
              <label for="outline">外框</label>
              <input type="radio" name="post_type" id="stamp" value="stamp">
              <label for="stamp">郵票</label>
              <input type="radio" name="post_type" id="postmark" value="postmark">
              <label for="postmark">郵戳</label>
            </div>
            <div>
              <label for="postImg" class="file">上傳檔案
                <input type="file" name="POS_MAT_PIC" id="postImg" accept="image/png">
              </label>
              <span>
                注意只能上傳png檔
              </span>
            </div>
            <div class=" postImg_show">
              <img src="" alt="" id="postNew">
            </div>
            <div>
              <button type="submit" class="submit" id="newPostSubmit">送出</button>
            </div>
          </form>
          <div>
            <button class="back" id="backPost">返回全部列表</button>
          </div>
        </div>
        <!-- announcement -->
        <div class="announcement" v-show="announcement">
          <div class="title">
            <p class="title">公告管理</p>
            <button class="add" id="add_annNew" @click="add_annNew">新增公告</button>
          </div>
          <table id="annTable">
            <tr>
              <th>編號</th>
              <th>內容</th>
              <th>日期</th>
              <th>發布</th>
              <th>修改</th>
            </tr>
            <?php
            while ($announceRow = $announce->fetch(PDO::FETCH_ASSOC)) {
            ?>
              <tr>
                <td>
                  <div class="ANN_NO"><?= $announceRow["ANN_NO"] ?></div>
                </td>
                <td><?= $announceRow["ANN_CONTENT"] ?></td>
                <td><?= $announceRow["ANN_DATE"] ?></td>

                <td>
                  <?php echo $announceRow["ANN_USE"] == 1 ? "是" : "否" ?>

                  <select name="" id="" class="editShow ANN_USE">
                    <option value="1">是</option>
                    <option value="0">否</option>
                  </select>
                </td>
                <td>
                  <button class="edit announceEdit">編輯</button>
                  <button class="editShow cancel">取消</button>
                </td>
              </tr>

            <?php
            }
            ?>
          </table>


          <form action="backstage_announcement_add.php" method="post" id="ann_form" style="display:none">
            <div>
              <label for="">公告日期</label>
              <input type="text" class="form" name="ANN_DATE" placeholder="YYYY-MM-DD">
            </div>
            <div>
              <label for="">公告內容</label>
              <textarea class="form" name="ANN_CONTENT" cols="20" rows="5" placeholder="限制最多30字" maxlength="30"></textarea>
            </div>

            <div>
              <label for="ANN_USE">是否發布</label>
              <select name="ANN_USE" id="ANN_USE">
                <option value="1">是</option>
                <option value="0">否</option>
              </select>
            </div>

            <div>
              <button type="submit" class="submit">送出</button>
            </div>
          </form>
          <div>
            <button class="back" id="ann_backAd" @click="ann_backAd" style="display: none;">返回全部列表</button>
          </div>

        </div>


      </div>
    </div>
  </div>

  <script src='https://cdnjs.cloudflare.com/ajax/libs/jquery/3.5.1/jquery.min.js'></script>
  <script src="https://kit.fontawesome.com/d18b20bddd.js" crossorigin="anonymous"></script>
  <script src="https://cdnjs.cloudflare.com/ajax/libs/vue/2.6.11/vue.js"></script>
  <script src="https://cdnjs.cloudflare.com/ajax/libs/axios/0.20.0/axios.min.js"></script>
  <script src="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/js/bootstrap.min.js"></script>
  <script src="./js/backstage_component.js"></script>
  <script src="./js/backstage_index.js"></script>
  <script src="./js/backstage_edit.js"></script>
  <script src="./js/backstage_careerEdit.js"></script>
  <script src="./js/backstage_memberEdit.js"></script>
  <script src="./js/backstage_adminEdit.js"></script>
  <script src="./js/backstage_skillEdit.js"></script>
  <script src="./js/backstage_artReportEdit.js"></script>
  <script src="./js/backstage_msgReportEdit.js"></script>
  <script src="./js/backstage_postMaterialEdit.js"></script>
  <script src="./js/backstage_announceEdit.js"></script>
</body>


</html>