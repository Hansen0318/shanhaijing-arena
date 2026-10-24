# 游息 GIF 已呈交／等待玩家核准

```text
【山海經聯盟｜P3 赤鱬 Passive「游息」GIF Gate待玩家核准】
[角色任務]
先從GitHub最新權威恢復第一個未完成Gate。9GIF已完成並呈交，尚無玩家GIF核准；未獲明確核准前只供審核，不Runtime/部署、不重生素材。若當前玩家訊息明確核准這組GIF，保存其原話及精確呈交檔案SHA256收據後，直接執行該次已授權後續工作，不重問是否開始。
[背景資訊]
Repository Hansen0318/shanhaijing-arena；唯一分支feat/m0-combat-core-20260927；PR1保持open/unmerged，不merge main。pre-art checkpoint cfa700133fb19f0f2a7ef8d291cbe509c35472c5，僅定位，先fetch最新HEAD與PR，核對/恢復本機未push工作，不覆蓋最新成果。P1/P2 COMPLETE，P3四主動已玩家核准；Passive STYLE收據docs/art/approved/chiru/passive/style-v2/acceptance.json有效；GIF/Runtime/部署未核准或完成，P3整角未完成。
[具體指令]
讀AGENTS、WORK_PROGRESS/STATE最新段、DEVELOPMENT_PLAYBOOK、PROJECT_BOUNDARIES、2026-10-23-restore-sequential-skill-workflow決策、CHARACTER_ACTION_ART_WORKFLOW、M5C_ART_ANIMATION_VFX、本handoff、P3 whole-character spec第5/6節及spec-acceptance；沿用P3_PASSIVE_PREFLIGHT必要差異與舊損壞候選證據。
本次9GIF入口docs/art/candidates/chiru/passive/composite-review-v1/REVIEW.md，manifest/timeline/verification/encoded-verification/SHA256SUMS與prepare_gifs.py/verify_review.py完整。核對原STYLE收據及所有來源hash；已核准雙魚、四Tier同尺度1/2/3/4組短紋和核准Idle不重生、不覆寫、不重審。9GIF全為腳本美術模擬，97編碼幀/224邊界取樣/46項檢查不能冒稱Runtime/真清理/手機PASS。
GIF核准後的最小工程缺口：共用rear-support資格/最低HP比例與穩定instanceId選人、instant-heal正amount才起獨立CD、真recipient雙魚與所有權清理；沿用當前maxHp治療/正heal event與共用生命週期模式。不要重做整套前檢。T2 chiru.rear-heal只是modifier，真實作時僅改顯示名清流，ID/條件/幅度保持。
核准游息契約：戰鬥中caster存活可行動未受控，有存活敵人且距最近≥2；固定4.2內存活同隊HP≤60%含自身，最低HP/maxHp優先，同值穩定instanceId；單次當前maxHp×8/12/16/20%，缺血封頂、不吃主動healing scale/回流/清流、不復活/暴擊/循環。正amount>0才起獨立8秒CD並畫真受益者；同刻傷害/KO→主動→重檢被動。650ms只視覺壽命；normal內收消散、reduced靜態淡出；recipientKO/casterKO/end/Restart/destroy清其擁有殘留，Restart新ready，重複destroy安全。
後續Runtime需匿名資料opt-in、真Tier/敵我/多instance/CD/排序/正零治療/取消/清理及實際PNG呈現驗證，依實際來源影響決定最低必要回歸；相同來源不重跑四主動/Build/Browser/Pages。產品真實作完成才更新Collection純玩法文案、必要真驗證後正常Pages/公開指紋供玩家驗收，不把GIF核准當遊戲核准。
[約束條件]
原生單人、不委派/新branch/worktree/TD/main merge/重置存檔。approved masters/收據bytes、P1/P2/P3四主動、尺度chestX158/hoverY203/懸浮下緣、右canonical左mirror保持。普通Hit永久取消；無固定16MiB總額，逐檔安全/兩下載/required/真失敗/所有權回收保留。不加戰場被動文字牌或角色間連線，不新造被動施法F1–F4。本次GIF未獲核准則停止於審核。長工作前與素材處理前checkpoint，更新進度/STATE/WORK_LOG/handoff，同分支commit/push。CLI無認證用connected API，逐blob SHA及完整tree核對，失敗保留證據。所有後續交接維持單一完整自足可複製code block。
```
