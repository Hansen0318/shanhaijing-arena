# 赤鱬 Passive「游息」雙魚回流樣式 v2

**STYLE CANDIDATE / PLAYER ART REVIEW PENDING。靜態美術示意，沒有實作被動、沒有GIF核准、沒有部署。**

## 本輪審閱
- tier-style-review.png：T0–T3同尺度雙魚＋1/2/3/4組短回流紋，每組兩筆；下排使用既有核准Idle cell，不改角色。
- recipient-placement-review.png：左施法者沒有印記、右真受益者位置示意；純美術情境，並非真heal event證據。可治療自身時兩者是同一instance。
- originals/paired-fish.png：內建imagegen必要替代原圖；paired-fish-padded.png僅四邊256px透明padding，逐RGBA還原一致。prompt.txt保存實際prompt。

## 核准玩法契約（非本次新增數值審核）
戰鬥進行、施法者存活可行動且未受控、有存活敵人、最近敵人距離≥2.0；固定4.2內存活同隊HP≤60%，含自己，取HP/maxHp最低者，同值instanceId。真恢復當前maxHp×8/12/16/20%，缺血封頂、不吃主動治療加成、不復活不暴擊；只有amount>0開始獨立8秒CD且產生recipient VFX，不觸發主動cast/被動自循環。先傷害/KO→主動→重新評估被動。

## 視覺契約
雙魚附著真受益者懸浮下緣，角色/印記尺寸不隨Tier放大；T0/T1/T2/T3各1/2/3/4組短紋。正常模式650ms內收散去；reduced-motion維持同Tier靜態紋片淡出。650ms僅VFX壽命，單次真治療，沒有持續治療或減傷buff；無文字牌/連線。受益者KO、casterKO、到期、end/Restart/destroy清理是後續Runtime必要驗證。

## 證據與限制
舊候選及original嚴格解碼失敗且SHA與remote相符，原檔/manifest/prompts保留，見docs/verification/P3_PASSIVE_PREFLIGHT/candidate-recovery.json。本次13PNG嚴格verify+load通過、透明中心/padding逐RGBA不變。模型原圖alpha最高254與柔邊原封保留；不能宣稱消除了glow/全部像素255。初版排版的上方紋組被Idle遮住，靜態合成時改為下右/下左/右/左四位置，增高預覽cell避免裁到下紋；不是改動approved角色。

## 唯一下一Gate
玩家只審本輪雙魚受益者樣式、Tier紋組與相對角色大小。收到STYLE明確核准才保存hash收據並製作normal/reduced、四Tier、左右、真受益者/零治療/650ms到期及必要清理情境GIF；GIF仍需另獲核准，再Runtime。現在不做最終GIF、產品整合、Collection修改或Pages。
