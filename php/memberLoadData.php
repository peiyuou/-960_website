<?php
    try{
        require_once("./connectMySql.php");
        if( $pdo != false ){

            $sql = "select MEM_NO, MEM_NAME, MEM_CODE, MEM_PIC, MEM_TEL, MEM_EMAIL from `member` where MEM_NO = :memNo";
            $sqlAnalysis = "select i.IND_CLASS, i.IND_INFO, q.QUIZ_RES_TYPE_R, q.QUIZ_RES_TYPE_I, q.QUIZ_RES_TYPE_A, q.QUIZ_RES_TYPE_S, q.QUIZ_RES_TYPE_E, q.QUIZ_RES_TYPE_C, q.QUIZ_RES_DATE from `quiz_result_analysis` q join `industry_class` i on q.QUIZ_RES_FIT_TYPE = i.IND_NO where q.MEM_NO = :memNo";
            $sqlClassBuy = "select mem.MEM_NAME, skill.SKI_NO, skill.SKI_NAME, skill.SKI_IMG, skill.SKI_TEC_NAME from `order_detail` item join `order_mem` ord on item.ORD_NO = ord.ORD_NO join `member` mem on ord.MEM_NO = mem.MEM_NO join `skill_class` skill on item.SKI_NO = skill.SKI_NO where ord.MEM_NO = :memNo";
            $sqlClassCollection = "select mem.MEM_NO, skicol.SKI_NO, skill.SKI_NAME, skill.SKI_IMG, skill.SKI_TEC_NAME  from `skill_collect` skicol join `member` mem on skicol.MEM_NO = mem.MEM_NO join `skill_class` skill on skicol.SKI_NO = skill.SKI_NO where skicol.MEM_NO = :memNo";
            $sqlArticle = "select mem02.MEM_NAME, mem02.MEM_PIC, mem03.MEM_NAME '留言者', mem03.MEM_PIC '留言者照片', mes.DIS_MES_DATE, mes.DIS_MES_HIDDEN, mes.DIS_MES_CONTENT, mes.DIS_MES_NO, artcol.DIS_NO, dis.DIS_NAME, dis.DIS_CLASS, dis.DIS_CONTENT, dis.DIS_DATE, ind.IND_CLASS, ind.IND_COLOR from `article_collect` artcol join `member` mem on artcol.MEM_NO = mem.MEM_NO join `discuss_area` dis on artcol.DIS_NO = dis.DIS_NO join `member` mem02 on dis.MEM_NO = mem02.MEM_NO join `industry_class` ind on dis.IND_NO = ind.IND_NO join `discuss_message` mes on mes.DIS_NO = dis.DIS_NO join `member` mem03 on mes.MEM_NO = mem03.MEM_NO where dis.DIS_HIDDEN = 1 and artcol.MEM_NO = :memNo and artcol.ART_COL_STATE = 1 order by dis.DIS_NO";
            $sqlPostCard = "select mem.MEM_NO, pos.POS_NO, pos.POS_PIC, pos.POS_PIC_BACK, pos.POS_CRE_DATE, pos.POS_SEN_DATE  from `postcard` pos join `member` mem on pos.MEM_NO = mem.MEM_NO where pos.MEM_NO = :memNo";
            $sqlOrder = "select mem.MEM_NO, ord.ORD_NO, ord.ORD_DATE, ord.ORD_AMOUNT, ski.SKI_NAME, ski.SKI_IMG, ski.SKI_TEC_NAME, ski.SKI_NO from `order_mem` ord join `member` mem on ord.MEM_NO = mem.MEM_NO join `order_detail` orddet on ord.ORD_NO = orddet.ORD_NO join `skill_class` ski on ski.SKI_NO = orddet.SKI_NO where ord.MEM_NO = :memNo order by ord.ORD_NO asc";
            $sqlOrderCount = "select orddet.ORD_NO, count(orddet.SKI_NO) '商品數量' from `order_mem` ord join `order_detail` orddet on ord.ORD_NO = orddet.ORD_NO where ord.MEM_NO = :memNo group by orddet.ORD_NO";
            $sqlArticleLike = "select discuss_area.DIS_NO, article_like.MEM_NO, article_like.ART_LIK_STATE from `discuss_area` join `article_like` on discuss_area.DIS_NO = article_like.DIS_NO join `article_collect` on article_collect.DIS_NO = discuss_area.DIS_NO where article_collect.MEM_NO = :memNo and article_like.MEM_NO = :memNoLike and article_like.ART_LIK_STATE = 1";
            $sqlArticleMessageLike = "select discuss_message.DIS_MES_NO, message_like.MEM_NO, message_like.MES_LIK_STATE from `discuss_area` join `discuss_message` on discuss_area.DIS_NO = discuss_message.DIS_NO join `message_like` on discuss_message.DIS_MES_NO = message_like.DIS_MES_NO join `article_collect` on article_collect.DIS_NO = discuss_area.DIS_NO where article_collect.MEM_NO = :memNo and message_like.MEM_NO = :memNoLike and message_like.MES_LIK_STATE = 1";
            $sqlArticleReport = "select discuss_area.DIS_NO, article_report.MEM_NO from `discuss_area` join `article_report` on discuss_area.DIS_NO = article_report.DIS_NO join `article_collect` on article_collect.DIS_NO = discuss_area.DIS_NO where article_collect.MEM_NO = :memNo and article_report.MEM_NO = :memNoLike";
            $sqlArticleMessageReport = "select discuss_message.DIS_MES_NO, message_report.MEM_NO from `discuss_area` join `discuss_message` on discuss_area.DIS_NO = discuss_message.DIS_NO join `message_report` on discuss_message.DIS_MES_NO = message_report.DIS_MES_NO join `article_collect` on article_collect.DIS_NO = discuss_area.DIS_NO where article_collect.MEM_NO = :memNo and message_report.MEM_NO = :memNoLike";
            $sqlArticleNoMessage = "select mem02.MEM_NAME, mem02.MEM_PIC, artcol.DIS_NO, dis.DIS_NAME, dis.DIS_CLASS, dis.DIS_CONTENT, dis.DIS_DATE, ind.IND_CLASS, ind.IND_COLOR from `article_collect` artcol join `member` mem on artcol.MEM_NO = mem.MEM_NO join `discuss_area` dis on artcol.DIS_NO = dis.DIS_NO join `member` mem02 on dis.MEM_NO = mem02.MEM_NO join `industry_class` ind on dis.IND_NO = ind.IND_NO where dis.DIS_HIDDEN = 1 and artcol.MEM_NO = :memNo and artcol.ART_COL_STATE = 1 order by dis.DIS_NO";
            $memberDataAll = $pdo -> prepare($sql);
            $memberDataAll -> bindValue(":memNo",$_POST["memNo"]);
            $memberDataAll -> execute();
            $memberAnalysis = $pdo -> prepare($sqlAnalysis);
            $memberAnalysis -> bindValue(":memNo",$_POST["memNo"]);
            $memberAnalysis -> execute();
            $memberClassBuy = $pdo -> prepare($sqlClassBuy);
            $memberClassBuy -> bindValue(":memNo",$_POST["memNo"]);
            $memberClassBuy -> execute();
            $memberClassCollection = $pdo -> prepare($sqlClassCollection);
            $memberClassCollection -> bindValue(":memNo",$_POST["memNo"]);
            $memberClassCollection -> execute();
            $memberArticle = $pdo -> prepare($sqlArticle);
            $memberArticle -> bindValue(":memNo",$_POST["memNo"]);
            $memberArticle -> execute();
            $memberPostCard = $pdo -> prepare($sqlPostCard);
            $memberPostCard -> bindValue(":memNo",$_POST["memNo"]);
            $memberPostCard -> execute();
            $memberOrder = $pdo -> prepare($sqlOrder);
            $memberOrder -> bindValue(":memNo",$_POST["memNo"]);
            $memberOrder -> execute();
            $memberOrderCount = $pdo -> prepare($sqlOrderCount);
            $memberOrderCount -> bindValue(":memNo",$_POST["memNo"]);
            $memberOrderCount -> execute();
            $memberArticleLike = $pdo -> prepare($sqlArticleLike);
            $memberArticleLike -> bindValue(":memNo",$_POST["memNo"]);
            $memberArticleLike -> bindValue(":memNoLike",$_POST["memNo"]);
            $memberArticleLike -> execute();
            $memberArticleMessageLike = $pdo -> prepare($sqlArticleMessageLike);
            $memberArticleMessageLike -> bindValue(":memNo",$_POST["memNo"]);
            $memberArticleMessageLike -> bindValue(":memNoLike",$_POST["memNo"]);
            $memberArticleMessageLike -> execute();
            $memberArticleReport = $pdo -> prepare($sqlArticleReport);
            $memberArticleReport -> bindValue(":memNo",$_POST["memNo"]);
            $memberArticleReport -> bindValue(":memNoLike",$_POST["memNo"]);
            $memberArticleReport -> execute();
            $memberArticleMessageReport = $pdo -> prepare($sqlArticleMessageReport);
            $memberArticleMessageReport -> bindValue(":memNo",$_POST["memNo"]);
            $memberArticleMessageReport -> bindValue(":memNoLike",$_POST["memNo"]);
            $memberArticleMessageReport -> execute();
            $memberArticleNoMessage = $pdo -> prepare($sqlArticleNoMessage);
            $memberArticleNoMessage -> bindValue(":memNo",$_POST["memNo"]);
            $memberArticleNoMessage -> execute();
            
            if($memberDataAll -> rowCount() == 0){
                echo "沒資料";
            }
            else{
                $memberDataAll_row=$memberDataAll->fetchAll(PDO::FETCH_ASSOC);
                $memberAnalysis_row=$memberAnalysis->fetchAll(PDO::FETCH_ASSOC);
                $memberClassBuy_row=$memberClassBuy->fetchAll(PDO::FETCH_ASSOC);
                $memberClassCollection_row=$memberClassCollection->fetchAll(PDO::FETCH_ASSOC);
                $memberArticle_row=$memberArticle->fetchAll(PDO::FETCH_ASSOC);
                $memberPostCard_row=$memberPostCard->fetchAll(PDO::FETCH_ASSOC);
                $memberOrder_row=$memberOrder->fetchAll(PDO::FETCH_ASSOC);
                $memberOrderCount_row=$memberOrderCount->fetchAll(PDO::FETCH_ASSOC);
                $memberArticleLike_row=$memberArticleLike->fetchAll(PDO::FETCH_ASSOC);
                $memberArticleMessageLike_row=$memberArticleMessageLike->fetchAll(PDO::FETCH_ASSOC);
                $memberArticleReport_row=$memberArticleReport->fetchAll(PDO::FETCH_ASSOC);
                $memberArticleMessageReport_row=$memberArticleMessageReport->fetchAll(PDO::FETCH_ASSOC);
                $memberArticleNoMessage_row=$memberArticleNoMessage->fetchAll(PDO::FETCH_ASSOC);
                echo json_encode($memberDataAll_row);
                echo json_encode($memberAnalysis_row);
                echo json_encode($memberClassBuy_row);
                echo json_encode($memberClassCollection_row);
                echo json_encode($memberArticle_row);
                echo json_encode($memberPostCard_row);
                echo json_encode($memberOrder_row);
                echo json_encode($memberOrderCount_row);
                echo json_encode($memberArticleLike_row);
                echo json_encode($memberArticleMessageLike_row);
                if($memberArticleReport_row){
                    echo json_encode($memberArticleReport_row);
                }
                else{
                    $memberArticleReport_row = array(array("DIS_NO" => "-1"), array("DIS_NO" => "-1"));
                    echo json_encode($memberArticleReport_row);
                }
                if($memberArticleMessageReport_row){
                    echo json_encode($memberArticleMessageReport_row);
                }
                else{
                    $memberArticleMessageReport_row = array(array("DIS_MES_NO" => "-1"), array("DIS_MES_NO" => "-1"));
                    echo json_encode($memberArticleMessageReport_row);
                }
                echo json_encode($memberArticleNoMessage_row);
            }
        }
    }catch(PDOException $e){
    }
?>